import React, {useContext} from "react";
import { Link } from "react-router-dom";
import "./navbar.css"





export const Navbar = () => {


    return (
        <div className="navbar">
            <h1 className="headerTitle">Holidaze</h1>
            <div className="links">
                <Link  to="/"> <p className="link">Home</p> </Link>
            </div>
        </div>
    )
}