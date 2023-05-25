import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonRedSmall, ButtonBlue } from "../components/button";
import "./navbar.css"





export const Navbar = () => {

    const navigate = useNavigate();

    function logout() {
        navigate("/")
        localStorage.clear();
        window.location.reload(true);
    }
    
    if (localStorage.getItem("accessToken")) {
        return (
            <div className="navbar">
                <h1 className="headerTitle">Holidaze</h1>
                <div className="links">
                    <Link  to="/"> <p className="link">Home</p> </Link>
                    <Link  to="/profile"> <p>{localStorage.getItem("name")}</p> </Link>
                    <Link  to="/newVenue"> <p>New Venue</p> </Link>
                    <ButtonRedSmall id="logoutButton" onClick={logout}>logout</ButtonRedSmall>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="navbar">
                <h1 className="headerTitle">Holidaze</h1>
                <div className="links">
                    <Link  to="/"> <p className="link">Home</p> </Link>
                    <Link  to="/loginCustomer" id="loginButton"> <p className="link login">Login</p> </Link>
                </div>
            </div>
        )
    }

    
}