import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Cushon Stocks & Shares ISA</title>
      <body>{children}</body>
    </html>
  );
}
