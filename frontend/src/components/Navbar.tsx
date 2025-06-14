"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Aakash's Posts" },
  { href: "/community", label: "Community" },
  { href: "/write", label: "Write" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-gray-800 bg-black sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="text-lg font-semibold tracking-tight text-white">📰 QuantBlog</div>
        <ul className="flex space-x-4 text-sm font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "px-3 py-2 rounded text-white hover:bg-gray-900 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
                  pathname === link.href && "bg-gray-900 text-blue-400"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
