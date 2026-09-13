export const PASSWORD_MIN_LENGTH = 8;

export function validateName(name: string): string | null {
  if (!name.trim()) {
    return "Введите имя.";
  }

  return null;
}

export function validateEmail(email: string): string | null {
  const value = email.trim();

  if (!value) {
    return "Введите email.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    return "Введите корректный email.";
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Введите пароль.";
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Пароль должен содержать не менее ${PASSWORD_MIN_LENGTH} символов.`;
  }

  return null;
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string,
): string | null {
  if (!confirmation) {
    return "Повторите пароль.";
  }

  if (password !== confirmation) {
    return "Введённые пароли не совпадают.";
  }

  return null;
}