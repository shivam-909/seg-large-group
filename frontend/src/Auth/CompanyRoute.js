import { Outlet, Navigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import {GetData} from "./GetUser";
import RefreshToken from "./RefreshToken";

export default function CompanyRoute() {
    const [isCompany, setIsCompany] = useState(true);

    useEffect(() => {
        async function checkCompany() {
            await RefreshToken();
            await GetData().then(res => {setIsCompany(res.companyID !== undefined)})
        }
        checkCompany();
    }, [isCompany]);

    return (isCompany ? <Outlet/> : <Navigate role = 'navigation' to="/"/>);
}
