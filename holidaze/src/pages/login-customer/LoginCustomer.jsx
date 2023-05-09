import React from "react";
import "./loginCustomer.css";
import { Link } from "react-router-dom";

export const LoginCustomer = () => {
    
    return (
        <>
        <div>
          <form action="" className="loginCustomer">
              <h1>Login</h1>
              <label htmlFor="Username">Username:</label>
              <input type="text" name="Username" />
              <label htmlFor="Password">Password:</label>
              <input type="text" name="Password"/>
              <button>Login</button>
          </form>
        </div>
        <div className="center">
            <h2>Are you a venue manager?</h2>
            <p>Login as venue manager here</p>
        </div>
        <div className="center">
            <h2>Register new account</h2>
            <Link  to="/Register"> <p className="link">Register as customer</p> </Link>
            <Link  to="/RegisterManager"> <p className="link">Register as Venue-Manager</p> </Link>
        </div>
        
        </>
    );
}