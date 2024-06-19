import { Params } from "react-router-dom";

export interface TypeRecipeParams {
    params: {
        recipeId: string;
    };
}
export interface Ingredient {
    count?: number;
    measurement?: string;
    name: string;
}

export interface TypeRecipe {
    id: string;
    title: string;
    ingredients: Ingredient[];
    instructions: string[];
    time: number;
    description: string;
}

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

async function getRecipe(recipeId: string): Promise<TypeRecipe | undefined> {
    return await recipes.find((recipe) => recipe.id === recipeId);
}

export async function loader({
    params,
}: {
    params: Params<"recipeId">;
}): Promise<{ recipe: TypeRecipe | undefined }> {
    if (params?.recipeId) {
        const recipe = await getRecipe(params.recipeId);
        if (!recipe) {
            throw new Error("Recipe not found");
        }
        return { recipe };
    }
    throw new Error("There was an issue finding your page");
}
