import { Outlet } from "react-router-dom";
import "./App.css";
import React, { useMemo, useState } from "react";
import RandomRecipeButton from "./components/RandomRecipeButton";

function App() {
    const [recipeIDs, setRecipeIDs] = useState([""]);
    useMemo(() => {
        async function getRecipes() {
            const response = await fetch(import.meta.env.VITE_BACK_END_URL + "recipes/all_ids", {
                method: "GET",
            });
            if (!response.ok) {
                throw Error("Could not get recipe IDs");
            }
            const recipeIDList = await response.json();
            setRecipeIDs(recipeIDList);
            return;
        }
        try {
            getRecipes();
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div className="flex flex-col-reverse m-auto lg:flex-col lg:w-full lg:px-20">
            <div className="sticky bottom-4 lg:top-4 ">
                <RandomRecipeButton recipeIDs={recipeIDs} />
            </div>
            <Outlet />
        </div>
    );
}

export default App;
