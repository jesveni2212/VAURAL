import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SplitWords } from "./SplitWords";

describe("SplitWords", () => {
  it("keeps the full sentence as the accessible name", () => {
    render(
      <h1>
        <SplitWords text={"De la idea\nal cliente."} highlight="cliente." highlightClassName="marker" />
      </h1>,
    );

    expect(screen.getByRole("heading", { name: "De la idea al cliente." })).toBeTruthy();
  });

  it("staggers each word and marks the highlighted one", () => {
    const view = render(<SplitWords text="al cliente." highlight="cliente." highlightClassName="marker" delay={0.2} />);
    const words = view.container.querySelectorAll("[data-word]");

    expect(words).toHaveLength(2);
    expect((words[1] as HTMLElement).style.animationDelay).toBe("0.28s");
    expect(words[1].classList.contains("marker")).toBe(true);
  });
});
