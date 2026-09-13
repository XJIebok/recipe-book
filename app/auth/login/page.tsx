"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    useState,
    type FormEvent,
} from "react";
import {
    PASSWORD_MIN_LENGTH,
    validateEmail,
    validatePassword,
} from "../../validation/auth";
import { useDemoAuth } from "../../providers/DemoAuthProvider";
import styles from "../Auth.module.css";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useDemoAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newEmailError = validateEmail(email);
        const newPasswordError = validatePassword(password);

        setEmailError(newEmailError ?? "");
        setPasswordError(newPasswordError ?? "");

        if (newEmailError || newPasswordError) {
            return;
        }

        login(email.trim());
        router.push("/account");
    }

    return (
        <main className={styles.formPage}>
        <h1>Вход</h1>

        <p className={styles.warning}>
            Учебный прототип авторизации: пароль не проверяется
            сервером, а состояние пользователя сохраняется только до
            обновления страницы.
        </p>

        <form 
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
        >
            <label htmlFor="email">Email</label>

            <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                    const newEmail = event.target.value;

                    setEmail(newEmail);

                    if (emailError) {
                    setEmailError(validateEmail(newEmail) ?? "");
                    }
                }}
                onBlur={() => {
                    setEmailError(validateEmail(email) ?? "");
                }}
                autoComplete="email"
                required
            />

            {emailError ? (
                <p className={styles.error}>{emailError}</p>
            ) : null}

            <label htmlFor="password">Пароль</label>

            <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                    const newPassword = event.target.value;

                    setPassword(newPassword);

                    if (passwordError) {
                    setPasswordError(validatePassword(newPassword) ?? "");
                    }
                }}
                onBlur={() => {
                    setPasswordError(validatePassword(password) ?? "");
                }}
                autoComplete="current-password"
                minLength={PASSWORD_MIN_LENGTH}
                required
            />

            {passwordError ? (
                <p className={styles.error}>{passwordError}</p>
            ) : null}

            <button type="submit">Войти</button>
        </form>

        <p>
            Нет учебной записи?{" "}
            <Link
                className={styles.authLink}
                href="/auth/register"
            >
                Зарегистрироваться
            </Link>
        </p>
        </main>
    );
}