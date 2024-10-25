import React, { useEffect, useState } from 'react'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt } from 'react-icons/fa'
import { styled,keyframes } from 'styled-components'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBIcon, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBSpinner, MDBContainer, } from 'mdb-react-ui-kit';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loading from '../../Component/Loading';
import Navbar1 from '../../Component/Navbar1';



const DropDown=styled(MDBDropdownToggle)`
   font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
  color: #411B66;
  font-size: 12px;
`
const CardTitle=styled(MDBCardTitle)`
    font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
  color: #411B66;
`

const CardText=styled(MDBCardText)`
      font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
  color: #411B66;
`

const Navsection2 = styled.div`
   display: flex;
   padding: 7px;
   height: auto;
   align-items: center;
   z-index: 99;
  background-color: #411B66;


`



const Content = styled.div`
  gap:1rem;  
  width: 100%;
  white-space: nowrap; 
  overflow-x: scroll; 
  -ms-overflow-style: none; 
  scrollbar-width: none; 
margin-top:25px;
  &::-webkit-scrollbar {
    display: none;
  }
      

`

const SubMain = styled.div`
   min-width: 30%;
display: inline-block; 
  margin-right: 10px;
  text-align: center;
&:hover{
  transition: all 1s ease;
 transform: scale(1.05);
}

   
`

const Leftside2 = styled.div`
  display: flex;
  width: 43%;
  align-items: center;
  justify-content: space-around;
  margin-left: 75px;

`
const Rightside2 = styled.div`
width: 43%;
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
font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
`
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  background-color: #ffffff;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #007bff; /* Change border color on focus */
  }
`

const InputStyled = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 16px;
  color: #333;
  background-color: transparent;
  &::placeholder{
    color:#411B66 ;
    font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
  }
`;

const InputGroupAppend = styled.div`
  display: flex;
  align-items: center;
`;

const InputGroupText = styled.span`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 1.2em;
  padding: 0 8px;

  &:hover {
    color: #007bff; /* Change icon color on hover */
  }
`;


function CustomInput({ value, onClick }) {
  return (
    <InputGroup>
      <InputStyled type="text" value={value} placeholder="Select Date" onClick={onClick} readOnly />
      <InputGroupAppend>
        <InputGroupText onClick={onClick}>
          <FaCalendarAlt />
        </InputGroupText>
      </InputGroupAppend>
    </InputGroup>
  );
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
      <Navbar1 day={day}/>
      <Navsection2>
        <Leftside2>
          {/* <label style={{ marginLeft: "10px" }} htmlFor=""> */}
          <Datepicker selected={selectedDate} onChange={date => setDate(date)} customInput={<CustomInput />} />
          {/* </label> */}
          <MDBDropdown>
          <DropDown className='text-white  bg-transparent border-0  py-2 px-4 shadow-none border'>
              Mentor
            </DropDown>
            
         
            <MDBDropdownMenu>
              {demoDatas1
                ?.filter((li, index, self) => index === self.findIndex((t) => t.mentor === li.mentor))
                .map((li, index) => (
                  <MDBDropdownItem link key={index} onClick={() => filterMentor(li.mentor)}>{li.mentor}</MDBDropdownItem>
                ))}


            </MDBDropdownMenu>
          </MDBDropdown>
          <MDBDropdown>
            < DropDown className='text-white  bg-transparent border-0  py-2 px-4 shadow-none border'>
              Batch type
            </DropDown>
            <MDBDropdownMenu>
              <MDBDropdownItem link>Active Batch</MDBDropdownItem>
              <MDBDropdownItem link>Archived Batch</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
          <MDBDropdown>
            < DropDown className='text-white  bg-transparent border-0  py-2 px-4 shadow-none border'>
              Select Module
            </DropDown>
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
          </Titles >
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

<Loading/>

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
              <MDBCard>
                <MDBCardBody>
                  <CardTitle className='fs-5'>{li.name}</CardTitle>
                  <CardText>{li.mentor}</CardText>
                  <CardText>
                    {li.batch_code}
                    <br />
                    <MDBIcon fas icon="clock" /> {li.start_time} to {li.end_time}
                  </CardText>
                  <CardText>
                    <MDBIcon fas icon="plus" className='text-success' /> {li.students.length} students
                    <br />
                  </CardText>
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