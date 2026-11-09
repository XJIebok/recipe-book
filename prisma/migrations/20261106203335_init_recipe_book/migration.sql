-- CreateEnum
CREATE TYPE "Cuisine" AS ENUM ('ITALIAN', 'RUSSIAN', 'HOME_STYLE');

-- CreateEnum
CREATE TYPE "UnitKind" AS ENUM ('NUMERIC', 'QUALITATIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "summary" TEXT NOT NULL,
    "cuisine" "Cuisine",
    "baseServings" INTEGER NOT NULL,
    "cookingTimeMinutes" INTEGER NOT NULL,
    "image" TEXT,
    "imageAlt" TEXT,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasurementUnit" (
    "code" VARCHAR(32) NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "kind" "UnitKind" NOT NULL,

    CONSTRAINT "MeasurementUnit_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "IngredientMeasurement" (
    "id" SERIAL NOT NULL,
    "ingredientId" VARCHAR(100) NOT NULL,
    "unitCode" VARCHAR(32) NOT NULL,
    "amount" DECIMAL(12,3),
    "maxAmount" DECIMAL(12,3),

    CONSTRAINT "IngredientMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "measurementId" INTEGER NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeStep" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "imageAlt" TEXT,
    "durationMinutes" INTEGER,

    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepIngredientUsage" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,
    "recipeIngredientId" INTEGER NOT NULL,
    "fraction" DECIMAL(8,6),

    CONSTRAINT "StepIngredientUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteRecipe" (
    "userId" UUID NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteRecipe_pkey" PRIMARY KEY ("userId","recipeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");

-- CreateIndex
CREATE INDEX "Recipe_cuisine_cookingTimeMinutes_idx" ON "Recipe"("cuisine", "cookingTimeMinutes");

-- CreateIndex
CREATE INDEX "Recipe_cookingTimeMinutes_idx" ON "Recipe"("cookingTimeMinutes");

-- CreateIndex
CREATE INDEX "Recipe_title_idx" ON "Recipe"("title");

-- CreateIndex
CREATE INDEX "RecipeIngredient_measurementId_recipeId_idx" ON "RecipeIngredient"("measurementId", "recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_measurementId_key" ON "RecipeIngredient"("recipeId", "measurementId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_id_recipeId_key" ON "RecipeIngredient"("id", "recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStep_recipeId_position_key" ON "RecipeStep"("recipeId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStep_id_recipeId_key" ON "RecipeStep"("id", "recipeId");

-- CreateIndex
CREATE INDEX "StepIngredientUsage_recipeIngredientId_recipeId_idx" ON "StepIngredientUsage"("recipeIngredientId", "recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "StepIngredientUsage_stepId_recipeIngredientId_key" ON "StepIngredientUsage"("stepId", "recipeIngredientId");

-- CreateIndex
CREATE INDEX "FavoriteRecipe_recipeId_idx" ON "FavoriteRecipe"("recipeId");

-- AddForeignKey
ALTER TABLE "IngredientMeasurement" ADD CONSTRAINT "IngredientMeasurement_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientMeasurement" ADD CONSTRAINT "IngredientMeasurement_unitCode_fkey" FOREIGN KEY ("unitCode") REFERENCES "MeasurementUnit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "IngredientMeasurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStep" ADD CONSTRAINT "RecipeStep_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepIngredientUsage" ADD CONSTRAINT "StepIngredientUsage_stepId_recipeId_fkey" FOREIGN KEY ("stepId", "recipeId") REFERENCES "RecipeStep"("id", "recipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepIngredientUsage" ADD CONSTRAINT "StepIngredientUsage_recipeIngredientId_recipeId_fkey" FOREIGN KEY ("recipeIngredientId", "recipeId") REFERENCES "RecipeIngredient"("id", "recipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
