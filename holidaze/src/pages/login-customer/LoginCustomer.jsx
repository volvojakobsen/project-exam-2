import React, {  useState  } from "react";
import "./loginCustomer.css";
import { Link, useNavigate } from "react-router-dom";

export const LoginCustomer = () => {

    const loginURL = "https://api.noroff.dev/api/v1/holidaze/auth/login";
    const method = "post";

    const navigate = useNavigate();
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function handleSubmit(e)  {
        e.preventDefault();
        const formValues = {email, password};
        async function login() {
            try {
              const response = await fetch(loginURL, {
                  headers: {
                      "Content-Type": "application/json"
                  },
                  method,
                  body: JSON.stringify(formValues)
              });
              const json = await response.json();
              console.log(response)
              if(response.ok) {
                localStorage.setItem("name", json.name);
                localStorage.setItem("accessToken", json.accessToken);
                localStorage.setItem("avatar", json.avatar);
                localStorage.setItem("venueManager", json.venueManager);
                localStorage.setItem("email", json.email);
                console.log(json);
                navigate("/");
              }
              else {
                  alert(json.errors[0].message);
              }
            } catch (error) {
              console.log(error)
            }                }
          
              login();
          console.log(formValues);
        
    }
    
    
    return (
        <>
        <div>
          <form action="" className="loginCustomer" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <label htmlFor="Username">Email:</label>
              <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="Password">Password:</label>
              <input type="text" name="Password" onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Login</button>
          </form>
        </div>
        <div className="center">
            <h2>Register new account</h2>
            <Link  to="/Register"> <p className="link">Register new account here.</p> </Link>
        </div>
        
        </>
    );
}