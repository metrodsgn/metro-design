"use client";

import { useState } from "react";

export function ProjectShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const shareProject = async () => {
    const shareData = { title, url: window.location.href };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;

      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      } catch {
        setCopied(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={shareProject}
      className="ui-button ui-button-secondary ui-button-small"
    >
      <span aria-hidden="true">↗</span>
      {copied ? "Link copiado" : "Compartilhar"}
    </button>
  );
}
