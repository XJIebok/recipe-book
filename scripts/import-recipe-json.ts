/** Локальный пример импорта из файла. НЕ является публичным API. */
import "dotenv/config";
import { readFile, stat } from "node:fs/promises";
import { prisma } from "../app/lib/prisma";
import { saveRecipe } from "../app/lib/recipe-import/save-recipe";

async function main() {
  const filePath = process.argv[2];
  const allowNew = process.argv.includes("--allow-new-ingredients");
  if (!filePath || filePath.startsWith("--")) {
    throw new Error(
      "Использование: npx.cmd tsx scripts/import-recipe-json.ts examples/recipe-import.example.json",
    );
  }
  const metadata = await stat(filePath);
  if (metadata.size > 256 * 1024) {
    throw new Error("JSON слишком большой (ограничение для локального импорта: 256 КБ)");
  }
  const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
  const saved = await saveRecipe(raw, {
    mode: "create",
    allowCreateIngredients: allowNew,
  });
  console.log(`Рецепт создан: /recipes/${saved.slug} (ID ${saved.id})`);
}

main()
  .catch((error: unknown) => {
    console.error("Не удалось импортировать рецепт:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
