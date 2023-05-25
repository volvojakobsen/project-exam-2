import styled from "styled-components";
import React, {  useState, useEffect  } from "react";
import {  useNavigate, useParams, Link  } from "react-router-dom";
import {  TopContainer, Loader  } from "../../components/divAndLoader"

const VenueForm = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 100vh;
`

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`



export const DeleteVenue = () => {

    const id = useParams();
    const [singleVenue, setSingleVenue] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    

    const method = "delete";
    
    const navigate = useNavigate();

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
   
      console.log(id)

    function handleSubmit(e)  {
        e.preventDefault();

        async function addVenue() {
            try {
              const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id.id}`, {
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `bearer ${localStorage.getItem("accessToken")}`
                  },
                  method
                  
              });
              alert("venue was successfully deleted, you will now be redirected to the profile page.")
              navigate("/profile");
            } catch (error) {
              console.log(error)
            }               
        };
          
              addVenue();
        
        
    }

    if (isLoading) {
      return <TopContainer><Loader></Loader></TopContainer>;
    }
    
     
    if (isError) {
     return <div>Error loading data</div>;
    }

    return (
        <>
        <VenueForm>
        <h1>Delete venue</h1>
        <h3>do you really want to delete {singleVenue.name}?</h3>
        <button onClick={handleSubmit}>Delete</button>
        <Link  to="/profile"> <p>Back</p> </Link>
        </VenueForm>
        </>
    );
}