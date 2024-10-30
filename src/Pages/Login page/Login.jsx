import React, { useState } from 'react';
import {
  MDBIcon,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(65,27,102);
background: linear-gradient(0deg, rgba(65,27,102,1) 9%, rgba(65,27,102,0.018440652628238796) 70%); 
`;

const Sub = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup_Inner = styled.div`
  background: linear-gradient(135deg, rgba(65, 27, 102, 1), rgba(65, 27, 102, 0));
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  position: relative;

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    color: #ffffff;
  }
  
  .submit {
    margin-top: 15px;
    padding: 7px 14px;
    background-color: #ffffff;
    color: #411b66;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Span = styled.span`
  font-size: 17px;
  border: none;
  background-color: transparent;
`;
const Header=styled.h5`
    font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
  color:white;
`


function Login() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <Main>
      <Sub>
        <MDBInput label="Please enter Mobile Number" id="typePhone" type="tel" />
        <Span onClick={openPopup} className="input-group-text">
          <MDBIcon className="text-dark" far icon="paper-plane" />
        </Span>
      </Sub>

      {isOpen && (
        <Popup>
          <Popup_Inner>
            <span onClick={closePopup} className="material-symbols-outlined close">
              close
            </span>
            <Header>Enter your OTP</Header>
            <input type="text" placeholder="OTP" />
            <Link to="/home">
              <button className="submit">Submit</button>
            </Link>
          </Popup_Inner>
        </Popup>
      )}
    </Main>
  );
}

export default Login;
