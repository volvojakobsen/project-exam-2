import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Bookings } from "./bookings";
import {  TopContainer, Loader  } from "../../components/divAndLoader"





const Content = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
gap: 20px;
border-bottom: 3px solid black;
`;

const TextCenter = styled.h2`
text-align: center;
`;

const BookingContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
gap: 10px;
border-top: 3px solid black;
`;

const Row = styled.div`
display: flex;
justify-content: space-between;
gap: 20px;
align-items: center;
`;

const Image = styled.img`
    max-height: 400px;
    max-width: 400px;
    object-fit: cover;
    margin-top: 20px;
`;

const Title = styled.h1`
text-align: center;
`;






export const VenueBookings = () => {
   const id = useParams(); 
   const [singleVenue, setSingleVenue] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [bookings, setBookings] = useState([]);
   const [dateFrom, setDateFrom] = useState("");
   const [dateTo, setDateTo] = useState("");
   const [guests, setGuests] = useState("");
   const [venueId, setVenueId] = useState(id.id);

   const disabledDays = [];

   const navigate = useNavigate();

 
   useEffect(() => {
     async function getData() {
       try {
         setIsError(false);
         setIsLoading(true);
         const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id.id}?_bookings=true`);
         const json = await response.json();
         setSingleVenue(json);
         setBookings(json.bookings)
         setIsLoading(false);
       } catch (error) {
         setIsLoading(false);
         setIsError(true);
       }
     }
 
     getData();
   }, [id.id]);

  
   console.log(id.id)
   

   

   for(let i = 0; i < bookings.length; i++) {
   const from = `${bookings[i].dateFrom}`;
   const to = `${bookings[i].dateTo}`;
   const dateFrom = {from: new Date(from.substring(0,4), from.substring(5, 7) - 1, from.substring(8, 10)), to: new Date(to.substring(0,4), to.substring(5, 7) - 1, to.substring(8, 10))};
   disabledDays.push(dateFrom);
 
};

function handleSubmit(e)  {
  e.preventDefault();
  const formValues = {dateFrom, dateTo, guests, venueId};
  async function register() {
    try {
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/bookings`, {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `bearer ${localStorage.getItem("accessToken")}`
          },
          method: "post",
          body: JSON.stringify(formValues)
      });
      const json = await response.json();
      if(response.ok) {
          alert("you have successfully booked this venue, you will now be redirected to the profile page.")
          navigate("/profile");
      }
      else {
          alert(json.errors[0].message);
      }
    } catch (error) {
      console.log(error)
    }                }
  
      register();
  
}

 
if (isLoading) {
  return <TopContainer><Loader></Loader></TopContainer>;
}

 
if (isError) {
  return <div>Error loading data</div>;
}

   return <>
   <Content>
    <div>
      <Image src={singleVenue.media} alt="venue-image" srcSet="" />
    </div>
    <div>
      <Title>{singleVenue.name}</Title>
      <Row>
        <h2>Price: {singleVenue.price}</h2>
        <p>max guests: {singleVenue.maxGuests}</p>
      </Row>
    </div>
   </Content>
   <TextCenter>Bookings</TextCenter>
   <BookingContainer>
        {bookings.map((booking,u) => (
            <Bookings key={u} data={booking}/>
          ))}
    </BookingContainer>
   </>
};