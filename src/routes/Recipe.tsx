import { useLoaderData } from "react-router-dom";
import { Ingredient, loader } from "./recipeLoader";

export default function Recipe() {
    const { recipe } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
    if (recipe) {
        return (
            <div
                className={
                    "rounded-xl border-solid border-4 border-sky-300 bg-sky-950 w-8/12 m-auto align-top p-6 pl-12 text-sky-100"
                }
            >
                <h1 className="underline font-semibold mt-4 mb-8">{recipe.title}</h1>
                <p className="description text-justify leading-6">{recipe.description}</p>
                <h3 className="font-semibold text-xl mt-4 mb-2 text-orange-300 underline">
                    Ingredients
                </h3>
                <ul className="list-disc">
                    {recipe.ingredients.map((ingredient: Ingredient) => {
                        return (
                            <li
                                className="text-left text-orange-300 font-semibold leading-9"
                                key={ingredient.name}
                            >
                                {((ingredient.count &&
                                    ingredient.count.toString() + " " + ingredient.measurement) ||
                                    "") +
                                    " " +
                                    ingredient.name}
                            </li>
                        );
                    })}
                </ul>
                <h2 className="font-semibold text-xl underline mt-8 mb-2">Recipe</h2>
                <ol className="list-decimal">
                    {recipe.instructions.map((step: string, index: number) => {
                        return (
                            <li className="text-left leading-8" key={index}>
                                {step}
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}
