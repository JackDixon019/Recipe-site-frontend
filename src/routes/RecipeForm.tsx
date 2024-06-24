import { useState } from "react";
import { TypeIngredient, TypeRecipe } from "./recipeLoader";

// type TypeRecipeStringOnly = Omit<TypeRecipe, "ingredients" | "instructions" | "time">;
const defaultIngredient: TypeIngredient = { count: 0, measurement: "", name: "Ingredient 1" };
export default function RecipeForm() {
    const [ingredients, setIngredients] = useState<TypeIngredient[]>([defaultIngredient]);
    const [newRecipe, setNewRecipe] = useState<TypeRecipe>({
        title: "",
        ingredients: [{ name: "" }],
        instructions: [""],
        description: "",
        time: 0,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name: string = e.currentTarget.name;
        const value: string = e.currentTarget.value;

        if (name === "title" || name === "description") {
            const recipe = { ...newRecipe };
            recipe[name] = value;
            setNewRecipe(recipe);
        } else if (name === "ingredients") {
            return;
        }
    }

    function addIngredient(e: React.MouseEvent) {
        e.preventDefault();
        setIngredients([...ingredients, defaultIngredient]);
        return;
    }
    return (
        <form
            action={import.meta.env.VITE_BACK_END_URL + "recipes/new"}
            method="POST"
            className="flex flex-col"
        >
            <label htmlFor="title">title</label>
            <input type="text" name="title" id="title" onChange={handleChange} required />

            <label htmlFor="ingredients">ingredients</label>
            {ingredients.map((ingredient, i) => {
                return <input key={i} type="text" name="ingredientName" id={"ingredients" + i} required />;
            })}
            <button onClick={addIngredient}>Add Ingredient</button>

            <label htmlFor="instructions">instructions</label>
            <input type="text" name="instructions" id="instructions" required />

            <label htmlFor="time">time</label>
            <input type="text" name="time" id="time" required />

            <label htmlFor="description">description</label>
            <input
                type="text"
                name="description"
                id="description"
                onChange={handleChange}
                required
            />

            <input type="submit" value="Submit" />
        </form>
    );
}
