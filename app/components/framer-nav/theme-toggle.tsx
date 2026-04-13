export function ThemeToggle() {
  return (
    <button
      type="button"
      data-testid="framer-nav-theme-toggle"
      aria-label="Theme"
      aria-pressed="false"
      style={{
        width: 55.8,
        height: 31,
        background:
          "var(--token-d98a4c00-7e0c-42c7-87be-9d10760cb03b, rgb(237, 75, 57))",
        border: "none",
        borderRadius: 15.5,
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        outline: "none",
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3.1,
          left: 3.1,
          width: 24.8,
          height: 24.8,
          borderRadius: "50%",
          background: "#FFFFFF",
          boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
          transition: "left 0.2s cubic-bezier(.4,1.2,.6,1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <span
          style={{
            width: 14.88,
            height: 14.88,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="var(--token-d98a4c00-7e0c-42c7-87be-9d10760cb03b, rgb(237, 75, 57))"
            xmlns="http://www.w3.org/2000/svg"
            transform="matrix(-1, 0, 0, -1, 0, 0)"
            aria-hidden="true"
          >
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
