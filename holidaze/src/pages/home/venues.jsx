import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonBlue } from "../../components/button";

const Venue = styled.div`
    width: 400px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    border: 3px solid black;
    justify-content: center;
    align-items: center;
`;

const VenueImage = styled.img`
    max-height: 400px;
    max-width: 400px;
    object-fit: cover;
    margin-top: 20px;
`

export const Venues = (props) => {
    const {id, name, description, price, media} = props.data;
    const navigate = useNavigate();
   
    return (<Venue>
        <VenueImage src={media} alt="venue image" srcSet="" />
        <h2>{name}</h2>
        <h4>{price}</h4>
        <ButtonBlue className="view-btn" onClick={() => navigate(`/venueInfo/${id}`)}>View Venue</ButtonBlue>
        <p>{description}</p>
    </Venue>);
}
