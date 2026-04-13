"use client";

import { useEffect, useState } from "react";

function isFreezeTimeSearch(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("freezeTime");
}

export function NavLocalTime() {
  const [label, setLabel] = useState(() =>
    isFreezeTimeSearch() ? "2:04 PM" : "",
  );

  useEffect(() => {
    if (isFreezeTimeSearch()) {
      return;
    }
    const formatter = new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setLabel(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      style={{
        fontFamily: '"Inter", "Inter Placeholder", sans-serif',
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: 400,
        letterSpacing: "0em",
        lineHeight: "12px",
        textAlign: "left",
        color:
          "var(--token-d98a4c00-7e0c-42c7-87be-9d10760cb03b, rgb(237, 75, 57))",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span>{label || "—"}</span>
    </div>
  );
}
