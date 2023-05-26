import React  from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";

const Venue = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    border: 3px solid black;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

const Title = styled.h2`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
font-family: 'Space Grotesk', sans-serif;
`;

const Guests = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&display=swap');
font-family: 'Comfortaa', cursive;
    
`;

const Dates = styled.h4`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
font-family: 'Space Grotesk', sans-serif;
`;



export const Bookings = (props) => {
    const {created, guests, dateFrom, dateTo} = props.data;
    const createdOn = new Date(created);
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    const formattedDateFrom = format(from, "MMMM do, yyyy");
    const formattedDateTo = format(to, "MMMM do, yyyy");
    const formattedCreatedOn = format(createdOn, "MMMM do, yyyy");
    const navigate = useNavigate();
 


    
    console.log(props);
    
   
    return (<Venue>
        <Title>booked on: {formattedCreatedOn}</Title>
        <Guests>Guests: {guests}</Guests>
        <Dates>Booked from: {formattedDateFrom}</Dates>
        <Dates>Booked to: {formattedDateTo}</Dates>
        
        
    </Venue>);
}