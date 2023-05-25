import React  from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { Button, ButtonRed, ButtonBlue } from "../../components/button.jsx";

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

export const Venues = (props) => {
    const {media, name, price, maxGuests, description, id} = props.data;
    const navigate = useNavigate();
 


    
    console.log(props);
    
   
    return (<Venue>
        <VenueImage src={media} alt="venue image" srcSet="" />
        <h1>{name}</h1>
        <h3>{price}</h3>
        <Button className="view-btn" onClick={() => navigate(`/updateVenue/${id}`)}>Edit Venue</Button>
        <ButtonRed className="view-btn" onClick={() => navigate(`/deleteVenue/${id}`)}>Delete Venue</ButtonRed>
        <ButtonBlue className="view-btn" onClick={() => navigate(`/VenueBookings/${id}`)}>view Bookings</ButtonBlue>
    </Venue>);
}