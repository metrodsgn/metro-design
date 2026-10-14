import { useCallback } from "react";
import { PatchEvent, set, type StringInputProps } from "sanity";
import { brandColors } from "./brandColors";

const defaultColor = "#FF2E2E";

export function BrandColorInput(props: StringInputProps) {
  const { elementProps, onChange, readOnly, value = "" } = props;
  const pickerValue = /^#[\da-f]{6}$/i.test(value) ? value : defaultColor;
  const updateValue = useCallback(
    (color: string) => onChange(PatchEvent.from(set(color))),
    [onChange]
  );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <label
          title="Escolher cor personalizada"
          style={{
            display: "grid",
            width: 42,
            height: 42,
            flexShrink: 0,
            cursor: readOnly ? "not-allowed" : "pointer",
            placeItems: "center",
            overflow: "hidden",
            border: "1px solid var(--card-border-color, #444)",
            borderRadius: 8,
            background: pickerValue,
          }}
        >
          <input
            {...elementProps}
            aria-label="Selecionar cor da marca"
            type="color"
            value={pickerValue}
            disabled={readOnly}
            onChange={(event) => updateValue(event.currentTarget.value.toUpperCase())}
            style={{
              width: 64,
              height: 64,
              padding: 0,
              cursor: readOnly ? "not-allowed" : "pointer",
              opacity: 0.02,
            }}
          />
        </label>
        <input
          aria-label="Código hexadecimal da cor da marca"
          value={value}
          disabled={readOnly}
          placeholder="#FF2E2E"
          onChange={(event) => updateValue(event.currentTarget.value.toUpperCase())}
          style={{
            boxSizing: "border-box",
            width: "min(100%, 220px)",
            minHeight: 40,
            padding: "0 12px",
            border: "1px solid var(--card-border-color, #444)",
            borderRadius: 6,
            background: "var(--input-bg, transparent)",
            color: "var(--card-fg-color, inherit)",
            font: "inherit",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            width: 24,
            height: 24,
            flexShrink: 0,
            border: "1px solid rgb(255 255 255 / 25%)",
            borderRadius: 5,
            background: pickerValue,
          }}
        />
      </div>

      <div
        aria-label="Cores sugeridas"
        style={{ display: "flex", flexWrap: "wrap", gap: 7 }}
      >
        {brandColors.map((color) => {
          const selected = value.toUpperCase() === color.value;

          return (
            <button
              key={color.value}
              type="button"
              title={`${color.title} · ${color.value}`}
              aria-label={`${color.title}, ${color.value}`}
              aria-pressed={selected}
              disabled={readOnly}
              onClick={() => updateValue(color.value)}
              style={{
                width: 25,
                height: 25,
                padding: 0,
                cursor: readOnly ? "not-allowed" : "pointer",
                border: selected
                  ? "2px solid var(--card-fg-color, white)"
                  : "1px solid rgb(255 255 255 / 25%)",
                borderRadius: 5,
                background: color.value,
                boxShadow: selected ? "0 0 0 2px var(--card-bg-color, #222)" : "none",
              }}
            />
          );
        })}
      </div>
      <p style={{ margin: 0, color: "var(--card-muted-fg-color, #888)", fontSize: 12 }}>
        Escolha uma amostra ou use o seletor para qualquer cor. Essa cor aparece
        no brilho do projeto.
      </p>
    </div>
  );
}
