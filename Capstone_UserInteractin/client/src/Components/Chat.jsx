import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
// import { allUsersRoute, host } from "../utils/APIRoutes";
import Services from "../Services/Services";
import ChatContainer from "./ChatComp/ChatContainer";
import Contacts from "./ChatComp/Contacts";
import Welcome from "./ChatComp/Welcome";
const host = "http://localhost:3500"

export default function Chat() {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        (async () => {
            if (!localStorage.getItem('chat-app-current-user')) {
                navigate('/');
            } else {
                setCurrentUser(
                    await JSON.parse(
                        localStorage.getItem('chat-app-current-user')
                    )
                );
            }
        })()
    }, []);
    useEffect(() => {
        if (currentUser) {
            socket.current = io("http://localhost:3500");
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            var data;
            Services.allusers(currentUser._id).then((res) => {
                data = res;
                setContacts(data.data);
            })


        }
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <>
            <Container>
                <div className="container">
                    <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                    {currentChat === undefined ? (
                       <Welcome/>
                    ) : (
                        <ChatContainer currentChat={currentChat} socket={socket} />
                    )}
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
  height: 90vh;
  min-height: 100%;
//   width: 86.25vw;
  display: flex;
  
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
//   background-color: #2e2829;
  .container {
    height: 100%;
    width: 100%;
    
    background-color: #000000;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 2980px) {
      grid-template-columns: 35% 65%;
    }
  }
`;