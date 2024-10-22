import React, { useState } from 'react'
import {
    MDBIcon,
    MDBInput,
    MDBInputGroup,
}
    from 'mdb-react-ui-kit';
import './login.css'
import { Link } from 'react-router-dom';
import {styled} from 'styled-components'

const Main=styled.div`
    width: 100%;
      height: 100vh; /* Full viewport height */
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url('./Login/login.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
`

const Sub=styled.div`
   width: 35%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  
`

const Popup=styled.div`
      position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Popup_Inner=styled.div`
  background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
    position: relative;

`

const Span=styled.span`
font-size: 17px;
border: none;
background-color: transparent;
`

function Login() {


    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
      setIsOpen(true);
    };
  
    const closePopup = () => {
      setIsOpen(false);
    };

    return (
        <Main>

            <Sub>
        
  <MDBInput label="Please enter Mobile Number" id="typePhone" type="tel" />


<Span onClick={openPopup} className="input-group-text">
    <MDBIcon far icon="paper-plane" />
  </Span>


                </Sub>

                        {isOpen && (
        <Popup>

          <Popup_Inner>
          <span onClick={closePopup} class="material-symbols-outlined close">
close
</span>
            <h5>Enter your Otp</h5>
            <input type="text" placeholder='Otp' />
           <Link to={'/home'}><button className='submit'>Submit</button></Link> 

          </Popup_Inner>
        </Popup>
      )}

                      
        </Main>
    )
}

export default Login
