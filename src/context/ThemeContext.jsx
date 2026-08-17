import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({children}) => {

    const [darkTheme, setDarkTheme] = useState(() => {
        const storedDarkTheme = localStorage.getItem("darkTheme");
        if(!storedDarkTheme) return false;
        return storedDarkTheme === "true"? true : false;
    });

    const toggleDarkTheme = () => {
        const newTheme = !darkTheme;
        setDarkTheme(newTheme);
        localStorage.setItem("darkTheme", newTheme);
    }

    useEffect(() => {
        if (darkTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [darkTheme]);

    return (
        <ThemeContext.Provider value={{darkTheme, toggleDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
