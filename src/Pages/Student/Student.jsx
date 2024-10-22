import axios from 'axios'
import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle, MDBRow, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled,keyframes } from 'styled-components'

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
  margin-bottom: 30px;

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
  padding: 3px;
  background-color:#411B66 ;
  color: white;
  border-radius: 7px;
  border: 0.5px solid grey;
  justify-content: space-around;
  margin-right: 17px;
  font-size: 14px;
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
const TableView = styled.div`
  `
  const CreateStudent=styled.div`
    background-color: #411B66;
    color: white;
    padding: 3px;
    border-radius: 7px;
    border: 0.5px solid grey;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 30%;
  `


  //loading ...........

const before8 = keyframes`
0% {
  width: 0.5em;
  box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
}
35% {
  width: 3.5em;
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
  height: 3.5em;
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
  width: 3.5em;
  height: 3.5em;
  transform: rotate(165deg);
  position: absolute;
  top: calc(50% - 1.25em);
  left: calc(50% - 1.25em);
  background-color: transparent;  // Make sure background is transparent

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





const Student = () => {
  const [StudentDetails, setStudentDetails] = useState([]);
  const [StudentDetails1, setStudentDetails1] = useState([]);
  const [singleStudentData, setsingleStudentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);  // Loader state for the modal
  const [centredModal, setCentredModal] = useState(false);
  const [updateModal, setupdatedModal] = useState(false);
  const toggleOpen = (id) => {
    console.log("where is id", id);
    setCentredModal(!centredModal);

    if (!centredModal) {
      setLoading1(true);  // Set loading state for modal content
      axios.get(`https://futuralab-lms.onrender.com/student/${id}`, { headers: { 'x-organization-id': 'org1db' } })
        .then((data) => {
          setsingleStudentData(data.data.data);
        
          setLoading1(false);  // Stop loading once data is fetched
        })
        .catch(() => setLoading1(false));
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`https://futuralab-lms.onrender.com/student`, { headers: { 'x-organization-id': 'org1db' } })
      .then((data) => {
        console.log(data.data);
        
        setStudentDetails(data.data.data);
        setStudentDetails1(data.data.data);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  function filterStatus(value){
console.log("value in status",value);
const studentData=StudentDetails.filter((li)=>{
  return li.status==value
})

setStudentDetails1(studentData)
  }

  
  const updateToggleOpen=()=>{
    setupdatedModal(!updateModal)
  }

return (
  <Maindiv>


<Navsection1>
        <Leftside>
          <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgJPgAp_4zvcBBWIgWfIfbTo5qYymSC1T6djE5sijLRq2hGOfQpR-FOvac0cGcc_0vVc&usqp=CAU'></Image>
          <Searchbar>
            <Input type='search' placeholder='Searh batches'></Input>
            <MDBIcon className='m-2 gray-icon' fas icon="search" size='lg' />
          </Searchbar>
        </Leftside>
        <Rightside>
        <Link to={'/createstudent'} className='text-decoration-none text-success'>
  <MDBIcon fas icon="plus-circle" /> Create student
</Link>

          <Button>
Logout
          </Button>
        </Rightside>
      </Navsection1>
      <Navsection2>
        <Leftside2>
     <MDBDropdown>
            <MDBDropdownToggle style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }} className='text-white  bg-transparent border-0 mt-3 py-2 px-4 shadow-none border'>
              Active student
            </MDBDropdownToggle>
            <MDBDropdownMenu>
          
                  <MDBDropdownItem link onClick={() => filterStatus('active')}>Active</MDBDropdownItem>
                  <MDBDropdownItem link  onClick={() => filterStatus('inactive')}>Inactive</MDBDropdownItem>
             
          
            </MDBDropdownMenu>
          </MDBDropdown>
          <MDBDropdown>
            <MDBDropdownToggle style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }} className='text-white  bg-transparent border-0 mt-3 py-2 px-4 shadow-none border'>
              Select Course
            </MDBDropdownToggle>
            <MDBDropdownMenu>
       
                  <MDBDropdownItem></MDBDropdownItem>
               
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
    {/* Rest of your UI */}

    <TableView className='container'>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Mobile</th>
            <th scope='col'>Joining Date</th>
            <th scope='col'>Course</th>
            <th scope='col'>Duration</th>
            <th scope='col'>Move</th>
            <th scope='col'>Show full details</th>
            <th scope='col'>Remove</th>
          </tr>
        </MDBTableHead>
        {loading ? <Loader/> : StudentDetails?.filter((li, index, self) => index === self.findIndex((t) => t.status === li.status))
        .sort((a, b) => a.first_name.localeCompare(b.first_name))
        .map((statusData,index) => (
          <MDBTableBody key={index}>
            {StudentDetails1.filter((status)=>status.status==statusData.status).map((li)=>(
            <tr>
              <td>
                <div className={li.status === "active" ? 'bg-success' : "bg-danger"} style={{ width: "15px", height: "15px", borderRadius: '15px', float: "left" }}></div>
                <div className='d-flex align-items-center'>
                  <img
                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                  />
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{li.first_name} {li.last_name}</p>
                    <p className='text-muted mb-0'>{li.email}</p>
                    <p className='text-muted mb-0'>{li.student_id}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>{li.phone_number}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>10/05/2024</p>
              </td>
              <td>
                <MDBBadge color='success' pill>
                  Mern
                </MDBBadge>
              </td>
              <td>6 Months</td>
              <td>
                <MDBBtn color='link' rounded size='sm'>
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBadge style={{cursor:'pointer'}}  color='success' className='fs-20 px-3' onClick={() => toggleOpen(li._id)} pill>Click</MDBBadge>
               
                {centredModal && (
                      
                <MDBModal open={centredModal} onClose={toggleOpen} backdrop={false}>
                   {loading1 ? (
                        <Loader/>  // Show loader if data is still being fetched
                      ) : (
                  <MDBModalDialog centered>
             
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>profile</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                     
                          <MDBCard>
                            <MDBCardImage style={{ width: '200px', height: '200px' }} position='top' alt='...' src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' />
                            <MDBCardBody>
                              <MDBCardTitle>{singleStudentData.first_name} {singleStudentData.last_name}</MDBCardTitle>
                              <MDBCardText>
                                {singleStudentData.email}<br />
                                {singleStudentData.phone_number}
                              </MDBCardText>
                            </MDBCardBody>
                            <MDBListGroup flush>
                              <MDBListGroupItem>status            : {singleStudentData.status}</MDBListGroupItem>
                              <MDBListGroupItem>student Id        : {singleStudentData.student_id}</MDBListGroupItem>
                              <MDBListGroupItem>enrollment_number : {singleStudentData.enrollment_number}</MDBListGroupItem>
                            </MDBListGroup>
                          </MDBCard>
                       
                      </MDBModalBody>
                 
                        <MDBBadge color='success' onClick={updateToggleOpen} pill style={{ cursor: 'pointer', width: "100%" }}>
                          Update
                        </MDBBadge>
                 
                    </MDBModalContent>
                   
                  </MDBModalDialog>
                )}
                </MDBModal>
                )}
                  {updateModal && (
                  <MDBModal  open={updateModal} onClose={() => setupdatedModal(false)} backdrop={false}>
                        {loading1 ? (
                        <Loader/>  // Show loader if data is still being fetched
                      ) : (
                    <MDBModalDialog centered>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>Profile</MDBModalTitle>
                          <MDBBtn className='btn-close' color='none' onClick={updateToggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                          <MDBCard>
                            <MDBCardImage style={{ width: '200px', height: '200px' }} position='top' alt='...' src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' />
                            <form>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='form3Example1' label='First name' />
        </MDBCol>
        <MDBCol>
          <MDBInput id='form3Example2' label='Last name' />
        </MDBCol>
      </MDBRow>
      <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' />
      <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' />


      <MDBBtn type='submit' className='mb-4' block>
        Update Profile
      </MDBBtn>

    </form>
                          </MDBCard>
                        </MDBModalBody>
                        <MDBBadge color='success' pill style={{ cursor: 'pointer', width: "100%" }}>
                          Update
                        </MDBBadge>
                      </MDBModalContent>
                    </MDBModalDialog>
                      )}
                  </MDBModal>
                  )}
              </td>
              <td>
                <MDBBadge color='danger' pill>
                  Remove
                </MDBBadge>
              </td>
            </tr>
            ))}
          </MDBTableBody>
        ))}
      </MDBTable>
    </TableView>
  </Maindiv>
);
}

export default Student