import Link from "next/link";
import type { ReactNode } from "react";

const letterStyle = {
  display: "inline-block",
  willChange: "transform",
  transform: "none",
  opacity: 1,
} as const;

function letters(word: string): ReactNode[] {
  return [...word].map((ch, i) => (
    <span key={`${word}-${i}`} style={letterStyle}>
      {ch}
    </span>
  ));
}

export function RollingTextLink({
  text,
  href,
}: {
  text: string;
  href?: string;
}) {
  const nodes: ReactNode[] = [];
  text.split(" ").forEach((word, i) => {
    if (i > 0) nodes.push(<span key={`sp-${i}`}> </span>);
    nodes.push(
      <span key={`w-${i}`} style={{ whiteSpace: "nowrap" }}>
        {letters(word)}
      </span>,
    );
  });

  if (!href) {
    return <span className="framer-text framer-styles-preset-5wnr52">{nodes}</span>;
  }

  return (
    <Link href={href} className="framer-text framer-styles-preset-5wnr52">
      {nodes}
    </Link>
  );
}
