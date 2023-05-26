import styled from "styled-components";
import React, { useState, useEffect  } from "react";
import { Booking } from "./bookings";
import { Venues } from "./venues";
import {  TopContainer, Loader  } from "../../components/divAndLoader"

const HeaderTitle = styled.h1`
text-align: center;
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
font-family: 'Prompt', sans-serif;
font-size: 50px;
`

const Title = styled.h2`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
font-family: 'Space Grotesk', sans-serif;
`;

const Paragraph = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&display=swap');
font-family: 'Comfortaa', cursive;
    
`;

const ProfileContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
width: 100%;
border-bottom: 5px solid black;
flex-wrap: wrap;
margin: 20px;
`

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
width: 100%;
border-bottom: 5px solid black;
min-height: 100vh;
`



const BookingsContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 10px;
justify-content: center;
align-items: center;
width: 100%;
border-bottom: 5px solid black;
`

const ProfileImage = styled.img`
    max-height: 400px;
    max-width: 400px;
    object-fit: cover;
    margin-top: 20px;

    @media (max-width: 400px) {
      max-width: 200px;
      max-height: 200px;
    }
`

const Form = styled.form`
margin: 20px;
`

const Flex = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

export const Profile = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [profile, setProfile] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [venues, setVenues] = useState([]);
    const [avatar, setAvatar] = useState(null);

    const name = localStorage.getItem("name");
    const method = "put";
    const formValues = {avatar};

   

  

    useEffect(() => {
      async function getData() {
        try {
          setIsError(false);
          setIsLoading(true);
          const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}?_bookings=true&_venues=true`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.getItem("accessToken")}`
            },
        });
          const json = await response.json();
          setProfile(json);
          setBookings(json.bookings)
          setVenues(json.venues)
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setIsError(true);
        }
      }

      getData();
    }, []);

async function changeAvatar(e) {
    e.preventDefault();
    try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${profile.name}/media`, {
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
            alert("your avatar was successfully changed.");
            window.location.reload();
            
        }
        else {
            alert(json.errors[0].message);
        }
      } catch (error) {
        console.log(error)
        }              
}




if (isLoading) {
  return <TopContainer><Loader></Loader></TopContainer>;
}
if (isError) {
  return <div>Error loading data</div>;
}

    
  return (
    <>
    <Container>
    <HeaderTitle>Profile</HeaderTitle>
    <ProfileContainer>
        <div><ProfileImage src={profile.avatar} alt="profile-image" /></div>
        <Flex>
            <Title>{profile.name}</Title>
            <Title>{profile.email}</Title>
            <Form action="" onSubmit={changeAvatar}>
                <Paragraph>Change Avatar</Paragraph>
                <input type="url" name="avatar" onChange={(e) => setAvatar(e.target.value)} />
                <button type="submit">Submit</button>
            </Form>
        </Flex>
    </ProfileContainer>
    <HeaderTitle>My Bookings</HeaderTitle>
    <BookingsContainer>
          {bookings.map((booking,h) => (
            <Booking key={h} data={booking}/>
          ))}
    </BookingsContainer>
    <HeaderTitle>My Venues</HeaderTitle>
    <BookingsContainer>
          {venues.map((venue,k) => (
            <Venues key={k} data={venue}/>
          ))}
    </BookingsContainer>
    </Container>
    

    </>
  )
}