"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoAuth } from "../providers/DemoAuthProvider";

const links = [
  { href: "/start", label: "Главная" },
  { href: "/recipes", label: "Рецепты" },
  { href: "/about", label: "О проекте" },
];

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppNav() {
  const pathname = usePathname();
  const { user, logout } = useDemoAuth();

  return (
    <header className="site-header">
      <Link className="brand" href="/start">
        Электронная книга рецептов
      </Link>

      <nav className="site-nav" aria-label="Основная навигация">
        <ul className="nav-list">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="nav-link"
                href={link.href}
                aria-current={
                  isActive(pathname, link.href) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="auth-area">
        {user ? (
          <>
            <Link
              className="nav-link"
              href="/account"
              aria-current={
                isActive(pathname, "/account") ? "page" : undefined
              }
            >
              {user.name}
            </Link>

            <button type="button" onClick={logout}>
              Выйти
            </button>
          </>
        ) : (
          <Link
            className="nav-link"
            href="/auth/login"
            aria-current={
              pathname.startsWith("/auth/") ? "page" : undefined
            }
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}