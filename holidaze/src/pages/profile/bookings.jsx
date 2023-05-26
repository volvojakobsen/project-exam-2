import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

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

const Title = styled.h1`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
text-align: center;
font-family: 'Space Grotesk', sans-serif;
`

const Paragraph = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
font-family: 'Comfortaa', cursive;
`


export const Booking = (props) => {
    const {created, venue, dateFrom, dateTo} = props.data;
    const createdOn = new Date(created);
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    const formattedDateFrom = format(from, "MMMM do, yyyy");
    const formattedDateTo = format(to, "MMMM do, yyyy");
    const formattedCreatedOn = format(createdOn, "MMMM do, yyyy");


   
   
    return (<Venue>
        <VenueImage src={venue.media} alt="venue image" srcSet="" />
        <Title>{venue.name}</Title>
        <Paragraph>booking created:</Paragraph>
        <Title>{formattedCreatedOn}</Title>
        <Paragraph>booked from:</Paragraph>
        <Title>{formattedDateFrom}</Title>
        <Paragraph>booked to:</Paragraph>
        <Title>{formattedDateTo}</Title>
    </Venue>);
}