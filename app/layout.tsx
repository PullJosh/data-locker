import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Data Locker",
  description: "Store some data online easily.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 flex h-20 items-stretch border-b bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-3xl flex-grow items-stretch justify-between px-16">
            <Link href="/" className="flex items-center hover:underline">
              <h1 className="text-xl font-bold">Data Locker</h1>
            </Link>
            <nav className="flex items-center">
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </nav>
          </div>
        </header>
        <div className="mx-auto max-w-3xl px-16">{children}</div>
      </body>
    </html>
  );
}
