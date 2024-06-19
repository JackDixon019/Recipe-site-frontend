interface Ingredient {
    count?: number;
    measurement?: string;
    name: string;
}

interface Recipe {
    id: string;
    title: string;
    ingredients: Ingredient[];
    instructions: string[];
    time: number;
    description: string;
}

interface RouteError {
    status: 404;
    statusText: "Not Found";
    internal: true;
    data: 'Error: No route matches URL "/huh"';
    error: Error;
}
