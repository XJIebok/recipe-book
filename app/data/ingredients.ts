// Описывает фиксированный справочник ингредиентов приложения.

export type Ingredient = {
  id: string;
  name: string;
};

export const ingredients: Ingredient[] = [
  { id: "spaghetti", name: "Спагетти" },
  { id: "egg", name: "Яйцо" },
  { id: "pecorino", name: "Сыр пекорино" },
  { id: "guanciale", name: "Гуанчале" },
  { id: "black-pepper", name: "Чёрный перец" },
  { id: "salt", name: "Соль" },

  { id: "flour", name: "Пшеничная мука" },
  { id: "milk", name: "Молоко" },
  { id: "sugar", name: "Сахар" },
  { id: "vegetable-oil", name: "Растительное масло" },

  { id: "chicken-breast", name: "Куриная грудка" },
  { id: "potato", name: "Картофель" },
  { id: "carrot", name: "Морковь" },
  { id: "onion", name: "Репчатый лук" },
  { id: "water", name: "Вода" },

  { id: "cottage-cheese", name: "Творог" },
  { id: "starch", name: "Крахмал" },
  { id: "sour-cream", name: "Сметана" },
  { id: "vanillin", name: "Ванилин" },
  { id: "lemon-zest", name: "Цедра лимона" },
  { id: "orange-zest", name: "Цедра апельсина" },

  { id: "hunting-sausages", name: "Охотничьи сосиски" },
  { id: "creamy-sausages", name: "Сливочные сосиски" },
  { id: "ham", name: "Ветчина" },
  { id: "tomato-paste", name: "Томатная паста" },
  { id: "dill", name: "Укроп" },
  { id: "parsley", name: "Петрушка" },

];

export function getIngredient(id: string): Ingredient | undefined {
  return ingredients.find((ingredient) => ingredient.id === id);
}