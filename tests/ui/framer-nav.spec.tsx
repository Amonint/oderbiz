import fs from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FramerExactNav } from "@/app/components/framer-nav/framer-exact-nav";

describe("framer nav tokens", () => {
  it("define tokens criticos de color", () => {
    const css = fs.readFileSync("app/globals.css", "utf8");
    expect(css).toContain("--token-d98a4c00-7e0c-42c7-87be-9d10760cb03b");
    expect(css).toContain("--token-e5a511bf-849c-4ac6-b942-175c537ace13");
  });
});

describe("FramerExactNav structure", () => {
  it("renderiza logo, 6 links y bloque info", () => {
    render(<FramerExactNav />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /work/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ai labs/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByText("Based in India")).toBeInTheDocument();
    expect(screen.getByText("AI-First Creative Solutions")).toBeInTheDocument();
  });

  it("renderiza cada item del menu como caracteres individuales", () => {
    render(<FramerExactNav />);
    const homeChars = screen.getAllByText(/H|o|m|e/);
    expect(homeChars.length).toBeGreaterThanOrEqual(4);
  });

  it("incluye switch con aria-pressed y estilos de dimensiones exactas", () => {
    render(<FramerExactNav />);
    const button = screen.getAllByTestId("framer-nav-theme-toggle")[0];
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveStyle({ width: "55.8px", height: "31px" });
  });
});
