import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const Row = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;



export const VenueInfo = () => {
   const id = useParams(); 
   const [singleVenue, setSingleVenue] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
  
 
   useEffect(() => {
     async function getData() {
       try {
         setIsError(false);
         setIsLoading(true);
         const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id.id}?_bookings=true`);
         const json = await response.json();
         setSingleVenue(json);
         setIsLoading(false);
       } catch (error) {
         setIsLoading(false);
         setIsError(true);
       }
     }
 
     getData();
   }, [id.id]);

   
   
 
   if (isLoading) {
     return <div className="loader"></div>;
   }
 
   if (isError) {
     return <div>Error loading data</div>;
   }

   return <>
   <Content>
    <div>
      <img src={singleVenue.media} alt="venue-image" srcSet="" />
    </div>
    <div>
      <h1>{singleVenue.name}</h1>
      <Row>
        <h2>Price: {singleVenue.price}</h2>
        <p>max guests: {singleVenue.maxGuests}</p>
      </Row>
      <p>{singleVenue.description}</p>
    </div>
   </Content>
   </>
};