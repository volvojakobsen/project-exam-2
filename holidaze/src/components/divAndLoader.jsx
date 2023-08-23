import styled from "styled-components";

export const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
border: 15px solid #f3f3f3;
border-top: 15px solid #590561;
border-radius: 70%;
width: 70px;
height: 70px;
animation: spin 2s linear infinite;
`;

export const TopContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
width: 100%;
border-bottom: 5px solid black;
margin-bottom: 10px;

@media (max-width: 700px) {
    flex-direction: column;
}
`;
