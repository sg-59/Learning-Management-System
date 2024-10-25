import { MDBIcon } from 'mdb-react-ui-kit'
import React from 'react'
import { styled } from 'styled-components'



const Navsection1 = styled.div`
width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`

const Image = styled.img`
width: 4rem;

`
const Leftside = styled.div`
  width: 70%;
  display: flex;
  align-items: center;  
  justify-content: flex-start;
`
const Rightside = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content:space-between ;
  margin-right: 0px;
`

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 4px;
  border-radius: 25px;
  outline-color: #411B66;
  &::placeholder {
    font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
  color: #411B66;
  
  }
  &:focus{
outline: none;
  }
`
const Searchbar = styled.div`
  border: 2px solid #411B66;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  border-radius: 25px;
  outline-color: #411B66;
 background-color: white;
 
`
const CustomIcon = styled(MDBIcon)`
  color:#411B66;
  margin: 0.5rem;
`;
const Button = styled.div`
  padding: 3px;
  border-radius: 7px;
  border: 0.5px solid grey;
  margin-right: 17px;
`


const SpaceGroteskText = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
  color: white;
  background-color: #411B66 ;
  cursor: pointer;
  padding: 5px;
  border-radius: 10px;
  &:hover{
    background-color: white;
    color:  #411B66;
  }

`;
const Days=styled.h6`
    font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:700; /* Default weight can be set here */
  font-style: normal;
  color: #411B66;

`

const Navbar1 = ({day}) => {
  return (
    <Navsection1>
    <Leftside>
      <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgJPgAp_4zvcBBWIgWfIfbTo5qYymSC1T6djE5sijLRq2hGOfQpR-FOvac0cGcc_0vVc&usqp=CAU'></Image>
      <Searchbar>
        <Input type='search' placeholder='Search batches'></Input>
        <CustomIcon className='m-2 gray-icon' fas icon="search" size='lg' />
      </Searchbar>
    </Leftside>
    <Rightside>
    <Days>{day}</Days>
      <Button>
      <SpaceGroteskText>Logout</SpaceGroteskText>
      </Button>
    </Rightside>
  </Navsection1>
  )
}

export default Navbar1