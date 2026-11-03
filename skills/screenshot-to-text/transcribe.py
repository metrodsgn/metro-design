#!/usr/bin/env python3
"""Transcribe screenshot text using a hosted or local vision model."""

from __future__ import annotations

import argparse
import base64
import os
import sys
from pathlib import Path

try:
    import requests
    from dotenv import load_dotenv
    from PIL import Image, UnidentifiedImageError
except ImportError as exc:
    print(
        "Dependência ausente. Instale com: python -m pip install -r "
        "skills/screenshot-to-text/requirements.txt",
        file=sys.stderr,
    )
    raise SystemExit(1) from exc

PROMPT = (
    "Transcreva fielmente todo o texto visível nesta imagem. Preserve "
    "formatação, indentação de código, ordem de leitura e estrutura. Se for "
    "uma tela de terminal/IDE, destaque o conteúdo textual. Se houver "
    "diagramas, descreva brevemente o layout. Não resuma, não interprete — "
    "apenas transcreva."
)

MIME_TYPES = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp"}
PROVIDERS = ("openai", "gemini", "anthropic", "ollama")


class TranscriptionError(Exception):
    """An actionable error suitable for display in a CLI."""


def image_data(path: Path) -> tuple[str, str]:
    if not path.is_file():
        raise TranscriptionError(f"Arquivo não encontrado: {path}")
    extension = path.suffix.lower()
    if extension not in MIME_TYPES:
        raise TranscriptionError(
            f"Extensão não suportada: {extension or '(sem extensão)'}. Use PNG, JPG, JPEG ou WEBP."
        )
    try:
        with Image.open(path) as image:
            if image.format not in {"PNG", "JPEG", "WEBP"}:
                raise TranscriptionError("O arquivo não é uma imagem PNG, JPEG ou WEBP válida.")
            image.verify()
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError) as exc:
        raise TranscriptionError(f"Imagem inválida ou corrompida: {path} ({exc})") from exc
    return base64.b64encode(path.read_bytes()).decode("ascii"), MIME_TYPES[extension]


def post(url: str, *, timeout: int, **kwargs) -> dict:
    try:
        response = requests.post(url, timeout=timeout, **kwargs)
    except requests.Timeout as exc:
        raise TranscriptionError(f"Tempo limite excedido ao consultar o modelo ({timeout}s).") from exc
    except requests.ConnectionError as exc:
        raise TranscriptionError(f"Não foi possível conectar ao serviço: {exc}") from exc
    except requests.RequestException as exc:
        raise TranscriptionError(f"Falha na requisição: {exc}") from exc

    if response.status_code == 429:
        raise TranscriptionError("Limite de requisições atingido (rate limit). Tente novamente mais tarde.")
    if response.status_code in (401, 403):
        raise TranscriptionError("Autenticação recusada. Confira a chave de API e as permissões.")
    if not response.ok:
        detail = response.text[:1000]
        raise TranscriptionError(f"A API retornou HTTP {response.status_code}: {detail}")
    try:
        return response.json()
    except requests.JSONDecodeError as exc:
        raise TranscriptionError("O serviço retornou uma resposta que não é JSON válido.") from exc


def required_key(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise TranscriptionError(f"Chave ausente: defina {name} no ambiente ou no arquivo .env.")
    return value


def transcribe(provider: str, encoded: str, mime: str, timeout: int) -> str:
    if provider == "openai":
        data = post(
            "https://api.openai.com/v1/chat/completions",
            timeout=timeout,
            headers={"Authorization": f"Bearer {required_key('OPENAI_API_KEY')}"},
            json={
                "model": os.getenv("OPENAI_VISION_MODEL", "gpt-4o"),
                "messages": [{"role": "user", "content": [
                    {"type": "text", "text": PROMPT},
                    {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{encoded}"}},
                ]}],
            },
        )
        return data["choices"][0]["message"]["content"].strip()

    if provider == "gemini":
        key = required_key("GEMINI_API_KEY")
        model = os.getenv("GEMINI_VISION_MODEL", "gemini-2.0-flash")
        data = post(
            f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
            timeout=timeout,
            params={"key": key},
            json={"contents": [{"parts": [
                {"text": PROMPT},
                {"inline_data": {"mime_type": mime, "data": encoded}},
            ]}]},
        )
        return "\n".join(part["text"] for part in data["candidates"][0]["content"]["parts"] if "text" in part).strip()

    if provider == "anthropic":
        data = post(
            "https://api.anthropic.com/v1/messages",
            timeout=timeout,
            headers={
                "x-api-key": required_key("ANTHROPIC_API_KEY"),
                "anthropic-version": "2023-06-01",
            },
            json={
                "model": os.getenv("ANTHROPIC_VISION_MODEL", "claude-3-5-sonnet-latest"),
                "max_tokens": 4096,
                "messages": [{"role": "user", "content": [
                    {"type": "text", "text": PROMPT},
                    {"type": "image", "source": {"type": "base64", "media_type": mime, "data": encoded}},
                ]}],
            },
        )
        return "\n".join(block["text"] for block in data["content"] if block.get("type") == "text").strip()

    base = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434").rstrip("/")
    data = post(
        f"{base}/api/chat",
        timeout=timeout,
        json={
            "model": os.getenv("OLLAMA_VISION_MODEL", "llava"),
            "stream": False,
            "messages": [{"role": "user", "content": PROMPT, "images": [encoded]}],
        },
    )
    return data["message"]["content"].strip()


def main() -> int:
    parser = argparse.ArgumentParser(description="Transcreve o conteúdo de uma screenshot usando um modelo de visão.")
    parser.add_argument("image", type=Path, help="Caminho para imagem PNG, JPG, JPEG ou WEBP")
    parser.add_argument("--provider", choices=PROVIDERS, help="Provedor (padrão: SCREENSHOT_PROVIDER ou openai)")
    parser.add_argument("--output", type=Path, help="Caminho do arquivo Markdown de saída")
    args = parser.parse_args()

    load_dotenv()
    provider = (args.provider or os.getenv("SCREENSHOT_PROVIDER", "openai")).lower()
    if provider not in PROVIDERS:
        parser.error(f"SCREENSHOT_PROVIDER inválido: {provider}. Escolha: {', '.join(PROVIDERS)}")
    try:
        timeout = int(os.getenv("SCREENSHOT_TIMEOUT", "120"))
        if timeout <= 0:
            raise TranscriptionError("SCREENSHOT_TIMEOUT deve ser um inteiro positivo.")
        encoded, mime = image_data(args.image)
        result = transcribe(provider, encoded, mime, timeout)
        if not result:
            raise TranscriptionError("O modelo retornou uma transcrição vazia.")
        output = args.output or Path.cwd() / f"{args.image.stem}.transcription.md"
        output.write_text(result.rstrip() + "\n", encoding="utf-8")
        print(result)
        print(f"\nTranscrição salva em: {output}", file=sys.stderr)
        return 0
    except (TranscriptionError, KeyError, IndexError, TypeError, ValueError) as exc:
        print(f"Erro: {exc}", file=sys.stderr)
        return 1
    except OSError as exc:
        print(f"Erro ao salvar a transcrição: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
