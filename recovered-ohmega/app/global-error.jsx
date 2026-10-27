"use client";

import PortfolioError from "./error";

export default function GlobalError({ retry }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#fff" }}>
        <PortfolioError retry={retry} />
      </body>
    </html>
  );
}
