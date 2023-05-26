import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonRedSmall, ButtonBlue } from "../components/button";

const Title = styled.h1`
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@700&display=swap');
margin-left: 10px;
font-family: 'Prompt', sans-serif;
font-size: 50px;
`;

const NavbarContainer = styled.nav`
width: 100%;
background-color: rgb(19,19,19);
display: flex;
justify-content: space-between;
align-items: center;
color: white;

@media (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: center;
}

`;

const Links = styled.div`
margin-right: 50px;
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;

@media (max-width: 565px) {
    border: 3px solid white;
}
`;

const Text = styled.p`
text-decoration: none;
color: white;
font-size: 25px;
margin-left: 20px;
@media (max-width: 565px) {
    text-decoration: underline;
}
`;

export const Navbar = () => {

    const navigate = useNavigate();

    function logout() {
        navigate("/")
        localStorage.clear();
        window.location.reload(true);
    }
    
    if (localStorage.getItem("accessToken")) {
        return (
            <NavbarContainer className="navbar">
                <Title>Holidaze</Title>
                <Links>
                    <Link  to="/"> <Text>Home</Text> </Link>
                    <Link  to="/profile"> <Text>{localStorage.getItem("name")}</Text> </Link>
                    <Link  to="/newVenue"> <Text>New Venue</Text> </Link>
                    <Link id="logoutButton" onClick={logout}><Text>Logout</Text></Link>
                </Links>
            </NavbarContainer>
        )
    }
    else {
        return (
            <NavbarContainer>
                <Title>Holidaze</Title>
                <Links>
                    <Link  to="/"> <Text>Home</Text> </Link>
                    <Link  to="/loginCustomer" id="loginButton"> <Text>Login</Text> </Link>
                </Links>
            </NavbarContainer>
        )
    }

    
}