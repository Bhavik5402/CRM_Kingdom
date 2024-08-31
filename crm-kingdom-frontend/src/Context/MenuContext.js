import React, { useState } from "react";
import tokenManager from "utility/auth-guards/token-manager";
const MenuContext = React.createContext();
const MenuDispatchContext = React.createContext();

function MenuProvider({ children }) {
    const menus = tokenManager.getMenuDetails();
    const [menuDetails, setMenuDetails] = useState(menus);
    return (
        <MenuContext.Provider value={menuDetails}>
            <MenuDispatchContext.Provider value={setMenuDetails}>
                {children}
            </MenuDispatchContext.Provider>
        </MenuContext.Provider>
    );
}

export { MenuProvider, MenuContext, MenuDispatchContext };
