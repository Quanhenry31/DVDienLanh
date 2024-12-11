import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [userInformation, setUser] = useState('');

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
            .get('http://localhost:9000/api/users/currentUser')
            .then((res) => {
                if (res.status === 200 && res.data.Error) {
                    setAuth(false);
                } else {
                    setAuth(true);
                    setUser(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return <AuthContext.Provider value={{ auth, userInformation }}>{children}</AuthContext.Provider>;
};
