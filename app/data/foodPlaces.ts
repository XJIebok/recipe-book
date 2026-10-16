
export type FoodPlaceCategory =
  | "store"
  | "restaurant"
  | "scenic";

export type FoodPlace = {
  id: string;
  name: string;
  description: string;
  address: string;
  category: FoodPlaceCategory;

  latitude: number;
  longitude: number;

  yandexMapsUrl?: string;
};

export type RecipePlace = {
  recipeId: string;
  placeId: string;
};

// Три реальные географические точки рядом с ГУАП.
// Связи с рецептами пока демонстрационные.
export const foodPlaces: FoodPlace[] = [
  {
    id: "magnit-pirogova",
    name: "Магнит",
    description: "Продуктовый магазин для покупки ингредиентов.",
    address: "Санкт-Петербург, переулок Пирогова, 17",
    category: "store",
    latitude: 59.92897,
    longitude: 30.301998,
    yandexMapsUrl:
      "https://yandex.com/maps/org/magnit/211876444409/",
  },
  {
    id: "teremok-truda",
    name: "Теремок",
    description:
      "Кафе русской кухни, где можно попробовать блины " +
      "со сладкими и сытными начинками.",
    address: "Санкт-Петербург, площадь Труда, 3",
    category: "restaurant",

    latitude: 59.931829,
    longitude: 30.291317,

    yandexMapsUrl:
      "https://yandex.com/maps/org/teremok/180347490121/",
  },
  {
    id: "new-holland",
    name: "Новая Голландия",
    description: "Общественное пространство для отдыха и прогулок.",
    address: "Санкт-Петербург, наб. Адмиралтейского канала, 2",
    category: "scenic",
    latitude: 59.92943,
    longitude: 30.290401,
    yandexMapsUrl:
      "https://yandex.com/maps/org/ostrov_novaya_gollandiya/199688219277/",
  },
];

// Одна точка может относиться к нескольким рецептам,
// а рецепт может иметь несколько связанных точек.
export const recipePlaces: RecipePlace[] = [
  { recipeId: "pancakes", placeId: "magnit-pirogova" },
  { recipeId: "solyanka", placeId: "magnit-pirogova" },
  {
    recipeId: "cottage-cheese-casserole",
    placeId: "magnit-pirogova",
  },
  { recipeId: "pancakes", placeId: "teremok-truda" },
  { recipeId: "pancakes", placeId: "new-holland" },
  {
    recipeId: "cottage-cheese-casserole",
    placeId: "new-holland",
  },
];

export function getPlacesForRecipe(recipeId: string): FoodPlace[] {
  const placeIds = new Set(
    recipePlaces
      .filter((relation) => relation.recipeId === recipeId)
      .map((relation) => relation.placeId),
  );

  return foodPlaces.filter((place) => placeIds.has(place.id));
}

// Переход к координатам во внешних Яндекс Картах,
// если ссылка на карточку организации не указана.
export function getYandexMapsUrl(place: FoodPlace): string {
  if (place.yandexMapsUrl) {
    return place.yandexMapsUrl;
  }

  const coordinates = `${place.latitude},${place.longitude}`;

  return `https://yandex.ru/maps/?text=${encodeURIComponent(coordinates)}`;
}
