"""Создаёт all_recipe_app_code.md со снимком исходников Next.js-проекта.

Положите файл в корень проекта под именем md_merge_next.py и запустите:
    py md_merge_next.py

Не копирует .env, пароли из него, node_modules, .next и бинарные файлы.
Перед отправкой снимка другим людям всё равно проверьте, нет ли секретов в исходниках.
"""

from datetime import datetime
from pathlib import Path
import re


# Скрипт должен лежать рядом с package.json.
PROJECT_DIR = Path(__file__).resolve().parent
OUTPUT_PATH = PROJECT_DIR / "all_recipe_app_code.md"

# Исходники, Prisma, миграции, скрипты и тесты.
SOURCE_DIRS = (
    "app",
    "src",
    "components",
    "lib",
    "hooks",
    "utils",
    "types",
    "context",
    "contexts",
    "data",
    "prisma",
    "scripts",
    "tests",
    "__tests__",
    "e2e",
)

# Важные файлы конфигурации и документации в корне проекта.
ROOT_FILES = (
    "package.json",
    "tsconfig.json",
    "next.config.ts",
    "next.config.js",
    "next.config.mjs",
    "eslint.config.mjs",
    "eslint.config.js",
    "eslint.config.ts",
    ".eslintrc.json",
    ".eslintrc.js",
    ".eslintrc.cjs",
    "postcss.config.mjs",
    "postcss.config.js",
    "postcss.config.ts",
    "tailwind.config.ts",
    "tailwind.config.js",
    "prisma.config.ts",
    "prisma.config.js",
    "components.json",
    "playwright.config.ts",
    "vitest.config.ts",
    ".gitignore",
    "README.md",
    "md_merge_next.py",
)

# Расширения исходников, которые можно безопасно прочесть как текст.
LANGUAGES = {
    ".tsx": "tsx",
    ".ts": "typescript",
    ".jsx": "jsx",
    ".js": "javascript",
    ".mjs": "javascript",
    ".cjs": "javascript",
    ".css": "css",
    ".scss": "scss",
    ".prisma": "prisma",
    ".sql": "sql",
    ".json": "json",
    ".md": "markdown",
    ".mdx": "mdx",
    ".py": "python",
    ".toml": "toml",
    ".yml": "yaml",
    ".yaml": "yaml",
    ".graphql": "graphql",
    ".gql": "graphql",
    ".ps1": "powershell",
    ".sh": "bash",
    ".txt": "text",
}

# Не сканируем зависимости, сборки, кэш и сгенерированный код.
SKIP_DIRS = {
    ".git", ".next", "node_modules", ".turbo", ".cache", ".prisma",
    "dist", "build", "coverage", "generated", "__pycache__", ".venv", "venv",
}
SKIP_FILES = {"package-lock.json", "pnpm-lock.yaml", "yarn.lock", "bun.lockb",
              "bun.lock", "next-env.d.ts", "tsconfig.tsbuildinfo"}
MAX_FILE_BYTES = 500_000  # Защита от случайного включения огромных файлов.
MAX_ASSET_NAMES = 150     # В public перечисляем только имена, не содержимое.


def is_allowed(path: Path) -> bool:
    """Проверка, что файл относится к исходникам, а не к секретам/сборке."""
    if not path.is_file() or path.is_symlink():
        return False
    relative = path.relative_to(PROJECT_DIR)
    if any(part in SKIP_DIRS for part in relative.parts[:-1]):
        return False
    if path.name in SKIP_FILES or path == OUTPUT_PATH:
        return False
    # Ни .env, ни .env.local, ни .env.production не включаем в снимок.
    if path.name == ".env" or path.name.startswith(".env."):
        return False
    return path.suffix.lower() in LANGUAGES or path.name in ROOT_FILES


def collect_files() -> list[Path]:
    found: set[Path] = set()
    for filename in ROOT_FILES:
        path = PROJECT_DIR / filename
        if is_allowed(path):
            found.add(path)

    for dirname in SOURCE_DIRS:
        directory = PROJECT_DIR / dirname
        if not directory.is_dir() or directory.is_symlink():
            continue
        for path in directory.rglob("*"):
            if is_allowed(path):
                found.add(path)

    return sorted(found, key=lambda p: p.relative_to(PROJECT_DIR).as_posix())


def public_asset_names() -> list[str]:
    directory = PROJECT_DIR / "public"
    if not directory.is_dir() or directory.is_symlink():
        return []
    return sorted(
        path.relative_to(PROJECT_DIR).as_posix()
        for path in directory.rglob("*")
        if path.is_file() and not path.is_symlink()
        and not any(part in SKIP_DIRS for part in path.relative_to(PROJECT_DIR).parts[:-1])
    )


def example_env_names() -> list[str]:
    """Из .env.example переносим только НАЗВАНИЯ переменных, никогда значения."""
    example = PROJECT_DIR / ".env.example"
    if not example.is_file() or example.is_symlink():
        return []
    pattern = re.compile(r"^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=")
    names: set[str] = set()
    for line in example.read_text(encoding="utf-8-sig").splitlines():
        match = pattern.match(line)
        if match:
            names.add(match.group(1))
    return sorted(names)


def write_code_block(outfile, content: str, language: str) -> None:
    """Подбираем длину Markdown-ограждения на случай ``` внутри исходника."""
    longest = max((len(m.group()) for m in re.finditer(r"`+", content)), default=0)
    fence = "`" * max(3, longest + 1)
    outfile.write(f"{fence}{language}\n")
    outfile.write(content)
    if content and not content.endswith("\n"):
        outfile.write("\n")
    outfile.write(f"{fence}\n")


def merge_project_files() -> None:
    if not (PROJECT_DIR / "package.json").exists():
        print("Ошибка: рядом со скриптом нет package.json. Поместите его в корень проекта.")
        return
    if not ((PROJECT_DIR / "app").is_dir() or (PROJECT_DIR / "src" / "app").is_dir()):
        print("Ошибка: папка app/ или src/app/ не найдена.")
        return

    files = collect_files()
    asset_names = public_asset_names()
    env_names = example_env_names()
    included = 0
    skipped: list[str] = []

    with OUTPUT_PATH.open("w", encoding="utf-8") as outfile:
        outfile.write("# Recipe App: снимок исходного кода\n\n")
        outfile.write(f"Создан: {datetime.now():%Y-%m-%d %H:%M}\n\n")
        outfile.write("Включены исходники приложения, конфигурация, Prisma, миграции, seed и скрипты.\n")
        outfile.write("Исключены .env-файлы, node_modules, .next, lock-файлы и бинарные данные.\n\n")

        outfile.write("## Структура проекта (отобранные файлы)\n\n")
        for path in files:
            outfile.write(f"- `{path.relative_to(PROJECT_DIR).as_posix()}`\n")

        if asset_names:
            outfile.write("\n## Файлы в public/ (только пути, без содержимого)\n\n")
            for path in asset_names[:MAX_ASSET_NAMES]:
                outfile.write(f"- `{path}`\n")
            if len(asset_names) > MAX_ASSET_NAMES:
                outfile.write(f"\n... и ещё {len(asset_names) - MAX_ASSET_NAMES} файлов.\n")

        if env_names:
            outfile.write("\n## Переменные из .env.example (только названия)\n\n")
            for name in env_names:
                outfile.write(f"- `{name}`\n")

        outfile.write("\n## Содержимое исходников\n")
        for path in files:
            relative = path.relative_to(PROJECT_DIR).as_posix()
            try:
                if path.stat().st_size > MAX_FILE_BYTES:
                    skipped.append(f"{relative}: слишком большой файл")
                    continue
                content = path.read_text(encoding="utf-8-sig")
            except (OSError, UnicodeError) as exc:
                skipped.append(f"{relative}: ошибка чтения ({type(exc).__name__})")
                continue

            language = LANGUAGES.get(path.suffix.lower(), "text")
            outfile.write(f"\n### ./{relative}\n\n")
            write_code_block(outfile, content, language)
            included += 1

        if skipped:
            outfile.write("\n## Пропущенные файлы\n\n")
            for item in skipped:
                outfile.write(f"- {item}\n")

    print(f"Готово. Собрано исходных файлов: {included} из {len(files)}")
    print(f"Названий файлов public/: {len(asset_names)}")
    print(f"Итоговый файл: {OUTPUT_PATH}")
    if skipped:
        print(f"Пропущено: {len(skipped)} (подробности в итоговом Markdown)")
    print("Перед передачей снимка проверьте, что в самом исходном коде нет секретов.")


if __name__ == "__main__":
    merge_project_files()
