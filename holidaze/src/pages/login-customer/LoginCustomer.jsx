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

export const Button = styled.button`
background-color: #4CAF50; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 200px;
  cursor: pointer;
  margin: 20px;
  `;

const Paragraph = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
font-family: 'Comfortaa', cursive;
`

const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
justify-content: center;
min-height: 40vh;
`;

const Title = styled.h1`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
text-align: center;
font-family: 'Space Grotesk', sans-serif;
`


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
        
    }
    
    
    return (
        <>
        <Container>
        <div>
          <Form action="" className="loginCustomer" onSubmit={handleSubmit}>
              <Title>Login</Title>
              <label htmlFor="Username">Email:</label>
              <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="Password">Password:</label>
              <input type="text" name="Password" onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit">Login</Button>
          </Form>
        </div>
        <div>
            <Title>Register new account</Title>
            <Link  to="/Register"> <Paragraph className="link">Register new account here.</Paragraph> </Link>
        </div>
        </Container>
        
        
        </>
    );
}