"use client";

import Link from "next/link";

interface MenuItemProps {
  label: string;
  href: string;
}

export default function MenuItem({ label, href }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary"
    >
      {label}
    </Link>
  );
}
