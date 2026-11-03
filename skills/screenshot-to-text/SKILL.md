---
name: screenshot-to-text
description: Transcribe visible text and describe layout from screenshots or image files. Use when a user mentions screenshot, print, tela, imagem, asks to transcribe/read an image, or supplies a PNG/JPG/JPEG/WEBP path for an agent that cannot inspect images.
metadata:
  short-description: Transcribe screenshots for terminal agents
---

# Screenshot to text

Transcribe screenshots so terminal agents such as OpenCode and Claude Code can work with their contents. Use this for errors, terminal output, IDEs, app interfaces, charts, code in screenshots, and visual documentation.

## Run it

From the project root (after installing dependencies), run:

```bash
python skills/screenshot-to-text/transcribe.py "/path/to/screenshot.png"
```

The command prints the transcription to stdout and saves a Markdown file in the current project directory. To select a provider explicitly:

```bash
python skills/screenshot-to-text/transcribe.py "/path/to/screenshot.png" --provider ollama
```

Supported providers are `openai`, `gemini`, `anthropic`, and `ollama`. The default is `SCREENSHOT_PROVIDER` or `openai`. Set the provider's API key in the environment or in a `.env` file in the current directory. See `.env.example`. Ollama runs locally and needs a vision model such as `llava` already pulled and its service running.

Install dependencies with:

```bash
python -m pip install -r skills/screenshot-to-text/requirements.txt
```

For a quick check with an existing image:

```bash
python skills/screenshot-to-text/transcribe.py exemplo.png
```

## Read the output

The transcription is printed to stdout for the calling agent. The output file is named `<image-name>.transcription.md` in the current directory unless `--output` is provided. Read it as a faithful transcription, not as verified interpretation: preserve code and logs literally, and treat any brief visual description as a model-generated description. If the model marks text as unreadable or uncertain, inspect the image at higher resolution or retry with another provider.

## Limits

Large images may be slow or rejected by a provider; resize or crop them if needed. Low resolution, compression, tiny UI text, and handwriting can reduce accuracy. Check transcribed code, identifiers, and error messages against the original when exactness matters. Online providers send image data to their respective APIs; use Ollama when the image must remain local.
