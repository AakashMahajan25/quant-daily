import "./globals.css";
import "react-markdown-editor-lite/lib/index.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "QuantBlog by Aakash",
  description: "Market Insights, Community News & Posts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
