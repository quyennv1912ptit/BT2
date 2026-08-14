import React, {Children, createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("userData");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedToken = localStorage.getItem("accessToken");
        return !!storedToken; 
    });

    const Login = (userData, token) => {
        setUser(userData);
        setIsLoggedIn(true);

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("accessToken", token);
    };

    const Logout = () => {
        setUser(null);
        setIsLoggedIn(false);

        localStorage.removeItem("userData");
        localStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider value={{user, isLoggedIn, Login, Logout}}>
            {children}
        </AuthContext.Provider>
    );
};