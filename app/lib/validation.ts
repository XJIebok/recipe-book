
import { z } from "zod";

// Приводим email к единому виду.
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Описываем допустимые данные регистрации.
const registrationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Имя должно содержать минимум 2 символа.")
      .max(80, "Имя не должно превышать 80 символов."),

    email: z
      .string()
      .transform(normalizeEmail)
      .pipe(
        z
          .string()
          .max(254, "Email слишком длинный.")
          .email("Некорректный email."),
      ),

    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов."),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Пароли не совпадают.",
      path: ["confirmPassword"],
    },
  );

// Проверяем данные, не доверяя их типу.
export function validateRegistration(input: unknown) {
  return registrationSchema.safeParse(input);
}
