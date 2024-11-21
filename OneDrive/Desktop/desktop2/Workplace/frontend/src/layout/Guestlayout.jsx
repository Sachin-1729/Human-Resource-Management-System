import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useSelector  } from 'react-redux'


function Guestlayout() {
    const token = useSelector((state) => state);
    console.log(token.login.token)
    if(token.login.token !== null)
    {
        return <Navigate to="/" />;
    }
    else
    {
        return <Outlet />
    }
}

export default Guestlayout