import React from "react";
import { useNavigate } from "react-router-dom";


export const Venues = (props) => {
    const {id, name, description, price, media} = props.data;
    const navigate = useNavigate();
   
    return (<div className="venue">
        <img src={media} className="venue-img" alt="venue image" srcSet="" />
        <h2>{name}</h2>
        <h4>{price}</h4>
        <button className="view-btn" onClick={() => navigate(`/venueInfo/${id}`)}>View Item</button>
        <p>{description}</p>
    </div>);
}
