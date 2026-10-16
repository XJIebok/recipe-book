from pathlib import Path
from datetime import datetime

# Скрипт рассчитан на то, что этот файл лежит в корне Next.js-проекта,
# рядом с package.json и папкой app.
PROJECT_DIR = Path(__file__).resolve().parent
APP_DIR = PROJECT_DIR / "app"

# Какие файлы из app добавлять в итоговый Markdown.
LANGUAGES = {
    ".tsx": "tsx",
    ".ts": "typescript",
    ".css": "css",
}

OUTPUT_FILENAME = "all_recipe_app_code.md"
OUTPUT_PATH = PROJECT_DIR / OUTPUT_FILENAME


def merge_app_files() -> None:
    if not APP_DIR.exists():
        print(
            f"Ошибка: папка '{APP_DIR}' не найдена.\n"
            "Положите этот скрипт в корень Next.js-проекта рядом с папкой app."
        )
        return

    files = sorted(
        path
        for path in APP_DIR.rglob("*")
        if path.is_file() and path.suffix.lower() in LANGUAGES
    )

    generated_at = datetime.now().strftime("%Y-%m-%d %H:%M")

    with OUTPUT_PATH.open("w", encoding="utf-8") as outfile:
        outfile.write("# Recipe App Code Snapshot\n\n")
        outfile.write(f"Generated: {generated_at}\n\n")
        outfile.write(f"Files: {len(files)}\n")

        for file_path in files:
            relative_path = file_path.relative_to(PROJECT_DIR).as_posix()
            language = LANGUAGES[file_path.suffix.lower()]

            outfile.write(f"\n# ./{relative_path}\n\n")
            outfile.write(f"```{language}\n")

            try:
                content = file_path.read_text(encoding="utf-8", errors="ignore")
                outfile.write(content)

                # Чтобы закрывающие ``` всегда начинались с новой строки.
                if content and not content.endswith("\n"):
                    outfile.write("\n")
            except Exception as exc:
                outfile.write(f"// Ошибка чтения файла: {exc}\n")

            outfile.write("```\n")

    print(f"Готово. Собрано файлов: {len(files)}")
    print(f"Итоговый файл: {OUTPUT_PATH}")


if __name__ == "__main__":
    merge_app_files()
