"use client";

import { useRef, useState } from "react";
import { Button, Flex, Text } from "@sanity/ui";
import { type InputProps, insert, setIfMissing, useClient } from "sanity";

type GalleryImage = {
  _key: string;
  _type: "image";
  asset: { _type: "reference"; _ref: string };
};

export function GalleryBulkInput(props: InputProps) {
  const client = useClient({ apiVersion: "2025-01-01" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function uploadFiles(files: FileList | null) {
    if (!files?.length || uploading) return;

    const selected = Array.from(files);
    const images: GalleryImage[] = [];
    setUploading(true);
    setError("");

    try {
      for (const [index, file] of selected.entries()) {
        setProgress(`Enviando ${index + 1} de ${selected.length}: ${file.name}`);
        const asset = await client.assets.upload("image", file, {
          filename: file.name,
        });
        images.push({
          _key: crypto.randomUUID().replaceAll("-", "").slice(0, 12),
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        });
      }
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Não foi possível enviar todas as imagens.",
      );
    } finally {
      if (images.length) {
        props.onChange([setIfMissing([]), insert(images, "after", [-1])]);
      }
      setProgress("");
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <Flex align="center" gap={3} paddingBottom={3} wrap="wrap">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          aria-label="Selecionar várias imagens para a galeria"
          onChange={(event) => void uploadFiles(event.currentTarget.files)}
          style={{ display: "none" }}
        />
        <Button
          text="Selecionar várias imagens"
          mode="ghost"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        />
        <Text size={1} muted>
          Ou arraste várias imagens para a galeria abaixo.
        </Text>
      </Flex>
      {progress && (
        <Text size={1} aria-live="polite">
          {progress}
        </Text>
      )}
      {error && (
        <Text size={1} aria-live="assertive" style={{ color: "#d32f2f" }}>
          {error}
        </Text>
      )}
      {props.renderDefault(props)}
    </div>
  );
}
