import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "./CopyButton";

describe("CopyButton", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("copies the value and confirms it for a moment", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<CopyButton value="+595992396700" label="Copiar número de WhatsApp" />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copiar número de WhatsApp" }));
    });

    expect(writeText).toHaveBeenCalledWith("+595992396700");
    expect(screen.getByText("Copiado")).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText("Copiado")).toBeNull();
  });

  it("stays usable when the clipboard is unavailable", async () => {
    vi.stubGlobal("navigator", {});
    render(<CopyButton value="+595992396700" label="Copiar número de WhatsApp" />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copiar número de WhatsApp" }));
    });

    expect(screen.queryByText("Copiado")).toBeNull();
  });
});
