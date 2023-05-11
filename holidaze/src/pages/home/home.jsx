import React, { useEffect, useState } from 'react';
import { Venues } from "./venues";
import "./home.css";
import styled from 'styled-components';

const Venue = styled.div`
    width: 400px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    border: 3px solid black;
    justify-content: center;
    align-items: center;
`;


const url = 'https://api.noroff.dev/api/v1/holidaze/venues';


export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setVenues(json);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, []);

  console.log(venues);
  if (isLoading) {
    return <div className='loader'></div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
    <div className='main'>
      <h1>Venues</h1>
      <div className='search-div'>
          <p>search venues: </p>
          <input className='search-input' type="text" placeholder='search' onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className='venues'>
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
      </div>
    </div>
    
    </>
    
  );
}