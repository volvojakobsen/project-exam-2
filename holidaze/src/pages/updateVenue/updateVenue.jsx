import styled from "styled-components";
import React, {  useState, useEffect  } from "react";
import {  useNavigate, useParams  } from "react-router-dom";

const VenueForm = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const UpdateVenue = () => {

    const id = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mediaRaw, setMediaRaw] = useState([]);
    const [priceRaw, setPriceRaw] = useState(Number);
    const [maxGuestsRaw, setMaxGuestsRaw] = useState(Number);
    const [singleVenue, setSingleVenue] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [guests, setGuests] = useState("");
    const [venueId, setVenueId] = useState(id.id);


    const media = [mediaRaw];
    let price = parseInt(priceRaw);
    let maxGuests = parseInt(maxGuestsRaw);

    const method = "put";
    
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
   
      console.log(id)

    function handleSubmit(e)  {
        e.preventDefault();
        const formValues = {name, description, media, price, maxGuests};

        async function addVenue() {
            try {
              const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id.id}`, {
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `bearer ${localStorage.getItem("accessToken")}`
                  },
                  method,
                  body: JSON.stringify(formValues)
              });
              const json = await response.json();
              console.log(response)
              if(response.ok) {
                  alert("venue was successfully created, you will now be redirected to the profile page.")
                  navigate("/profile");
              }
              else {
                  alert(json.errors[0].message);
              }
            } catch (error) {
              console.log(error)
            }                }
          
              addVenue();
        
        
    }

    return (
        <>
        <VenueForm>
        <h1>Update venue</h1>
        <Form action="" id="form" onSubmit={handleSubmit}>
        <label htmlFor="name">name:</label>
              <input type="text" name="name" required placeholder={singleVenue.name} onChange={(e) => setName(e.target.value)}/>
              <label htmlFor="description">description:</label>
              <textarea required name="description" placeholder={singleVenue.description} onChange={(e) => setDescription(e.target.value.toString())}/>
              <label htmlFor="media">media:</label>
              <input type="url" name="media" placeholder={singleVenue.media} onChange={(e) => setMediaRaw(e.target.value)}/>
              <label htmlFor="price">price:</label>
              <input type="number" name="price" required placeholder={singleVenue.price}  onChange={(e) => setPriceRaw(e.target.value)}/>
              <label htmlFor="maxGuests">maxGuests:</label>
              <input type="number" name="maxGuests" required placeholder={singleVenue.maxGuests} onChange={(e) => setMaxGuestsRaw(e.target.value)} />
              <button type="submit">Submit</button>
        </Form>
        </VenueForm>
        </>
    );
}