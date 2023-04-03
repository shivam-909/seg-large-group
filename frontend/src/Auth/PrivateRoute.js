import { Outlet, Navigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import RefreshToken from "./RefreshToken";

export default function PrivateRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        async function checkLoggedIn() {
            await RefreshToken();
            const token = localStorage.getItem("access");
            if (token) {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/echo`, {}, {headers: {Authorization: `Bearer ${token}`}})
                    .then(res => setIsLoggedIn(res !== undefined))
                    .catch(() => setIsLoggedIn(false));
            } else {
                setIsLoggedIn(false);
            }
        }
        checkLoggedIn();
    }, [isLoggedIn]);

    return (isLoggedIn ? <Outlet/> : <Navigate to="/login"/>);
}