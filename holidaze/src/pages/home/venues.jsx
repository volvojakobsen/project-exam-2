import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Venue = styled.div`
    width: 400px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    border: 3px solid black;
    justify-content: center;
    align-items: center;

    @media (max-width: 423px) {
    width: 200px;
}
`;

const ButtonBlue = styled.button`
  background-color: #008CBA; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 200px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px;
  `;

const VenueImage = styled.img`
    max-height: 400px;
    max-width: 400px;
    object-fit: cover;
    margin-top: 20px;

    @media (max-width: 423px) {
    max-width: 200px;
    max-height: 200px;
}
`

const Paragraph = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
font-family: 'Comfortaa', cursive;
margin: 10px;
`

const Title = styled.h2`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
font-family: 'Space Grotesk', sans-serif;
`;

export const Venues = (props) => {
    const {id, name, description, price, media} = props.data;
    const navigate = useNavigate();
   
    return (<Venue>
        <VenueImage src={media} alt="venue image" srcSet="" />
        <Title>{name}</Title>
        <h4>{price}</h4>
        <ButtonBlue className="view-btn" onClick={() => navigate(`/venueInfo/${id}`)}>View Venue</ButtonBlue>
        <Paragraph>{description}</Paragraph>
    </Venue>);
}
