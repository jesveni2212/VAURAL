import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection } from "./AboutSection";

describe("AboutSection", () => {
  it("shows the portfolio project with a safe external link", () => {
    render(<AboutSection />);

    const portfolioLink = screen.getByRole("link", { name: /jesusvenialgo\.com/i });

    expect(portfolioLink.getAttribute("href")).toBe("https://jesusvenialgo.com");
    expect(portfolioLink.getAttribute("target")).toBe("_blank");
    expect(portfolioLink.getAttribute("rel")).toBe("noreferrer");
  });
});
