import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterConfig } from "utility/auth-guards/router-config";
import { SuccessErrorModalProvider } from "Context/AlertContext";
import { SuccessErrorModal } from "components/Alert/Alert";
import {Loader} from "components/common/Loader";

function App() {
    return (
        <>
            <SuccessErrorModalProvider>
                <BrowserRouter>
                    <RouterConfig />
                    <SuccessErrorModal/>
                    {/* <Loader/> */}
                </BrowserRouter>
            </SuccessErrorModalProvider>
        </>
    );
}

export default App;
