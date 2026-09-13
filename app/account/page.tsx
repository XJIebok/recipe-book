"use client";

import Link from "next/link";

import { useDemoAuth } from "../providers/DemoAuthProvider";

export default function AccountPage() {
  const { user, logout } = useDemoAuth();

  if (!user) {
    return (
      <main>
        <p className="eyebrow">Пользователь</p>

        <h1>Личный кабинет</h1>

        <p>
          Вы не вошли в учебную учётную запись.
        </p>

        <Link className="main-link" href="/auth/login">
          Перейти ко входу
        </Link>
      </main>
    );
  }

  return (
    <main>
      <p className="eyebrow">Пользователь</p>

      <h1>Личный кабинет</h1>

      <dl className="profile-list">
        <dt>Имя</dt>
        <dd>{user.name}</dd>

        <dt>Email</dt>
        <dd>{user.email}</dd>
      </dl>

      <button
        className="secondary-button"
        type="button"
        onClick={logout}
      >
        Выйти
      </button>
    </main>
  );
}