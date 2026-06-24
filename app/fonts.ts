import localFont from "next/font/local";

export const messinaSans = localFont({
  src: [
    {
      path: "../public/fonts/MessinaSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/MessinaSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/MessinaSans-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/MessinaSans-BookItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/MessinaSans-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/MessinaSans-RegularItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/MessinaSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/MessinaSans-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/MessinaSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/MessinaSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/MessinaSans-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/MessinaSans-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-messina",
  display: "swap",
});
