import type { ReactNode } from "react";

const spanStyle = {
  display: "inline-block",
  opacity: 1,
  transform: "none",
  willChange: "transform",
} as const;

function letters(word: string): ReactNode[] {
  return [...word].map((ch, i) => (
    <span key={i} style={spanStyle}>
      {ch}
    </span>
  ));
}

export function HeadingWordSpans({ words }: { words: readonly string[] }) {
  return (
    <>
      {words.map((w, wi) => (
        <span key={wi}>
          {wi > 0 ? <span> </span> : null}
          <span style={{ whiteSpace: "nowrap" }}>{letters(w)}</span>
        </span>
      ))}
    </>
  );
}

export function YearSpans({ text }: { text: string }) {
  return (
    <span style={{ whiteSpace: "nowrap" }}>{letters(text)}</span>
  );
}
