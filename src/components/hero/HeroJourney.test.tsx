import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getServices } from "@/data/services";
import { HeroJourney } from "./HeroJourney";

// Swiper itself is a browser concern (covered by e2e); here we test the journey state.
vi.mock("./JourneySlider", () => ({ default: () => null }));
const isPaused = () => screen.getByTestId("journey-device").dataset.paused;

describe("HeroJourney", () => {
  afterEach(cleanup);

  it("states the proposition as the page's only h1", () => {
    render(<HeroJourney services={getServices()} />);

    expect(screen.getByRole("heading", { level: 1, name: "De la idea al cliente." })).toBeTruthy();
  });

  it("starts on the first pillar and follows the chosen step", () => {
    render(<HeroJourney services={getServices()} />);

    expect(screen.getByText("Asesoría digital")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Asesoría" }).getAttribute("aria-current")).toBe("step");

    fireEvent.click(screen.getByRole("button", { name: "Web" }));

    expect(screen.getByText("Páginas web")).toBeTruthy();
    expect(screen.getByText("02 / 04")).toBeTruthy();
    expect(document.documentElement.style.getPropertyValue("--accent")).toBe("#C8F542");
  });

  it("shows the chosen step's screen while the slider is still loading", () => {
    render(<HeroJourney services={getServices()} />);

    fireEvent.click(screen.getByRole("button", { name: "Web" }));

    expect(screen.getByText("TU MARCA")).toBeTruthy();
    expect(screen.queryByText("Plan para tu marca")).toBeNull();
  });

  it("lets visitors pause the auto-advancing journey", () => {
    render(<HeroJourney services={getServices()} />);
    const pause = screen.getByRole("button", { name: "Pausar recorrido" });

    expect(pause.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(pause);

    expect(pause.getAttribute("aria-pressed")).toBe("true");
    expect(isPaused()).toBe("true");
  });

  it("pauses while keyboard focus is inside the journey and resumes when it leaves", () => {
    render(
      <>
        <HeroJourney services={getServices()} />
        <button type="button">fuera</button>
      </>,
    );

    fireEvent.focus(screen.getByRole("button", { name: "Web" }));
    expect(isPaused()).toBe("true");

    fireEvent.blur(screen.getByRole("button", { name: "Web" }), { relatedTarget: screen.getByRole("button", { name: "fuera" }) });
    expect(isPaused()).toBe("false");
  });

  it("leads to contact and plans", () => {
    render(<HeroJourney services={getServices()} />);

    expect(screen.getByRole("link", { name: /empezar mi proyecto/i }).getAttribute("href")).toBe("#contacto");
    expect(screen.getByRole("link", { name: /ver planes/i }).getAttribute("href")).toBe("#planes");
  });
});
