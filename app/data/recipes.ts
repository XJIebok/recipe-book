// Описывает рецепты, их ингредиенты и этапы приготовления.

export type MeasurementUnit =
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "tsp"
  | "tbsp"
  | "piece"
  | "clove"
  | "pinch"
  | "slice";

export type QualitativeQuantity =
  | "to-taste"
  | "as-needed"
  | "for-frying"
  | "for-greasing"
  | "for-serving";

export type IngredientQuantity =
  | {
      type: "exact";
      amount: number;
      unit: MeasurementUnit;
    }
  | {
      type: "range";
      min: number;
      max: number;
      unit: MeasurementUnit;
    }
  | {
      type: "qualitative";
      value: QualitativeQuantity;
    };

// Описание ингридиента с id, названием и кол-вом с единицами измерения?
export type RecipeIngredient = {
  id: string;
  ingredientId: string;
  quantity: IngredientQuantity;
};

// Описание используемого на этапе ингридиента с возможным кол-вом
export type StepIngredientUsage = {
  recipeIngredientId: string;
  amount?: number;
};

// Описание шага приготовления
export type RecipeStep = {
  id: string;
  description: string;
  ingredients?: StepIngredientUsage[];
};
// Полное описание рецепта
export type Recipe = {
  id: string;
  title: string;
  summary: string;

  cuisine: string;
  baseServings: number;
  cookingTimeMinutes: number;

  ingredients: RecipeIngredient[];
  steps: RecipeStep[];

  image?: string;
  videoUrl?: string;
};

export const recipes: Recipe[] = [
  {
    id: "carbonara",
    title: "Паста карбонара",
    summary:
      "Итальянская паста с гуанчале, яйцом, сыром пекорино и чёрным перцем.",
    cuisine: "Итальянская",
    baseServings: 2,
    cookingTimeMinutes: 25,

    ingredients: [
      {
        id: "carbonara-spaghetti",
        ingredientId: "spaghetti",
        quantity: {
          type: "exact",
          amount: 200,
          unit: "g",
        },
      },
      {
        id: "carbonara-eggs",
        ingredientId: "egg",
        quantity: {
          type: "exact",
          amount: 2,
          unit: "piece",
        },
      },
      {
        id: "carbonara-pecorino",
        ingredientId: "pecorino",
        quantity: {
          type: "exact",
          amount: 60,
          unit: "g",
        },
      },
      {
        id: "carbonara-guanciale",
        ingredientId: "guanciale",
        quantity: {
          type: "exact",
          amount: 100,
          unit: "g",
        },
      },
      {
        id: "carbonara-pepper",
        ingredientId: "black-pepper",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "pinch",
        },
      },
      {
        id: "carbonara-salt",
        ingredientId: "salt",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
    ],

    steps: [
      {
        id: "carbonara-step-1",
        description: "Отварить спагетти до состояния al dente.",
        ingredients: [
          { recipeIngredientId: "carbonara-spaghetti" },
          { recipeIngredientId: "carbonara-salt" },
        ],
      },
      {
        id: "carbonara-step-2",
        description: "Обжарить нарезанный гуанчале.",
        ingredients: [{ recipeIngredientId: "carbonara-guanciale" }],
      },
      {
        id: "carbonara-step-3",
        description:
          "Смешать яйца с тёртым пекорино и чёрным перцем.",
        ingredients: [
          { recipeIngredientId: "carbonara-eggs" },
          { recipeIngredientId: "carbonara-pecorino" },
          { recipeIngredientId: "carbonara-pepper" },
        ],
      },
      {
        id: "carbonara-step-4",
        description:
          "Соединить горячую пасту с гуанчале и яично-сырной смесью.",
      },
    ],
  },

  {
    id: "pancakes",
    title: "Домашние блины",
    summary:
      "Тонкие блины на молоке, подходящие для сладких и несладких начинок.",
    cuisine: "Русская",
    baseServings: 4,
    cookingTimeMinutes: 35,

    ingredients: [
      {
        id: "pancakes-flour",
        ingredientId: "flour",
        quantity: {
          type: "exact",
          amount: 200,
          unit: "g",
        },
      },
      {
        id: "pancakes-milk",
        ingredientId: "milk",
        quantity: {
          type: "exact",
          amount: 500,
          unit: "ml",
        },
      },
      {
        id: "pancakes-eggs",
        ingredientId: "egg",
        quantity: {
          type: "exact",
          amount: 2,
          unit: "piece",
        },
      },
      {
        id: "pancakes-sugar",
        ingredientId: "sugar",
        quantity: {
          type: "exact",
          amount: 40,
          unit: "g",
        },
      },
      {
        id: "pancakes-salt",
        ingredientId: "salt",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "pinch",
        },
      },
      {
        id: "pancakes-oil",
        ingredientId: "vegetable-oil",
        quantity: {
          type: "exact",
          amount: 30,
          unit: "ml",
        },
      },
    ],

    steps: [
      {
        id: "pancakes-step-1",
        description:
          "Смешать яйца, сахар и соль до однородного состояния.",
        ingredients: [
          { recipeIngredientId: "pancakes-eggs" },
          { recipeIngredientId: "pancakes-sugar" },
          { recipeIngredientId: "pancakes-salt" },
        ],
      },
      {
        id: "pancakes-step-2",
        description:
          "Добавить половину молока и постепенно вмешать муку.",
        ingredients: [
          {
            recipeIngredientId: "pancakes-milk",
            amount: 250,
          },
          { recipeIngredientId: "pancakes-flour" },
        ],
      },
      {
        id: "pancakes-step-3",
        description:
          "Добавить оставшееся молоко и растительное масло.",
        ingredients: [
          {
            recipeIngredientId: "pancakes-milk",
            amount: 250,
          },
          { recipeIngredientId: "pancakes-oil" },
        ],
      },
      {
        id: "pancakes-step-4",
        description:
          "Выпекать блины с обеих сторон на хорошо разогретой сковороде.",
      },
    ],
  },

  {
    id: "chicken-soup",
    title: "Куриный суп",
    summary:
      "Простой домашний суп с куриной грудкой, картофелем и овощами.",
    cuisine: "Домашняя",
    baseServings: 4,
    cookingTimeMinutes: 50,

    ingredients: [
      {
        id: "soup-chicken",
        ingredientId: "chicken-breast",
        quantity: {
          type: "exact",
          amount: 400,
          unit: "g",
        },
      },
      {
        id: "soup-water",
        ingredientId: "water",
        quantity: {
          type: "exact",
          amount: 1500,
          unit: "ml",
        },
      },
      {
        id: "soup-potato",
        ingredientId: "potato",
        quantity: {
          type: "exact",
          amount: 3,
          unit: "piece",
        },
      },
      {
        id: "soup-carrot",
        ingredientId: "carrot",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "piece",
        },
      },
      {
        id: "soup-onion",
        ingredientId: "onion",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "piece",
        },
      },
      {
        id: "soup-salt",
        ingredientId: "salt",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
      {
        id: "soup-pepper",
        ingredientId: "black-pepper",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
    ],

    steps: [
      {
        id: "soup-step-1",
        description:
          "Залить куриную грудку водой и варить до готовности.",
        ingredients: [
          { recipeIngredientId: "soup-chicken" },
          { recipeIngredientId: "soup-water" },
        ],
      },
      {
        id: "soup-step-2",
        description:
          "Добавить нарезанные картофель, морковь и репчатый лук.",
        ingredients: [
          { recipeIngredientId: "soup-potato" },
          { recipeIngredientId: "soup-carrot" },
          { recipeIngredientId: "soup-onion" },
        ],
      },
      {
        id: "soup-step-3",
        description:
          "В конце приготовления добавить соль и чёрный перец по вкусу.",
        ingredients: [
          { recipeIngredientId: "soup-salt" },
          { recipeIngredientId: "soup-pepper" },
        ],
      },
    ],
  },
];

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}