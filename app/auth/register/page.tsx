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
    validateName,
    validatePassword,
    validatePasswordConfirmation,
} from "../../validation/auth";
import { useDemoAuth } from "../../providers/DemoAuthProvider";
import styles from "../Auth.module.css";

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useDemoAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmationError, setConfirmationError] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newNameError = validateName(name);
        const newEmailError = validateEmail(email);
        const newPasswordError = validatePassword(password);
        const newConfirmationError =
            validatePasswordConfirmation(password, confirmation);

        setNameError(newNameError ?? "");
        setEmailError(newEmailError ?? "");
        setPasswordError(newPasswordError ?? "");
        setConfirmationError(newConfirmationError ?? "");

        if (
            newNameError ||
            newEmailError ||
            newPasswordError ||
            newConfirmationError
        ) {
            return;
        }

        register(name.trim(), email.trim());
        router.push("/account");
    }

    return (
        <main className={styles.formPage}>
        <h1>Регистрация</h1>

        <p className={styles.warning}>
            Учебный прототип авторизации: данные пользователя существуют
            только до обновления страницы и не записываются в базу данных.
        </p>

        <form 
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
        >
            <label htmlFor="name">Имя</label>

            <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => {
                    const newName = event.target.value;

                    setName(newName);

                    if (nameError) {
                    setNameError(validateName(newName) ?? "");
                    }
                }}
                onBlur={() => {
                    setNameError(validateName(name) ?? "");
                }}
                autoComplete="name"
                required
            />

            {nameError ? (
                <p className={styles.error}>{nameError}</p>
            ) : null}

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

                    if (confirmation) {
                    setConfirmationError(
                        validatePasswordConfirmation(
                        newPassword,
                        confirmation,
                        ) ?? "",
                    );
                    }
                }}
                onBlur={() => {
                    setPasswordError(validatePassword(password) ?? "");

                    if (confirmation) {
                    setConfirmationError(
                        validatePasswordConfirmation(
                        password,
                        confirmation,
                        ) ?? "",
                    );
                    }
                }}
                autoComplete="new-password"
                minLength={PASSWORD_MIN_LENGTH}
                required
            />

            {passwordError ? (
                <p className={styles.error}>{passwordError}</p>
            ) : null}

            <label htmlFor="confirmation">
                Повторите пароль
            </label>

            <input
                id="confirmation"
                type="password"
                value={confirmation}
                onChange={(event) => {
                    const newConfirmation = event.target.value;

                    setConfirmation(newConfirmation);

                    if (confirmationError) {
                        setConfirmationError(
                            validatePasswordConfirmation(
                            password,
                            newConfirmation,
                            ) ?? "",
                        );
                    }
                }}
                onBlur={() => {
                    setConfirmationError(
                        validatePasswordConfirmation(
                            password,
                            confirmation,
                        ) ?? "",
                    );
                }}
                autoComplete="new-password"
                minLength={PASSWORD_MIN_LENGTH}
                required
            />

            {confirmationError ? (
                <p className={styles.error}>{confirmationError}</p>
            ) : null}

            <button type="submit">
            Зарегистрироваться
            </button>
        </form>

        <p>
            Уже есть учётная запись?{" "}
            <Link
                className={styles.authLink}
                href="/auth/login"
            >
                Войти
            </Link>
        </p>
        </main>
    );
}