import React, { useEffect, useState } from 'react';
import { Venues } from "./venues";
import styled from 'styled-components';
import {  TopContainer, Loader  } from "../../components/divAndLoader"
import { ButtonBlue } from '../venueInfo/venueInfo';

const Venue = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
gap: 2rem;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
min-height: 100vh;
`

const HeaderTitle = styled.h1`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
text-align: center;
font-family: 'Space Grotesk', sans-serif;
`
const InputMargin = styled.input`
margin-bottom: 10px;
`

const Paragraph = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Prompt:wght@700&family=Space+Grotesk:wght@500&display=swap');
font-family: 'Comfortaa', cursive;
`

const Row = styled.div`
display: flex;
gap: 10px;
`;






export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);




  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues?sortOrder=asc&offset=${offset}`);
        const json = await response.json();
        setVenues(json);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    
    getData();
  }, []);

  async function getVenues() {
    try {
      //setIsError(false);
      //setIsLoading(true);
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues?sortOrder=asc&offset=${offset}`);
      const json = await response.json();
      setVenues(json);
      //setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };
  

  if (isLoading) {
    return <TopContainer><Loader></Loader></TopContainer>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
    <Container>
    <div className='main'>
      <HeaderTitle>Venues</HeaderTitle>
      <TopContainer className='search-div'>
          <Paragraph>search venues: </Paragraph>
          <InputMargin className='search-input' type="text" placeholder='search' onChange={(e) => setSearch(e.target.value)} />
          <Paragraph>view venues from index:</Paragraph>
          <InputMargin placeholder='0' type="number" onChange={(e) => setOffset(e.target.value) & getVenues()}/>
      </TopContainer>
      
      <Venue>
          {venues.filter((val) => {
              if (search === "") {
                  return val
              }
              else if (val.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                  return val
              }
          }).map((venue,i) => (
              <Venues key={i} data={venue}/>
          ))}
      </Venue>
    </div>
    </Container>
    
    
    </>
    
  );
}