import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Fragment } from "react";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    (async () => {
      const data = await JSON.parse(
        localStorage.getItem('chat-app-current-user')
      );
      setCurrentUserName(data.name);
    })()
  }, []);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.name);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <Fragment>
      {currentUserName && (
        <Container>
          
          <div className="brand">
            <h3>Contacts</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  // key={contact._id}
                  key={index}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >

                  <div className="username">
                    <h3>{contact.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="current-user">

            <div className="username">
              <h2>Hi {currentUserName}</h2>
            </div>
          </div> */}
        </Container>
      )}
    </Fragment>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 20% 75% 5%;
  overflow: hidden;
  height: 90%;
  
  background-color: #0d0c0c;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      text-align: center;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #261010;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #2e2829;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.6rem;
      
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.2s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          font-size: 24px;
          color: white;
        }
      }
    }
    .selected {
      background-color: #e61744;
    }
  }
  .current-user {
    background-color: #0d0c0c;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: White;
        font-size: 30px;
        font-family: "Times New Roman", Times, serif;
 
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;