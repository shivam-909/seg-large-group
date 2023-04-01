import { Outlet, Navigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";

export default function PrivateRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}api/echo`, {}, {headers: {Authorization: `Bearer ${token}`}})
                .then(() => setIsLoggedIn(true))
                .catch(() => {
                    const formData = new FormData();
                    formData.append("refresh_token", localStorage.getItem("refresh"));
                    axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/refresh`, formData)
                        .then(response => {
                            localStorage.setItem("access", response.data.access);
                            localStorage.setItem("refresh", response.data.refresh);
                        })
                        .catch(() => setIsLoggedIn(false));
                });
        }
        else{
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);

    return (isLoggedIn ? <Outlet/> : <Navigate to="/login"/>);
}