"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuItem({ items }) {
  const pathname = usePathname();
  return (
    <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
      {items.map((item) => (
        <li
          className={`nav-item ${pathname == item.link ? "active" : ""}`}
          key={item.link}
        >
          <Link href={item.link} className="nav-link">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
