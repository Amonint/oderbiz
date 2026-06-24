import type { ReactNode } from "react";

const letterSpanStyle = {
  display: "inline-block",
  opacity: 1,
  transform: "none",
  willChange: "transform",
} as const;

function letters(word: string): ReactNode[] {
  return [...word].map((ch, i) => (
    <span key={i} style={letterSpanStyle}>
      {ch === " " ? "\u00a0" : ch}
    </span>
  ));
}

export function TitleLetterSpans({ groups }: { groups: string[] }) {
  return (
    <>
      {groups.map((g, gi) => (
        <span key={gi}>
          {gi > 0 ? <span>{"\u00a0"}</span> : null}
          <span style={{ whiteSpace: "nowrap" }}>{letters(g)}</span>
        </span>
      ))}
    </>
  );
}

export function ServiceLetterSpans({ groups }: { groups: string[] }) {
  const nodes: ReactNode[] = [];
  groups.forEach((g, gi) => {
    if (gi > 0) {
      nodes.push(
        <span key={`sep-${gi}`} style={{ opacity: 0.5 }}>
          {" / "}
        </span>,
      );
    }
    nodes.push(
      <span key={`g-${gi}`} style={{ whiteSpace: "nowrap" }}>
        {letters(g)}
      </span>,
    );
  });
  return <>{nodes}</>;
}
