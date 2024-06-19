import { useLoaderData } from "react-router-dom";

const recipes = [
    {
        id: "0",
        title: "Spaghetti and Meatballs",
        ingredients: [
            {
                count: 500,
                measurement: "g",
                name: "Spaghetti",
            },
            {
                count: 500,
                measurement: "g",
                name: "Beef Mince",
            },
            {
                count: 400,
                measurement: "mL",
                name: "Crushed Tomatoes",
            },
            {
                count: 1,
                measurement: "clove",
                name: "Garlic",
            },
            {
                count: 35,
                measurement: "g",
                name: "Butter",
            },
            { name: "Basil" },
            { name: "Parmesan cheese" },
        ],
        instructions: [
            "Combine salt, pepper, and meat into meatballs",
            "Add butter, crushed tomatoes, and onion to pot",
            "Bring pot to boil, then simmer for 45 minutes",
            "While sauce is simmering, fry meatballs for 3 minutes per side until browned",
            "Boil pasta according to packet instructions",
            "Serve spaghetti in bowl, and top with meatball and tomato sauce. Garnish with basil and parmesan",
        ],
        time: 60,
        description:
            "Delicious home-cooked dish, a staple of italian-american cooking. This savoury delight combines meatballs, tomato, and pasta to create a scrumptious feast that's enjoyable by all",
    },
];

async function getRecipe(recipeId: string): Promise<Recipe | undefined> {
    return await recipes.find((recipe) => recipe.id === recipeId);
}
export async function loader({ params }: any): Promise<{ recipe: Recipe | undefined }> {
    const recipe = await getRecipe(params.recipeId);
    if (!recipe) {
        throw new Error("Recipe not found");
    }
    return { recipe };
}

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
