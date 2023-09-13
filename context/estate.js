import React, { useState, createContext } from "react";

const EstateContext = createContext();

const EstateProvider = ({ children }) => {
    const [estates, setEstates] = useState([]);

    return (
        <EstateContext.Provider value={[estates, setEstates]}>
            {children}
        </EstateContext.Provider>
    );
};

export { EstateContext, EstateProvider };