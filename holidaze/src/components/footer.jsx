import React from "react";
import { useNavigate } from "react-router-dom";
import "./footer.css";

export const Footer = () => {
    const navigate = useNavigate();
    
    return <>
    <div className="footer">
        <div>
            <h4>Info</h4>
            <p>Phone: 999-888-555</p>
            <p>Mail: support@holidaze.gov</p>
        </div>
    </div>
    </>
};