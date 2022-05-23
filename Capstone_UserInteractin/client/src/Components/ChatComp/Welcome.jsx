import React, { useState, useEffect } from "react";
import styled from "styled-components";
export default function Welcome() {
  const [userName, setCurrentUserName] = useState("");
  useEffect( () => {

    (async()=>{const data = await JSON.parse(
      localStorage.getItem('chat-app-current-user')
    );
    setCurrentUserName(data.name);})()
  }, []);
  return (
    <Container>
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #de0d37;
  }
`;