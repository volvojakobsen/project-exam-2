import styled from "styled-components";
import React, { useState, useEffect  } from "react";

const HeaderTitle = styled.h1`
text-align: center;
`

const ProfileContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
width: 100%;
`

const ProfileImage = styled.img`
    max-height: 400px;
    max-width: 400px;
    object-fit: cover;
    margin-top: 20px;
`

export const Profile = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [profile, setProfile] = useState([]);
    const [avatar, setAvatar] = useState(null);

    const name = localStorage.getItem("name");
    const method = "put";
    const formValues = {avatar};
  

    useEffect(() => {
      async function getData() {
        try {
          setIsError(false);
          setIsLoading(true);
          const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.getItem("accessToken")}`
            },
        });
          const json = await response.json();
          setProfile(json);
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
    return <div className='loader'></div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
    
  return (
    <>
    <HeaderTitle>Profile</HeaderTitle>
    <ProfileContainer>
        <div><ProfileImage src={profile.avatar} alt="" /></div>
        <div>
            <h2>{profile.name}</h2>
            <h5>{profile.email}</h5>
            <form action="" onSubmit={changeAvatar}>
                <p>Change Avatar</p>
                <input type="url" name="avatar" onChange={(e) => setAvatar(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    </ProfileContainer>
    </>
  )
}