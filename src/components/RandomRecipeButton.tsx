import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface TypeRandomProps {
    recipeIDs: string[];
}

export default function RandomRecipeButton({ recipeIDs }: TypeRandomProps) {
    const [randomLink, setRandomLink] = useState("");
    const location = useLocation();

    const splitPathname = location.pathname.split("/");
    const inRecipe = splitPathname.length > 0 && splitPathname[1] === "recipes";

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
        <Link to={randomLink}>
            <button onClick={clickHandler} className={" min-w-fit text-nowrap " + (inRecipe ? "lg:float-end" : "")}>
                {inRecipe ? "Something else" : "I don't want to pick dinner :("}
            </button>
        </Link>
    );
}
