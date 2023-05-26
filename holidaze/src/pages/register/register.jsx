import React, {  useState  } from "react";
import {  useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/button";

const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
justify-content: center;
min-height: 40vh;
margin: 20px;
`;

const Flex = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

export const Register = () => {

    const registerURL = "https://api.noroff.dev/api/v1/holidaze/auth/register";
    const method = "post";

    const navigate = useNavigate();
   
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [venueManager, setVenueManager] = useState(false);
    
    function handleSubmit(e)  {
        e.preventDefault();
        const formValues = {name, email, password, avatar, venueManager};
        if(password === rePassword) {
            async function register() {
              try {
                const response = await fetch(registerURL, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method,
                    body: JSON.stringify(formValues)
                });
                const json = await response.json();
                console.log(response)
                if(response.ok) {
                    alert("your account was registered, you will now be redirected to the login page.")
                    navigate("/loginCustomer");
                }
                else {
                    alert(json.errors[0].message);
                }
              } catch (error) {
                console.log(error)
              }                }
            
                register();
            console.log(formValues);
            
        }
        else {
            alert("the passwords do not match, please fill in matching passwords")
        }
        
    }
    
    return (
        <>
        <Flex>
          <Form action="" id="register-form" onSubmit={handleSubmit} >
              <h1>Register</h1>
              <label htmlFor="name">Username:</label>
              <input type="text" name="name" id="name" pattern="^[\w]+$" required title="User name must only contain lower case and upper case letters, numbers and underscore (_). Example: My_user123." onChange={(e) => setName(e.target.value)} />
              <label htmlFor="email">Email:</label>
              <input type="email" pattern="^[\w\-.]+@stud.noroff.no$" required title="Only @stud.noroff.no email addresses are allowed to register." onChange={(e) => setEmail(e.target.value)}/>
              <label htmlFor="Password">Password:</label>
              <input type="text" name="Password" minLength={8} title="Must be at least 8 characters long." required onChange={(e) => setPassword(e.target.value)}/>
              <label htmlFor="Password-2">Re Enter Password:</label>
              <input type="text" name="Password-2" minLength={8} title="Must be at least 8 characters long." required onChange={(e) => setRePassword(e.target.value)} />
              <label htmlFor="avatar">Avatar url</label>
              <input type="url" name="avatar" onChange={(e) => setAvatar(e.target.value)}/>
              <h4>Are you a venue manager?</h4>
              <label htmlFor="no">No</label>
              <input type="radio" name="venueManager" id="no" onChange={() => setVenueManager(false)}/>
              <label htmlFor="yes">Yes</label>
              <input type="radio" name="venueManager" id="yes" onChange={() => setVenueManager(true)}/>
              <Button type="submit">Register</Button>
          </Form>
        </Flex>
        
        
        </>
    );
}