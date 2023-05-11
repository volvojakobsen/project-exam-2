import styled from "styled-components";
import React, {  useState  } from "react";
import {  useNavigate  } from "react-router-dom";

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

export const EditVenue = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mediaRaw, setMediaRaw] = useState([]);
    const [priceRaw, setPriceRaw] = useState(Number);
    const [maxGuestsRaw, setMaxGuestsRaw] = useState(Number);

    const media = [mediaRaw];
    const price = parseInt(priceRaw);
    const maxGuests = parseInt(maxGuestsRaw);

    const createVenueURL = "https://api.noroff.dev/api/v1/holidaze/venues";
    const method = "post";
    
    const navigate = useNavigate();

    function handleSubmit(e)  {
        e.preventDefault();
        const formValues = {name, description, media, price, maxGuests};

        async function addVenue() {
            try {
              const response = await fetch(createVenueURL, {
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
                  alert("venue was successfully created, you will now be redirected to the home page.")
                  navigate("/");
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
        <h1>Add new venue</h1>
        <Form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">name:</label>
              <input type="text" name="name" required onChange={(e) => setName(e.target.value)}/>
              <label htmlFor="description">description:</label>
              <textarea required name="description" onChange={(e) => setDescription(e.target.value.toString())}/>
              <label htmlFor="media">media:</label>
              <input type="url" name="media" onChange={(e) => setMediaRaw(e.target.value)}/>
              <label htmlFor="price">price:</label>
              <input type="number" name="price" required  onChange={(e) => setPriceRaw(e.target.value)}/>
              <label htmlFor="maxGuests">maxGuests:</label>
              <input type="number" name="maxGuests" required onChange={(e) => setMaxGuestsRaw(e.target.value)} />
              <button type="submit">Submit</button>
        </Form>
        </VenueForm>
        </>
    );
}