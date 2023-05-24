import React from "react";
import { useNavigate } from "react-router-dom";
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

export const Booking = (props) => {
    const {created, venue, dateFrom, dateTo} = props.data;
    const navigate = useNavigate();
    const createdOn = new Date(created);
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    const formattedDateFrom = format(from, "MMMM do, yyyy");
    const formattedDateTo = format(to, "MMMM do, yyyy");
    const formattedCreatedOn = format(createdOn, "MMMM do, yyyy");


    console.log(to);
   
    return (<Venue>
        <VenueImage src={venue.media} alt="venue image" srcSet="" />
        <h2>{venue.name}</h2>
        <p>booking created:</p>
        <h2>{formattedCreatedOn}</h2>
        <p>booked from:</p>
        <h3>{formattedDateFrom}</h3>
        <p>booked to:</p>
        <h3>{formattedDateTo}</h3>
    </Venue>);
}