import { useLoaderData } from "react-router-dom";
import { TypeIngredient, loader } from "./recipeLoader";

export default function Recipe() {
    const { recipe } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
    console.log("recipe refresh");
    if (recipe) {
        return (
            <div
                className={
                    "rounded-xl border-solid border-4 border-sky-300 bg-sky-950 mx-auto my-8 p-6 px-8 text-sky-100 w-fit lg:max-w-3xl lg:w-[75%] lg:-mt-2"
                }
            >
                <h1 className="underline font-semibold mt-4 mb-8">{recipe.title}</h1>
                <p className="description text-justify leading-6">{recipe.description}</p>
                <h3 className="font-semibold text-xl mt-4 mb-2 text-orange-300 underline">
                    Ingredients
                </h3>
                <ul className="list-disc ml-4">
                    {recipe.ingredients.map((ingredient: TypeIngredient) => {
                        return (
                            <li
                                className="text-left text-orange-300 font-semibold leading-9"
                                key={ingredient.name}
                            >
                                {((ingredient.count && ingredient.count.toString() + " ") || "") +
                                    (ingredient.measurement || "") +
                                    " " +
                                    ingredient.name}
                            </li>
                        );
                    })}
                </ul>
                <h2 className="font-semibold text-xl underline mt-8 mb-2">Recipe</h2>
                <ol className="list-decimal ml-4">
                    {recipe.instructions.map((step: string, index: number) => {
                        return (
                            <li className="text-justify leading-8" key={index}>
                                {step}
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}
