
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { useDemoAuth } from "../../providers/DemoAuthProvider";
import styles from "./BurgerMenu.module.css";

// Основные маршруты приложения.
const links = [
  { href: "/start", label: "Главная" },
  { href: "/recipes", label: "Рецепты" },
  { href: "/gallery", label: "Галерея" },
  { href: "/about", label: "О проекте" },
  { href: "/account", label: "Личный кабинет" },
];

// Проверка активного маршрута.
function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BurgerMenu() {
  const pathname = usePathname();
  const { user, logout } = useDemoAuth();

  const [isOpen, setIsOpen] = useState(false);

  const panelId = useId();
  const titleId = useId();

  // Ссылки на элементы, участвующие в управлении фокусом.
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Запоминаем кнопку, открывшую меню.
    const triggerButton = triggerRef.current;

    // Запоминаем прежний режим прокрутки.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // При открытии фокус переходит на кнопку закрытия.
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      // Получаем доступные для клавиатуры элементы меню.
      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), ' +
          'input:not([disabled]), select:not([disabled]), ' +
          'textarea:not([disabled]), ' +
          '[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (!first || !last) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const activeElement = document.activeElement;
      const focusOutside = !panelRef.current.contains(activeElement);

      // Зацикливаем фокус внутри открытой панели.
      if (
        event.shiftKey &&
        (activeElement === first || focusOutside)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === last || focusOutside)
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Восстанавливаем страницу при закрытии меню.
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerButton?.focus();
    };
  }, [isOpen, closeMenu]);

  function handleLogout() {
    logout();
    closeMenu();
  }

  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/start">
        Электронная книга рецептов
      </Link>

      <button
        ref={triggerRef}
        className={styles.menuButton}
        type="button"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span aria-hidden="true">☰</span>
        <span>Меню</span>
      </button>

      {/* Фон и панель меню. */}
      <div
        id={panelId}
        className={styles.overlay}
        hidden={!isOpen}
        onClick={(event) => {
          // Нажатие внутри панели не должно закрывать её.
          if (event.target === event.currentTarget) {
            closeMenu();
          }
        }}
      >
        <div
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
        >
          <div className={styles.panelHeader}>
            <h2 id={titleId}>Навигация</h2>

            <button
              ref={closeButtonRef}
              className={styles.closeButton}
              type="button"
              aria-label="Закрыть меню"
              onClick={closeMenu}
            >
              ×
            </button>
          </div>

          <nav
            className={styles.navigation}
            aria-label="Основная навигация"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                className={styles.navLink}
                href={link.href}
                aria-current={
                  isActive(pathname, link.href)
                    ? "page"
                    : undefined
                }
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.accountArea}>
            {user ? (
              <>
                <p className={styles.userInfo}>
                  Вы вошли как
                  <strong>{user.name}</strong>
                </p>

                <button
                  className={styles.logoutButton}
                  type="button"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link
                className={styles.loginLink}
                href="/auth/login"
                aria-current={
                  pathname.startsWith("/auth/")
                    ? "page"
                    : undefined
                }
                onClick={closeMenu}
              >
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
