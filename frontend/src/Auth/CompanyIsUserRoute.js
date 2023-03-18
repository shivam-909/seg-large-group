import {Outlet, Navigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {GetData} from "./GetUser";

export default function CompanyIsUserRoute() {
    const { id } = useParams();
    const [isCompany, setIsCompany] = useState(false);

    useEffect(() => {
        GetData().then(res => {setIsCompany(res.companyID === id)})
    }, [isCompany]);

    return (isCompany ? <Outlet/> : <Navigate to="/"/>);
}