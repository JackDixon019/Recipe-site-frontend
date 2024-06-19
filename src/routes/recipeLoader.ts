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
    _id: string;
    title: string;
    ingredients: Ingredient[];
    instructions: string[];
    time: number;
    description: string;
}

async function getRecipe(recipeId: string): Promise<TypeRecipe | undefined> {
    // return await recipes.find((recipe) => recipe.id === recipeId);
    let url = import.meta.env.VITE_BACK_END_URL + "recipes/" + recipeId;
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        let interimObject = { ...(await response.json()) }._doc;
        delete interimObject.__v;
        let recipe: TypeRecipe = interimObject;
        return recipe;
    } catch (error) {
        console.log(error);
    }
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
