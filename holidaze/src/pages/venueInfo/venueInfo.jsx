import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DayPicker } from 'react-day-picker';
import {  useNavigate } from "react-router-dom";
import {  TopContainer, Loader  } from "../../components/divAndLoader"
import 'react-day-picker/dist/style.css';

const Text = styled.h1`
text-align: center;
`;



const Content = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;

@media (max-width: 850;) {
  flex-direction: column;
}
`;

const CalendarAndInfo = styled.div`
margin: 50px;

`;

const Row = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-left: 20px;
`;

const Image = styled.img`
    max-height: 400px;
    max-width: 400px;
    object-fit: cover;
    margin-top: 20px;
`

const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
justify-content: center;
min-height: 40vh;
`;

const FormDiv = styled.form`
margin: 50px;
`;



export const VenueInfo = () => {
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

   

   

   for(let i = 0; i < bookings.length; i++) {
   const from = `${bookings[i].dateFrom}`;
   const to = `${bookings[i].dateTo}`;
   const dateFrom = {from: new Date(from.substring(0,4), from.substring(5, 7) - 1, from.substring(8, 10)), to: new Date(to.substring(0,4), to.substring(5, 7) - 1, to.substring(8, 10))};
   disabledDays.push(dateFrom);
   //console.log(disabledDayFrom);
   //console.log(from);
 
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
      console.log(response)
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
  console.log(formValues);
  
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
    <CalendarAndInfo>
      <div>
        <Text>{singleVenue.name}</Text>
        <Row>
          <h2>Price: {singleVenue.price}</h2>
          <p>max guests: {singleVenue.maxGuests}</p>
        </Row>
        <DayPicker mode="single"
        hidden={disabledDays}
        />
        <p>{singleVenue.description}</p>
      </div>
    </CalendarAndInfo>
    <FormDiv>
      <Form action="" className="loginCustomer" id="register-form" onSubmit={handleSubmit} >
          <h1>Book now</h1>
          <label htmlFor="dateFrom">Date from:</label>
          <input type="date" name="dateFrom"  required  onChange={(e) => setDateFrom(e.target.value)} />
          <label htmlFor="dateTo">dateTo:</label>
          <input type="date" required onChange={(e) => setDateTo(e.target.value)}/>
          <label htmlFor="guests">number of guests:</label>
          <input type="number" name="guests" required onChange={(e) => setGuests(parseInt(e.target.value))}/>
          <button type="submit">Register</button>
      </Form>
    </FormDiv>
   </Content>
   </>
};