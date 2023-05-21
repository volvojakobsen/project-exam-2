import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { differenceInCalendarDays, getDate, isWithinInterval, toDate, format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';





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
   const [date, setDate] = useState(new Date());
   const [disabledStartDates, setDisabledStartDates] = useState([]);
   const [disabledEndDates, setDisabledEndDates] = useState([]);
   const [disabledDates, setDisabledDates] = useState([]);
   const [bookings, setBookings] = useState([]);
   const [value, setValue] = useState(new Date());
   const [selectedDay, setSelectedDay] = useState(null);

   const disabledDays = [
    new Date(2023, 5, 22),
    new Date(2023, 0, 25),
    new Date(2023, 5, 1),
    { from: new Date(2022, 4, 18), to: new Date(2022, 4, 29) }
  ];

   const onChange = date => {
    setDate(date)
   }
   //console.log(date)
  
 
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
   const dateRanges = [from, to];
   const disabledDayFrom = {
    year: from.substring(0,4),
    month: from.substring(5, 7),
    day: from.substring(8, 10),
  }
  const disabledDayTo = {
    year: to.substring(0,4),
    month: to.substring(5, 7),
    day: to.substring(8, 10),
  }
  disabledDates.push(from);
  //console.log(disabledDayFrom);
  //console.log(from);
 
};

const [selected, setSelected] = useState(new Date());

console.log(selected);

let footer = <p>Please pick a day.</p>;
if (selected) {
  footer = <p>You picked {format(selected, 'PP')}.</p>;
}

const tull = "2023-05-24";

//JSON.stringify(disabledDays);
console.log(disabledDays)

 
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
      <DayPicker mode="single"
      selected={selected}
      onSelect={setSelected}
      disabled={disabledDays}
      footer={footer} />;
      <p>{date.toDateString()}</p>
      <p>{singleVenue.description}</p>
    </div>
   </Content>
   </>
};