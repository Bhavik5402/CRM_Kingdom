import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterConfig } from "utility/auth-guards/router-config";
import { SuccessErrorModalProvider } from "Context/AlertContext";
import { SuccessErrorModal } from "components/Alert/Alert";
import Loader from "components/Common/Loader";
import { UserProvider } from "Context/UserContext";

function App() {
    return (
        <>
            <UserProvider>
                <SuccessErrorModalProvider>
                    <BrowserRouter>
                        <RouterConfig />
                        <SuccessErrorModal />
                        {/* <Loader/> */}
                    </BrowserRouter>
                </SuccessErrorModalProvider>
            </UserProvider>
        </>
    );
}

export default App;
