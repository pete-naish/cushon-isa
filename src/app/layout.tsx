import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Cushon - Stocks &amp; Shares ISA - Pete Naish</title>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-196x196.png"
          sizes="196x196"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body>{children}</body>
    </html>
  );
}
