import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <>
            <a href="/recipes/0">Recipe 0</a>
            <Outlet />
        </>
    );
}

export default App;
