import { Outlet } from "react-router-dom";
import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function App() {
    const [recipeIDs, setRecipeIDs] = useState([""]);
    const [randomLink, setRandomLink] = useState("");
    useMemo(() => {
        async function getRecipes() {
            const response = await fetch(import.meta.env.VITE_BACK_END_URL + "recipes/all_ids", {
                method: "GET",
            });
            if (!response.ok) {
                throw Error("Could not get recipe IDs");
            }
            const recipeIDList = await response.json();
            console.log(recipeIDList);
            setRecipeIDs(recipeIDList);
            return;
        }
        try {
            getRecipes();
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        setRandomLink("/recipes/" + getRandomRecipeID());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeIDs]);

    function getRandomRecipeID() {
        const i = Math.ceil(Math.random() * recipeIDs.length) - 1;
        console.log(recipeIDs[i]);
        return recipeIDs[i];
    }
    function clickHandler() {
        setRandomLink("/recipes/" + getRandomRecipeID());
    }
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            {/* <a href="/recipes/0">Recipe 0</a> */}
            <Link to={randomLink}>
                <button onClick={clickHandler} className="sticky top-4 ">I don&#39;t want to pick dinner :(</button>
            </Link>
            <Outlet />
        </>
    );
}

export default App;
