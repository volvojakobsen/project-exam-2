import React  from "react";
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
        <h1>booked on: {formattedCreatedOn}</h1>
        <h3>Guests: {guests}</h3>
        <h3>Booked from: {formattedDateFrom}</h3>
        <h3>Booked to: {formattedDateTo}</h3>
        
        
    </Venue>);
}