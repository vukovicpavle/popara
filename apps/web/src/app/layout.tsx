import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popara",
  description: "Popara web application",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
