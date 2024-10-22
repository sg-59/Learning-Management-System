import React, { useEffect, useState } from 'react'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt } from 'react-icons/fa'
import { styled,keyframes } from 'styled-components'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBIcon, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBSpinner, MDBContainer, } from 'mdb-react-ui-kit';
import axios from 'axios'
import { Link } from 'react-router-dom';
const Maindiv = styled.div`

`


const Navsection1 = styled.div`
width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`
const Navsection2 = styled.div`
   display: flex;
   padding-bottom: 5px;
   height: auto;
  align-items: center;
  z-index: 99;
  border: .1px solid purple;
  background-color: #411B66;
  border-radius: 20px;

`

const Content = styled.div`

   /* display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap; */
  gap:1rem;  
  width: 100%;
  white-space: nowrap; /* Prevents line breaks within the container */
  overflow-x: scroll; /* Enables horizontal scroll */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
margin-top:25px;
  /* Hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
      

`

const SubMain = styled.div`
   min-width: 30%;
/* margin-top: 25px; */
display: inline-block; 
  margin-right: 10px;
  text-align: center;
&:hover{
  transition: all 1s ease;
 transform: scale(1.05);
}

   
`

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 7px;
  border-radius: 25px;
  &::placeholder {
  padding-left: 5px;
  
  }
  &:focus{
outline: none;
  }
`
const Leftside = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const Rightside = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content:space-between ;
`

const Searchbar = styled.div`
  border: .5px solid #411B66;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  border-radius: 25px;
 
`

const Image = styled.img`
width: 7rem;

`

const Button = styled.div`
  padding: 7px;
  background-color:#411B66 ;
  color:white;
  border-radius: 7px;
  border: 0.5px solid grey;
  margin-right: 17px;
  &:hover{
    background-color:#572d81;
  }
`


const Leftside2 = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-around;

`
const Rightside2 = styled.div`
width: 50%;
  display: flex;
  color: #f4e5e5;
  align-items: center;
  justify-content: flex-end;
`
const Titles = styled.div`
  display: flex;
  flex-direction: row;
 align-items: center;
justify-content: center;
margin-left:3%;
margin-right: 3%;
`

//loading ...........

const before8 = keyframes`
  0% {
    width: 0.5em;
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }
  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
  }
  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
  }
  100% {
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }
`;

const after6 = keyframes`
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }
  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
  }
  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
  }
  100% {
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }
`;

// Loader container
const Loader = styled.div`
  position: relative;
  width: 2.5em;
  height: 2.5em;
  transform: rotate(165deg);
  position: absolute;
  top: calc(50% - 1.25em);
  left: calc(50% - 1.25em);
  
  &:before, &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.25em;
    transform: translate(-50%, -50%);
  }

  &:before {
    animation: ${before8} 2s infinite;
  }

  &:after {
    animation: ${after6} 2s infinite;
  }
`;




function CustomInput({ value, onClick }) {
  return (
    <div className='input-group'>
      <input type="text" className='form-control' value={value} placeholder='Date' onClick={onClick} readOnly />
      <div className='input-group-append'>
        <span className='input-group-text ms-3' onClick={onClick}>
          <FaCalendarAlt />
        </span>
      </div>
    </div>
  )
}






const Batches = () => {

  const [demoDatas, setDemoDatas] = useState([]);
  const [demoDatas1, setDemoDatas1] = useState([]);
  const [selectedDate, setDate] = useState(null);
  const [day, setDay] = useState('');
  const [module, setModules] = useState([])
  const [loading,setLoading]=useState(false)

  // Get today's day when the component mounts
  useEffect(() => {
    const today = new Date();

    // Get the day of the week (0 - Sunday, 6 - Saturday)
    const dayOfWeek = today.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the name of today's day and set it in state
    const dayName = daysOfWeek[dayOfWeek];
    setDay(dayName);
  }, []);

  console.log("first check", typeof (day));


  // Make the API call based on the day state
  useEffect(() => {
    setLoading(true)
    if (day) {
      console.log("Making API call for day:", day);
      axios.get(`https://futuralab-lms.onrender.com/batch`, { headers: { 'x-organization-id': 'org1db' } })
        .then((response) => {
          setDemoDatas(response.data.data);
          setDemoDatas1(response.data.data);
setLoading(false)

          console.log(response.data.data, "API Response");
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    }
  }, [day, selectedDate]);  // Adding `day` as a dependency so it runs when `day` changes

  // Handle when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const dayOfWeek = selectedDate.getDay();
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      setDay(daysOfWeek[dayOfWeek]);
    }
  }, [selectedDate]);  // Adding selectedDate as a dependency


  //filtering mentor

  function filterMentor(value) {
    console.log("////////////////////", value);
    const mentorBatch = demoDatas1.filter((li) => {
      return li.mentor == value
    })
    setDemoDatas(mentorBatch)
  }


  // useEffect(()=>{
  //   demoDatas1?.filter((li)=>{  
  //     console.log(li.modules[0],'55');
      
  //   setModules(li.modules[0])
  //   })
  //     },[demoDatas1])
  useEffect(() => {
    if (demoDatas1) {
      const filteredModules = demoDatas1
        .filter((li) => li.modules && li.modules.length > 0) // Ensure modules exist and have elements
        .map((li) => li.modules[0]); // Get the first element of each module array
  
      setModules(filteredModules); // Set the modules as the array of first elements
    }
  }, [demoDatas1]);

      console.log("modues**",module);
      console.log("demodatas**",demoDatas1);
      
    
      function filterModule(value){
        const moduleBatch = demoDatas1.filter((li) => {
         
         const data= li.modules.filter((innerData)=>{
           return innerData.module_name==value
          })      
          return data[0]?.module_name==value
        })
        setDemoDatas(moduleBatch)
      }


  return (
    <MDBContainer fluid>

      <Navsection1>
        <Leftside>
          <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgJPgAp_4zvcBBWIgWfIfbTo5qYymSC1T6djE5sijLRq2hGOfQpR-FOvac0cGcc_0vVc&usqp=CAU'></Image>
          <Searchbar>
            <Input type='search' placeholder='Searh batches'></Input>
            <MDBIcon className='m-2 gray-icon' fas icon="search" size='lg' />
          </Searchbar>
        </Leftside>
        <Rightside>
          <MDBDropdown>
            <MDBDropdownToggle style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }} className='text-dark  bg-transparent border-0 mt-3 py-2 px-4 shadow-none border'>
              {day}
            </MDBDropdownToggle>
          </MDBDropdown>
          <Button>

           Logout
          </Button>
        </Rightside>
      </Navsection1>
      <Navsection2>
        <Leftside2>
          {/* <label style={{ marginLeft: "10px" }} htmlFor=""> */}
          <Datepicker selected={selectedDate} onChange={date => setDate(date)} customInput={<CustomInput />} />
          {/* </label> */}
          <MDBDropdown>
            <MDBDropdownToggle style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }} className='text-white  bg-transparent border-0 mt-3 py-2 px-4 shadow-none border'>
              Select Mentor
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              {demoDatas1
                ?.filter((li, index, self) => index === self.findIndex((t) => t.mentor === li.mentor))
                .map((li, index) => (
                  <MDBDropdownItem link key={index} onClick={() => filterMentor(li.mentor)}>{li.mentor}</MDBDropdownItem>
                ))}


            </MDBDropdownMenu>
          </MDBDropdown>
          <MDBDropdown>
            <MDBDropdownToggle style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }} className='text-white  bg-transparent border-0 mt-3 py-2 px-4 shadow-none border'>
              Batch type
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link>Active Batch</MDBDropdownItem>
              <MDBDropdownItem link>Archived Batch</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
          <MDBDropdown>
            <MDBDropdownToggle style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }} className='text-white  bg-transparent border-0 mt-3 py-2 px-4 shadow-none border'>
              Select Module
            </MDBDropdownToggle>
            <MDBDropdownMenu>
            {module
                ?.filter((li, index, self) => index === self.findIndex((t) => t.module_name === li.module_name))
                .map((li, index) => (
                  <MDBDropdownItem link key={index} onClick={() => filterModule(li.module_name)}>{li.module_name}</MDBDropdownItem>
                ))}
            </MDBDropdownMenu>
          </MDBDropdown>
        </Leftside2>
        <Rightside2>

          <Titles>
            <MDBIcon fas icon="home" size='sm' />
            <Link style={{ textDecoration: "none", fontSize: '12px', color: "white", margin: "3px" }} to={'/home'}>Home</Link>
          </Titles>
          <Titles>
            <MDBIcon fas icon="graduation-cap" size='sm' />
            <Link style={{ textDecoration: "none", fontSize: '12px', color: "white", margin: "3px" }} to={'/student'}>Student</Link>
          </Titles>
          <Titles>
            <MDBIcon fas icon="book-reader" size='sm' />
            <Link style={{ textDecoration: "none", fontSize: '12px', color: "white", margin: "3px" }} to={'/#'}>Mentor</Link>
          </Titles>
          <Titles>
            <MDBIcon fas icon="users" size='sm' />
            <Link style={{ textDecoration: "none", fontSize: '12px', color: "white", margin: "3px" }} to={'/batch'}>Batches</Link>
          </Titles>
          <Titles>
            <MDBIcon fas icon="headset" size='sm' />
            <Link style={{ textDecoration: "none", fontSize: '12px', color: "white", margin: "3px" }} to={'/#'}>Chat</Link>
          </Titles>
        </Rightside2>

      </Navsection2>
{loading ?

<Loader/>

:demoDatas1
  ?.filter((li, index, self) => index === self.findIndex((t) => t.mentor === li.mentor)) // Get unique mentors
  .sort((a, b) => a.mentor.localeCompare(b.mentor)) // Sort mentors alphabetically
  .map((mentorData, index) => (
    <Content className='container' key={index}>
      {demoDatas // Map over all batches but only display those with the same mentor
        .filter((batch) => batch.mentor === mentorData.mentor)
        .map((li) => (
          <SubMain key={li._id}>
            <Link style={{ textDecoration: 'none' }} to={`/singlebatch/${li._id}`}>
              <MDBCard style={{ boxShadow: '0 0 -10px 20px #411B66' }}>
                <MDBCardBody>
                  <MDBCardTitle className='fs-5'>{li.name}</MDBCardTitle>
                  <MDBCardText className='text-dark'>{li.mentor}</MDBCardText>
                  <MDBCardText className='text-secondary'>
                    {li.batch_code}
                    <br />
                    <MDBIcon fas icon="clock" /> {li.start_time} to {li.end_time}
                  </MDBCardText>
                  <MDBCardText className='text-secondary'>
                    <MDBIcon fas icon="plus" className='text-success' /> {li.students.length} students
                    <br />
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </Link>
          </SubMain>
        ))}
    </Content>
  ))
}

    </MDBContainer>

  )
}

export default Batches