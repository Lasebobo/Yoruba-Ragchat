"use client";

import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

export type DishIngredient = {
  _key?: string;
  name?: string | null;
  quantity?: string | null;
  image?: SanityImageSource | null;
};

export type Dish = {
  _id: string;
  name?: string | null;
  category?: string | null;
  picture?: SanityImageSource | null;
  ingredients?: DishIngredient[] | null;
  timeToCook?: string | null;
  servings?: string | null;
  tags?: string[] | null;
  history?: string | null;
  regionalVariations?: string | null;
  cookingInstructions?: string[] | null;
};

/**
 * Renders a Yoruba dish: the main picture "as is" plus its ingredients as a
 * horizontally scrollable carousel. Designed to be reused both on a standalone
 * dish route and inline inside a chat message (as the UI of a RAG dish tool).
 */
export function DishCard({ dish }: { dish: Dish }) {
  const pictureUrl = dish.picture
    ? urlFor(dish.picture).width(1200).height(800).fit("crop").url()
    : null;
  const ingredients = dish.ingredients ?? [];

  return (
    <article className="mx-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <header className="flex flex-col gap-2 bg-[#8A4F1D] p-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-bold text-2xl tracking-tight">{dish.name}</h1>
          {dish.category ? (
            <span className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {dish.category}
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {dish.timeToCook ?? "1 hour"}
          </span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            {dish.servings ?? "4-6 people"}
          </span>
          {(dish.tags ?? ["Traditional"]).map((tag) => (
            <span key={tag} className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              {tag}
            </span>
          ))}
        </div>
      </header>

      {pictureUrl ? (
        // biome-ignore lint/performance/noImgElement: Sanity CDN already serves optimized images
        <img
          alt={dish.name ?? "Dish"}
          className="w-full h-64 object-cover"
          data-testid="dish-picture"
          src={pictureUrl}
        />
      ) : null}

      <div className="flex flex-col p-5 gap-5">
        {/* History Block */}
        <section className="rounded-xl border border-[#FFF9C4]/50 bg-[#FFF9C4]/30 dark:bg-[#FFF9C4]/5 dark:border-[#FFF9C4]/10 p-4">
          <h2 className="mb-2 flex items-center gap-2 font-semibold text-[#8A4F1D] dark:text-[#E8A55B]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            History & Cultural Context
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {dish.history ?? "A deeply traditional Yoruba dish, often prepared during special occasions and family gatherings to signify unity and shared heritage."}
          </p>
        </section>

        {/* Regional Variations Block */}
        <section className="rounded-xl border border-[#E0F2F1]/50 bg-[#E0F2F1]/40 dark:bg-[#E0F2F1]/5 dark:border-[#E0F2F1]/10 p-4">
          <h2 className="mb-2 flex items-center gap-2 font-semibold text-[#00695C] dark:text-[#4DB6AC]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            Regional Variations
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {dish.regionalVariations ?? "Variations exist across different Yoruba states. Some regions may add dried fish or specific local spices to enhance the flavor profile."}
          </p>
        </section>

        {/* Ingredients Block */}
        {ingredients.length > 0 ? (
          <section
            aria-label="Ingredients"
            className="rounded-xl border border-[#ECEFF1]/80 bg-[#ECEFF1]/40 dark:bg-[#ECEFF1]/5 dark:border-[#ECEFF1]/10 p-4"
          >
            <h2 className="mb-3 flex items-center gap-2 font-semibold text-[#455A64] dark:text-[#90A4AE]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21h10"></path><path d="M12 21v-4"></path><path d="M10 17h4"></path><path d="M14 17c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3H6C4.34 3 3 4.34 3 6v8c0 1.66 1.34 3 3 3h8z"></path><path d="M7 3v4"></path></svg>
              Ingredients
            </h2>
            <div
              className="flex flex-col gap-3 pb-2"
              data-testid="ingredients-list"
            >
              {ingredients.map((ingredient, index) => {
                const imageUrl = ingredient.image
                  ? urlFor(ingredient.image)
                      .width(240)
                      .height(240)
                      .fit("crop")
                      .url()
                  : null;
                return (
                  <div
                    className="flex w-full shrink-0 flex-row items-center gap-4 rounded-lg border border-border/60 bg-white/60 dark:bg-black/40 dark:border-white/10 p-3 shadow-sm"
                    data-testid="ingredient-card"
                    key={ingredient._key ?? index}
                  >
                    {imageUrl ? (
                      // biome-ignore lint/performance/noImgElement: Sanity CDN already serves optimized images
                      <img
                        alt={ingredient.name ?? "Ingredient"}
                        className="size-16 shrink-0 rounded-md object-cover"
                        data-testid="ingredient-image"
                        src={imageUrl}
                      />
                    ) : (
                      <div className="size-16 shrink-0 rounded-md bg-muted/50 flex items-center justify-center text-muted-foreground/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm leading-tight text-foreground/90">{ingredient.name}</p>
                      {ingredient.quantity ? (
                        <p className="text-muted-foreground text-xs mt-0.5">
                          {ingredient.quantity}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* Cooking Instructions Block */}
        <section className="rounded-xl border border-border bg-card p-4">
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            Cooking Instructions
          </h2>
          <ol className="flex flex-col gap-3 list-decimal pl-5 text-sm text-muted-foreground">
            {dish.cookingInstructions ? (
              dish.cookingInstructions.map((step, index) => (
                <li key={`step-${index}`}>{step}</li>
              ))
            ) : (
              <>
                <li className="pl-1 leading-relaxed">Prepare the ingredients by washing and cutting as necessary.</li>
                <li className="pl-1 leading-relaxed">Sauté the aromatics in palm oil or vegetable oil until fragrant.</li>
                <li className="pl-1 leading-relaxed">Combine the main ingredients and allow to simmer gently until fully cooked and flavors have melded.</li>
                <li className="pl-1 leading-relaxed">Serve hot, ideally with a traditional accompaniment.</li>
              </>
            )}
          </ol>
        </section>
      </div>
    </article>
  );
}
