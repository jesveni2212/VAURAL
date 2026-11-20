import { vi } from "vitest";

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// jsdom ships <dialog> without its modal API; mirror the browser's open/close contract.
if (typeof HTMLDialogElement !== "undefined" && !HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}

// next/font is a build-time transform; under Vitest each font loader just returns class names.
vi.mock("next/font/google", () => {
  const font = (options: { variable?: string }) => ({ className: "font", variable: options.variable ?? "", style: {} });
  return { Geist: font, Geist_Mono: font, Instrument_Serif: font };
});
