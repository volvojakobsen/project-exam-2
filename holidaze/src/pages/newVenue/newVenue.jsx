import styled from "styled-components";
import React, {  useState  } from "react";
import {  useNavigate  } from "react-router-dom";

const VenueForm = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 100vh;
`

const Button = styled.button`
background-color: #4CAF50; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 200px;
  cursor: pointer;
  margin: 20px;
  `;

const Title = styled.h1`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
text-align: center;
font-family: 'Space Grotesk', sans-serif;
`

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const NewVenue = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mediaRaw, setMediaRaw] = useState("");
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
        <Title>Add new venue</Title>
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
              <Button type="submit">Submit</Button>
        </Form>
        </VenueForm>
        </>
    );
}