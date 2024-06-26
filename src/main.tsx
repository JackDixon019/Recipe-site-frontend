import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import Recipe from "./routes/Recipe.tsx";
import { loader as recipeLoader } from "./routes/recipeLoader.ts";
import RecipeForm from "./routes/RecipeForm.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "recipes/:recipeId",
                element: <Recipe />,
                loader: recipeLoader,
            },
        ],
    },
    {
        path:"/recipes/new",
        element: <RecipeForm />,
        errorElement: <ErrorPage />,
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
