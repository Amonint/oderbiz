import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FramerHeroExact } from "@/app/components/framer-hero/framer-hero-exact";

describe("FramerHeroExact structure", () => {
  it("renderiza Top, Reel y palabras del hero", () => {
    render(<FramerHeroExact />);
    expect(screen.getByText("DESIGN STUDIO")).toBeInTheDocument();
    expect(screen.getByText("FOR TIMELESS")).toBeInTheDocument();
    expect(screen.getByText(/MOTION\./)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /creative apes/i })).toBeInTheDocument();
  });

  it("renderiza MOTION. letra por letra y capa secundaria BRANDING.", () => {
    const { container } = render(<FramerHeroExact />);
    const primary = container.querySelector('[data-testid="hero-ticker-primary"]');
    const secondary = container.querySelector('[data-testid="hero-ticker-secondary"]');
    expect(primary).toBeTruthy();
    expect(secondary).toBeTruthy();
    expect(within(primary as HTMLElement).getByText("M")).toBeInTheDocument();
    expect(within(secondary as HTMLElement).getByText("B")).toBeInTheDocument();
  });

  it("incluye reel interactivo y titulo creative apes con loader", () => {
    const { container } = render(<FramerHeroExact />);
    expect(container.querySelector("canvas")).toBeTruthy();
    expect(screen.getAllByText("creative apes").length).toBeGreaterThanOrEqual(1);
    expect(container.querySelector(".framer-icxlw2")).toBeTruthy();
  });
});
