import React  from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



const Venue = styled.div`
    width: 200px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    border: 3px solid black;
    justify-content: center;
    align-items: center;
`;

const VenueImage = styled.img`
    max-height: 200px;
    max-width: 200px;
    object-fit: cover;
    margin-top: 20px;
`

const Button = styled.button`
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

  const ButtonRed = styled.button`
  background-color: #f44336; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  width: 200px;
  cursor: pointer;
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

const Title = styled.h1`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
text-align: center;
font-family: 'Space Grotesk', sans-serif;
`


export const Venues = (props) => {
    const {media, name, price, id} = props.data;
    const navigate = useNavigate();
 
    
   
    return (<Venue>
        <VenueImage src={media} alt="venue image" srcSet="" />
        <Title>{name}</Title>
        <h3>{price}</h3>
        <Button className="view-btn" onClick={() => navigate(`/updateVenue/${id}`)}>Edit Venue</Button>
        <ButtonRed className="view-btn" onClick={() => navigate(`/deleteVenue/${id}`)}>Delete Venue</ButtonRed>
        <ButtonBlue className="view-btn" onClick={() => navigate(`/VenueBookings/${id}`)}>view Bookings</ButtonBlue>
    </Venue>);
}