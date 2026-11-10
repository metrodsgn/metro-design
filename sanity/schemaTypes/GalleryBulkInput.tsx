"use client";

import { useRef, useState } from "react";
import { Button, Flex, Text } from "@sanity/ui";
import { type InputProps, insert, set, setIfMissing, useClient } from "sanity";
import { urlFor } from "@/sanity/lib/image";

type GalleryImage = {
  _key: string;
  _type: "image";
  asset: { _type: "reference"; _ref: string };
  [key: string]: unknown;
};

export function GalleryBulkInput(props: InputProps) {
  const client = useClient({ apiVersion: "2025-01-01" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectionOpen, setSelectionOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const gallery = (Array.isArray(props.value) ? props.value : []) as GalleryImage[];

  function toggleSelection(key: string) {
    setSelectedKeys((current) =>
      current.includes(key)
        ? current.filter((selectedKey) => selectedKey !== key)
        : [...current, key],
    );
  }

  function removeSelectedImages() {
    if (!selectedKeys.length) return;

    props.onChange(
      set(
        gallery.filter(
          (image, index) => !selectedKeys.includes(image._key || `gallery-image-${index}`),
        ),
      ),
    );
    setSelectedKeys([]);
    setSelectionOpen(false);
  }

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
        <Button
          text={selectionOpen ? "Cancelar seleção" : "Selecionar imagens para remover"}
          mode="ghost"
          disabled={uploading || gallery.length === 0}
          onClick={() => {
            setSelectionOpen((open) => !open);
            setSelectedKeys([]);
          }}
        />
        <Text size={1} muted>
          Ou arraste várias imagens para a galeria abaixo.
        </Text>
      </Flex>
      {selectionOpen && (
        <div style={{ marginBottom: 16 }}>
          <Text size={1} muted>
            Selecione as imagens que deseja remover desta galeria.
          </Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 12,
              marginBlock: 12,
            }}
          >
            {gallery.map((image, index) => {
              const key = image._key || `gallery-image-${index}`;
              const selected = selectedKeys.includes(key);
              const imageUrl = image.asset?._ref
                ? urlFor({
                    _type: "image",
                    asset: { _type: "reference", _ref: image.asset._ref },
                  })
                    .width(320)
                    .height(240)
                    .fit("crop")
                    .url()
                : "";

              return (
                <label
                  key={key}
                  style={{
                    position: "relative",
                    display: "grid",
                    gap: 8,
                    padding: 8,
                    border: `2px solid ${selected ? "#ff3333" : "var(--card-border-color)"}`,
                    backgroundColor: selected ? "rgba(255, 51, 51, 0.12)" : "transparent",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  data-selected={selected ? "true" : "false"}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: "block",
                      width: "100%",
                      aspectRatio: "4 / 3",
                      outline: selected ? "2px solid #ff3333" : undefined,
                      outlineOffset: selected ? -2 : undefined,
                      backgroundColor: "var(--card-bg-color)",
                      backgroundImage: imageUrl ? `url("${imageUrl}")` : undefined,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="checkbox"
                      checked={selectedKeys.includes(key)}
                      aria-label={`Selecionar imagem ${index + 1} para remoção`}
                      onChange={() => toggleSelection(key)}
                      style={{
                        width: 18,
                        height: 18,
                        flex: "none",
                        accentColor: "#ff3333",
                      }}
                    />
                    <Text size={1}>Imagem {index + 1}</Text>
                  </span>
                  {selected && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        display: "grid",
                        width: 26,
                        height: 26,
                        placeItems: "center",
                        borderRadius: "50%",
                        backgroundColor: "#ff3333",
                        color: "white",
                        fontWeight: 700,
                        boxShadow: "0 1px 6px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      ✓
                    </span>
                  )}
                </label>
              );
            })}
          </div>
          <Button
            text={`Remover selecionadas (${selectedKeys.length})`}
            tone="critical"
            disabled={selectedKeys.length === 0}
            onClick={removeSelectedImages}
          />
        </div>
      )}
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
