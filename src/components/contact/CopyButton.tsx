"use client";

import { useEffect, useState } from "react";
import { IconCheck, IconCopy } from "@/components/ui/icons";

type CopyButtonProps = {
  value: string;
  label: string;
};

const CONFIRM_MS = 2000;

/** Copies `value`; shows "Copiado" briefly. Without clipboard access it simply does nothing. */
export function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), CONFIRM_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard blocked or unsupported: the value stays visible to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm transition-colors hover:bg-fg hover:text-bg"
    >
      {copied ? <IconCheck /> : <IconCopy />}
      <span aria-live="polite">{copied ? "Copiado" : "Copiar"}</span>
    </button>
  );
}
