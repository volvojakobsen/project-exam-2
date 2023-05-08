import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";



export const VenueInfo = () => {
   const id = useParams(); 
   const [singleVenue, setSingleVenue] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
  
 
   useEffect(() => {
     async function getData() {
       try {
         setIsError(false);
         setIsLoading(true);
         const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id.id}`);
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

   
   
 
   if (isLoading) {
     return <div className="loader"></div>;
   }
 
   if (isError) {
     return <div>Error loading data</div>;
   }

   return <>
    <div className="container">
        <div className="singleItem">
            <img src={singleVenue.media} className="singleProductImage" alt="" srcSet="" />
            <div className="details">
               <h2>{singleVenue.name}</h2>
              <div className="pricing">
                <h3>Price: ${singleVenue.price}</h3>
              </div>
              <h1>Rating: {singleVenue.rating} of 5</h1>
              <div className="description">
              <p>{singleVenue.description}</p>
              </div>
              <div>
              <h4>Reviews</h4>
              {singleVenue.reviews && singleVenue.reviews.map(post =>{
                return (
                  <div className="singleReview" key={post.id}>
                    <div className="name"><div>By: {post.username}</div>Rated it: {post.rating} of 5.</div>
                    <div className="comment">{post.description}</div>
                  </div>
                );

              })};
              </div>
              
            </div>
        </div>
    </div>
    </>
};