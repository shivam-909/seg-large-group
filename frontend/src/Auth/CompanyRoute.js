import { Outlet, Navigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import {GetData} from "./GetUser";

export default function CompanyRoute() {
    const [isCompany, setIsCompany] = useState(true);

    useEffect(() => {
        GetData().then(res => {setIsCompany(res.companyID !== undefined)})
    }, [isCompany]);

    return (isCompany ? <Outlet/> : <Navigate to="/"/>);
}