import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import AppNav from "./ui/AppNav";
import DemoAuthProvider from "./providers/DemoAuthProvider";

export const metadata: Metadata = {
  title: "Электронная книга рецептов",
  description: "Учебный проект на Next.js",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body>
        <DemoAuthProvider>
          <AppNav />
          {children}
        </DemoAuthProvider>
      </body>
    </html>
  );
}