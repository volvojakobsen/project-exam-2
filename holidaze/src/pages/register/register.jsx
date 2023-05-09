import React, {  useState  } from "react";
import { Link } from "react-router-dom";

export const Register = () => {

   
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [venueManager, setVenueManager] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formValues = {name, email, password, avatar, venueManager};
        console.log(formValues);
    
    }
    
    return (
        <>
        <div>
          <form action="" className="loginCustomer" id="register-form" onSubmit={handleSubmit} >
              <h1>Register</h1>
              <label htmlFor="name">Username:</label>
              <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
              <label htmlFor="email">Email:</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)}/>
              <label htmlFor="Password">Password:</label>
              <input type="text" name="Password" onChange={(e) => setPassword(e.target.value)}/>
              <label htmlFor="Password-2">Password:</label>
              <input type="text" name="Password-2"/>
              <label htmlFor="avatar">Avatar url</label>
              <input type="url" name="avatar" onChange={(e) => setAvatar(e.target.value)}/>
              <h4>Are you a venue manager?</h4>
              <label htmlFor="no">No</label>
              <input type="radio" name="venueManager" id="no" value={false} onChange={(e) => setVenueManager(e.target.value)}/>
              <label htmlFor="yes">Yes</label>
              <input type="radio" name="venueManager" id="yes" value={true} onChange={(e) => setVenueManager(e.target.value)}/>
              <button type="submit">Register</button>
          </form>
        </div>
        
        
        </>
    );
}