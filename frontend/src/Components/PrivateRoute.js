import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoutes() {
    let auth = {'access': localStorage.getItem("access")};

    return (
        auth.access ? <Outlet/> : <Navigate to="/login"/>
    );
}