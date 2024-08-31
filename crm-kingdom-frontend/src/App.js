import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterConfig } from "utility/auth-guards/router-config";
import { SuccessErrorModalProvider } from "Context/AlertContext";
import { SuccessErrorModal } from "components/Alert/Alert";
import Loader from "components/Common/Loader";
import { UserProvider } from "Context/UserContext";
import { MenuProvider } from "Context/MenuContext";

function App() {
    return (
        <>
            <UserProvider>
                <MenuProvider>
                    <SuccessErrorModalProvider>
                        <BrowserRouter>
                            <RouterConfig />
                            <SuccessErrorModal />
                            {/* <Loader/> */}
                        </BrowserRouter>
                    </SuccessErrorModalProvider>
                </MenuProvider>
            </UserProvider>
        </>
    );
}

export default App;
