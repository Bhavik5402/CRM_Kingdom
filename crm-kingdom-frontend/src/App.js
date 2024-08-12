import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterConfig } from "utility/auth-guards/router-config";

function App() {
    return (
        <>
            <BrowserRouter>
                <RouterConfig />
            </BrowserRouter>
        </>
    );
}

export default App;
