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
  imageAlt: string;
  videoUrl?: string;
};

export const recipes: Recipe[] = [
  {
    id: "carbonara",
    title: "Паста карбонара",
    summary:
      "Итальянская паста с гуанчале, яйцом, сыром пекорино и чёрным перцем.",
    imageAlt: "Паста карбонара с сыром и чёрным перцем",
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
    image: "/images/recipes/pancakes.jpg",
    imageAlt: "Домашние блины на молоке",
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
    imageAlt: "Куриный суп",
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

  {
    id: "solyanka",
    title: "Домашняя солянка с сосисками и ветчиной",
    summary:
      "Сытная домашняя солянка с охотничьими и сливочными " +
      "сосисками, ветчиной, картофелем и томатной зажаркой.",
    image: "/images/recipes/solyanka.jpg",
    imageAlt: "Домашняя солянка с сосиками и ветчиной",
    cuisine: "Русская",
    baseServings: 10,
    cookingTimeMinutes: 50,

    ingredients: [
      {
        id: "solyanka-hunting-sausages",
        ingredientId: "hunting-sausages",
        quantity: {
          type: "exact",
          amount: 500,
          unit: "g",
        },
      },
      {
        id: "solyanka-creamy-sausages",
        ingredientId: "creamy-sausages",
        quantity: {
          type: "exact",
          amount: 500,
          unit: "g",
        },
      },
      {
        id: "solyanka-ham",
        ingredientId: "ham",
        quantity: {
          type: "exact",
          amount: 500,
          unit: "g",
        },
      },
      {
        id: "solyanka-potato",
        ingredientId: "potato",
        quantity: {
          type: "exact",
          amount: 4,
          unit: "piece",
        },
      },
      {
        id: "solyanka-onion",
        ingredientId: "onion",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "piece",
        },
      },
      {
        id: "solyanka-carrot",
        ingredientId: "carrot",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "piece",
        },
      },
      {
        id: "solyanka-tomato-paste",
        ingredientId: "tomato-paste",
        quantity: {
          type: "exact",
          amount: 2,
          unit: "tbsp",
        },
      },
      
      {
        id: "solyanka-water",
        ingredientId: "water",
        quantity: {
          type: "exact",
          amount: 3,
          unit: "l",
        },
      },

      {
        id: "solyanka-dill",
        ingredientId: "dill",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
      {
        id: "solyanka-parsley",
        ingredientId: "parsley",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
      {
        id: "solyanka-salt",
        ingredientId: "salt",
        quantity: {
          type: "qualitative",
          value: "to-taste",
        },
      },
      {
        id: "solyanka-sour-cream",
        ingredientId: "sour-cream",
        quantity: {
          type: "qualitative",
          value: "for-serving",
        },
      },
    ],

    steps: [      
      {
        id: "solyanka-step-1",
        description:
          "В кастрюлю объёмом 5 литров налить 3 литра воды " +
          "и поставить на огонь. Довести до кипения, " +
          "затем выключить нагрев. Вода понадобится " +
          "для дальнейшего приготовления супа.",
        ingredients: [
          { recipeIngredientId: "solyanka-water" },
        ],
      },

      {
        id: "solyanka-step-2",
        description:
          "Подготовить ингредиенты. Охотничьи и сливочные " +
          "сосиски нарезать кружочками, ветчину — мелкими " +
          "кубиками. Картофель, морковь и лук очистить. " +
          "Картофель нарезать кубиками размером около 1 см, " +
          "морковь — соломкой, а лук — мелкими кубиками.",
      },
      {
        id: "solyanka-step-3",
        description:
          "Разогреть глубокую сковороду диаметром около 28 см. " +
          "Выложить охотничьи сосиски и обжаривать без " +
          "добавления масла, периодически перемешивая. " +
          "Сосиски выделят собственный жир. После обжаривания " +
          "переложить их шумовкой в отдельную миску, " +
          "оставив жир на сковороде.",
        ingredients: [
          { recipeIngredientId: "solyanka-hunting-sausages" },
        ],
      },
      {
        id: "solyanka-step-4",
        description:
          "В той же сковороде на оставшемся жире обжарить " +
          "сливочные сосиски, периодически перемешивая. " +
          "Переложить их шумовкой в миску к охотничьим " +
          "сосискам, оставив жир на сковороде.",
        ingredients: [
          { recipeIngredientId: "solyanka-creamy-sausages" },
        ],
      },
      {
        id: "solyanka-step-5",
        description:
          "Аналогичным образом обжарить нарезанную ветчину. " +
          "После обжаривания переложить её в общую миску " +
          "с сосисками, сохранив оставшийся жир в сковороде.",
        ingredients: [
          { recipeIngredientId: "solyanka-ham" },
        ],
      },
      {
        id: "solyanka-step-6",
        description:
          "В той же сковороде слегка обжарить мелко " +
          "нарезанный лук. Добавить морковь, нарезанную " +
          "соломкой, перемешать и продолжить обжаривание.",
        ingredients: [
          { recipeIngredientId: "solyanka-onion" },
          { recipeIngredientId: "solyanka-carrot" },
        ],
      },
      {
        id: "solyanka-step-7",
        description:
          "Снова включить нагрев под кастрюлей с водой " +
          "и довести её до кипения. Добавить нарезанный " +
          "картофель. Дождаться повторного закипания " +
          "и посолить по вкусу. Оставить картофель вариться.",
        ingredients: [
          { recipeIngredientId: "solyanka-potato" },
          { recipeIngredientId: "solyanka-salt" },
        ],
      },
      {
        id: "solyanka-step-8",
        description:
          "Пока варится картофель, добавить в сковороду " +
          "к луку и моркови томатную пасту и перемешать. " +
          "Вернуть в сковороду все ранее обжаренные " +
          "сосиски и ветчину из миски. Тщательно " +
          "перемешать и прогреть на слабом огне.",
        ingredients: [
          { recipeIngredientId: "solyanka-tomato-paste" },
        ],
      },
      {
        id: "solyanka-step-9",
        description:
          "Через 10 минут после повторного закипания воды " +
          "с картофелем проверить его готовность. " +
          "Если картофель ещё твёрдый, продолжить варку. " +
          "Когда он будет готов, переложить всё содержимое " +
          "сковороды в кастрюлю и перемешать.",
      },
      {
        id: "solyanka-step-10",
        description:
          "Мелко нарезать свежий укроп и петрушку. " +
          "Добавить зелень в кастрюлю с супом. " +
          "Довести солянку до кипения, выключить нагрев " +
          "и дать настояться под крышкой 10 минут.",
        ingredients: [
          { recipeIngredientId: "solyanka-dill" },
          { recipeIngredientId: "solyanka-parsley" },
        ],
      },
      {
        id: "solyanka-step-11",
        description:
          "Разлить горячую солянку по тарелкам. " +
          "По желанию добавить в каждую порцию " +
          "по одной столовой ложке сметаны.",
        ingredients: [
          { recipeIngredientId: "solyanka-sour-cream" },
        ],
      },
    ],
  },


  {
    id: "cottage-cheese-casserole",
    title: "Нежная творожная запеканка без муки и манки",
    summary:
      "Воздушная творожная запеканка со сметаной, ванилином " +
      "и нежной однородной текстурой. Готовится без муки и манки.",
    image: "/images/recipes/cottage-cheese-casserole.jpg",
    imageAlt: "Творожная запеканка без муки и манки",
    cuisine: "Домашняя",
    baseServings: 8,
    cookingTimeMinutes: 60,

    ingredients: [
      {
        id: "casserole-cottage-cheese",
        ingredientId: "cottage-cheese",
        quantity: {
          type: "exact",
          amount: 720,
          unit: "g",
        },
      },
      {
        id: "casserole-sugar",
        ingredientId: "sugar",
        quantity: {
          type: "exact",
          amount: 150,
          unit: "g",
        },
      },
      {
        id: "casserole-eggs",
        ingredientId: "egg",
        quantity: {
          type: "exact",
          amount: 3,
          unit: "piece",
        },
      },
      {
        id: "casserole-starch",
        ingredientId: "starch",
        quantity: {
          type: "exact",
          amount: 4,
          unit: "tbsp",
        },
      },
      {
        id: "casserole-sour-cream",
        ingredientId: "sour-cream",
        quantity: {
          type: "exact",
          amount: 150,
          unit: "g",
        },
      },
      {
        id: "casserole-vanillin",
        ingredientId: "vanillin",
        quantity: {
          type: "exact",
          amount: 2,
          unit: "g",
        },
      },
      {
        id: "casserole-salt",
        ingredientId: "salt",
        quantity: {
          type: "exact",
          amount: 1,
          unit: "pinch",
        },
      },
      {
        id: "casserole-lemon-zest",
        ingredientId: "lemon-zest",
        quantity: {
          type: "qualitative",
          value: "as-needed",
        },
      },
      {
        id: "casserole-orange-zest",
        ingredientId: "orange-zest",
        quantity: {
          type: "qualitative",
          value: "as-needed",
        },
      },
    ],

    steps: [
      {
        id: "casserole-step-1",
        description:
          "В глубокую миску выложить творог, сахар, яйца, " +
          "сметану, крахмал, ванилин и щепотку соли. " +
          "Творог и сметану можно использовать любой жирности.",
        ingredients: [
          { recipeIngredientId: "casserole-cottage-cheese" },
          { recipeIngredientId: "casserole-sugar" },
          { recipeIngredientId: "casserole-eggs" },
          { recipeIngredientId: "casserole-sour-cream" },
          { recipeIngredientId: "casserole-starch" },
          { recipeIngredientId: "casserole-vanillin" },
          { recipeIngredientId: "casserole-salt" },
        ],
      },
      {
        id: "casserole-step-2",
        description:
          "Пробить ингредиенты блендером до полностью " +
          "однородной, гладкой и блестящей массы без комочков.",
      },
      {
        id: "casserole-step-3",
        description:
          "По желанию добавить немного цедры лимона " +
          "или апельсина на выбор. Аккуратно перемешать " +
          "творожную массу до равномерного распределения цедры. " +
          "Этот этап можно пропустить.",
        ingredients: [
          { recipeIngredientId: "casserole-lemon-zest" },
          { recipeIngredientId: "casserole-orange-zest" },
        ],
      },
      {
        id: "casserole-step-4",
        description:
          "Переложить творожную массу в форму для выпечки. " +
          "Можно использовать кондитерское кольцо с " +
          "пергаментом на дне или обычную форму. " +
          "Равномерно распределить массу и разровнять поверхность.",
      },
      {
        id: "casserole-step-5",
        description:
          "Выпекать в духовке при температуре 180 °C " +
          "в течение 60 минут.",
      },
      {
        id: "casserole-step-6",
        description:
          "Достать готовую запеканку из духовки и дать ей " +
          "полностью остыть перед подачей.",
      },
    ],
  },

];

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}