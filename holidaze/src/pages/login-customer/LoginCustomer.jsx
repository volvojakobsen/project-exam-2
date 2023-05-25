import React, {  useState  } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
justify-content: center;
min-height: 100vh;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
justify-content: center;
min-height: 40vh;
`;

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
                window.location.reload(true);
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
        <Container>
        <div>
          <Form action="" className="loginCustomer" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <label htmlFor="Username">Email:</label>
              <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="Password">Password:</label>
              <input type="text" name="Password" onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Login</button>
          </Form>
        </div>
        <div>
            <h2>Register new account</h2>
            <Link  to="/Register"> <p className="link">Register new account here.</p> </Link>
        </div>
        </Container>
        
        
        </>
    );
}