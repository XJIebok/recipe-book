
"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import type { Recipe } from "../../data/recipes";
import {
  getYandexMapsUrl,
  type FoodPlace,
  type RecipePlace,
} from "../../data/foodPlaces";

import styles from "./FoodMap.module.css";

type Coordinates = [number, number];

type YandexPlacemark = {
  events: {
    add: (name: string, handler: () => void) => void;
  };

  options: {
    set: (options: {
      preset: string;
      iconColor: string;
    }) => void;
  };
};

type YandexMap = {
  geoObjects: {
    add: (placemark: YandexPlacemark) => void;
  };

  panTo: (
    center: Coordinates,
    options?: {
      duration?: number;
      flying?: boolean;
    },
  ) => void;

  destroy: () => void;
};

type YandexMapsApi = {
  ready: (
    callback: () => void,
    errorCallback?: (error: unknown) => void,
  ) => void;

  Map: new (
    container: HTMLElement,
    state: {
      center: Coordinates;
      zoom: number;
      controls: string[];
    },
  ) => YandexMap;

  Placemark: new (
    coordinates: Coordinates,
    properties: { hintContent: string },
    options: { preset: string; iconColor: string },
  ) => YandexPlacemark;
};

declare global {
  interface Window {
    ymaps?: YandexMapsApi;
  }
}

type FoodMapProps = {
  places: FoodPlace[];
  relations: RecipePlace[];
  recipes: Recipe[];
  onOpenRecipe: (
    recipe: Recipe,
    trigger: HTMLButtonElement,
  ) => void;
};

const categoryNames = {
  store: "Продуктовый магазин",
  restaurant: "Ресторан",
  scenic: "Место для отдыха",
} as const;

// Главный корпус ГУАП на Большой Морской, 67.
const GUAP_CENTER: Coordinates = [59.929561, 30.296671];

export default function FoodMap({
  places,
  relations,
  recipes,
  onOpenRecipe,
}: FoodMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Экземпляр карты.
  const mapRef = useRef<YandexMap | null>(null);

  // Словарь меток: идентификатор места -> метка Яндекса.
  const placemarkRefs = useRef<Map<string, YandexPlacemark>>(
    new Map(),
  );

  const [scriptReady, setScriptReady] = useState(false);
  const [mapStatus, setMapStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  const [selectedPlace, setSelectedPlace] =
    useState<FoodPlace | null>(places[0] ?? null);

  const apiKey =
    process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY ?? "";

  // Создаём карту только после загрузки внешнего API.
  useEffect(() => {
    if (!apiKey || !scriptReady || !containerRef.current) {
      return;
    }

    const ymaps = window.ymaps;

    if (!ymaps) {
      return;
    }

    // Сохраняем ссылку на коллекцию меток для очистки.
    const placemarks = placemarkRefs.current;

    let disposed = false;
    let map: YandexMap | null = null;

    ymaps.ready(
      () => {
        if (disposed || !containerRef.current) {
          return;
        }

        try {
          map = new ymaps.Map(containerRef.current, {
            center: GUAP_CENTER,
            zoom: 15,
            controls: ["zoomControl"],
          });

          mapRef.current = map;
            placemarkRefs.current.clear();

          places.forEach((place) => {
            const placemark = new ymaps.Placemark(
              [place.latitude, place.longitude],
              {
                hintContent: place.name,
              },
              {
                preset: "islands#circleDotIcon",
                iconColor: "#8b4a2f",
              },
            );

            // Запоминаем метку для последующего изменения её вида.
              placemarkRefs.current.set(place.id, placemark);

            // Метка выбирает место, связанное с рецептами.
            placemark.events.add("click", () => {
              setSelectedPlace(place);
            });

            map?.geoObjects.add(placemark);
          });

          setMapStatus("ready");
        } catch {
          if (!disposed) {
            setMapStatus("error");
          }
        }
      },
      () => {
        if (!disposed) {
          setMapStatus("error");
        }
      },
    );

    // Очистка карты при уходе со страницы.
    return () => {
      disposed = true;

      placemarks.clear();
      mapRef.current = null;

      map?.destroy();
    };
  }, [apiKey, scriptReady, places]);

  useEffect(() => {
    // Ждём, пока Яндекс Карты полностью инициализируются.
    if (mapStatus !== "ready" || !selectedPlace) {
      return;
    }

    const map = mapRef.current;

    if (!map) {
      return;
    }

    // Выделяем выбранную метку и возвращаем обычное
    // оформление всем остальным меткам.
    placemarkRefs.current.forEach((placemark, placeId) => {
      const isSelected = placeId === selectedPlace.id;

      placemark.options.set({
        preset: isSelected
          ? "islands#dotIcon"
          : "islands#circleDotIcon",

        iconColor: isSelected
          ? "#d35400"
          : "#8b4a2f",
      });
    });

    // Плавно перемещаем карту к выбранному месту.
    // Текущий масштаб пользователя не сбрасывается.
    void map.panTo(
      [selectedPlace.latitude, selectedPlace.longitude],
      {
        duration: 350,
        flying: false,
      },
    );
  }, [selectedPlace, mapStatus]);


  const relatedRecipeIds = new Set(
    relations
      .filter((relation) => relation.placeId === selectedPlace?.id)
      .map((relation) => relation.recipeId),
  );

  const relatedRecipes = recipes.filter((recipe) =>
    relatedRecipeIds.has(recipe.id),
  );

  return (
    <section className={styles.section} aria-labelledby="food-map-title">
      <h2 id="food-map-title">Места на карте</h2>

      <p>
        Магазины, заведения и места для отдыха, которые можно
        связать с рецептами. Демонстрационные точки расположены
        рядом с ГУАП в Санкт-Петербурге.
      </p>

      {!apiKey ? (
        <p className={styles.status} role="status">
          Не указан ключ Яндекс Карт.
          Проверьте NEXT_PUBLIC_YANDEX_MAPS_API_KEY в .env.local.
        </p>
      ) : (
        <>
          <Script
            src={`https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`}
            strategy="afterInteractive"
            onReady={() => setScriptReady(true)}
            onError={() => setMapStatus("error")}
          />

          {mapStatus === "loading" ? (
            <p className={styles.status} role="status">
              Карта загружается…
            </p>
          ) : null}

          {mapStatus === "error" ? (
            <p className={styles.status} role="alert">
              Не удалось загрузить карту.
              Можно воспользоваться ссылками на Яндекс Карты ниже.
            </p>
          ) : null}
        </>
      )}

      <div className={styles.layout}>
        <div
          ref={containerRef}
          className={styles.map}
          aria-label="Карта мест рядом с ГУАП"
        />

        <div className={styles.sidebar}>
          <h3>Выберите место</h3>

          <div className={styles.placeList}>
            {places.map((place) => (
              <button
                key={place.id}
                type="button"
                className={styles.placeButton}
                aria-pressed={selectedPlace?.id === place.id}
                onClick={() => setSelectedPlace(place)}
              >
                {place.name}
              </button>
            ))}
          </div>

          <p className={styles.selectHint}>
            Выберите место в списке или нажмите на метку на карте.
          </p>

          {selectedPlace ? (
            <div className={styles.details} aria-live="polite">
              <h3>{selectedPlace.name}</h3>

              <p className={styles.category}>
                {categoryNames[selectedPlace.category]}
              </p>

              <p>{selectedPlace.description}</p>

              <p className={styles.address}>
                {selectedPlace.address}
              </p>

              <a
                className={styles.mapLink}
                href={getYandexMapsUrl(selectedPlace)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть в Яндекс Картах ↗
              </a>

              <h4>Связанные рецепты</h4>

              {relatedRecipes.length > 0 ? (
                <ul className={styles.recipeList}>
                  {relatedRecipes.map((recipe) => (
                    <li key={recipe.id}>
                      <button
                        type="button"
                        className={styles.recipeButton}
                        onClick={(event) =>
                          onOpenRecipe(recipe, event.currentTarget)
                        }
                      >
                        {recipe.title}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Связанных рецептов пока нет.</p>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <p className={styles.note}>
        Связи с рецептами демонстрационные.
        Наличие конкретных продуктов и блюд не проверяется.
      </p>
    </section>
  );
}
