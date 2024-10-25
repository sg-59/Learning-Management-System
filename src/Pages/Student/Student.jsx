import axios from 'axios'
import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle, MDBRadio, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBTextArea } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled,keyframes } from 'styled-components'
import Loading from '../../Component/Loading'

const Navsection1 = styled.div`
width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`

const CustomIcon = styled(MDBIcon)`
  color:#411B66;
  margin: 0.5rem;
`;

const DropDown=styled(MDBDropdownToggle)`
   font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
  color: #411B66;
  font-size: 12px;
`

const Navsection2 = styled.div`
   display: flex;
   padding: 7px;
   height: auto;
   align-items: center;
   z-index: 99;
  background-color: #411B66;
  margin-bottom: 25px;

`

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 7px;
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
`


const Searchbar = styled.div`
  border: 2px solid #411B66;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  border-radius: 25px;
  outline-color: #411B66;
 
`

const Image = styled.img`
width: 7rem;

`

const Button = styled.div`
  padding: 3px;
  border-radius: 7px;
  border: 0.5px solid grey;
  margin-right: 17px;
`



const Leftside2 = styled.div`
  display: flex;
  width: 43%;
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
font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
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

//styledModal

const StyledModal = styled(MDBModal)`
  .modal-dialog-scrollable {
    max-height: 90vh; /* Make sure the modal dialog fits the viewport */
    overflow-y: auto; /* Enable vertical scroll */
  }

  .modal-content {
    max-height: 80vh; /* Limit modal content height */
    overflow-y: auto; /* Enable vertical scrolling inside modal */
  }
`

const SpaceGroteskText = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-optical-sizing: auto;
  font-weight:400; /* Default weight can be set here */
  font-style: normal;
  color: #411B66;
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
  <MDBContainer fluid>


<Navsection1>
        <Leftside>
          <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgJPgAp_4zvcBBWIgWfIfbTo5qYymSC1T6djE5sijLRq2hGOfQpR-FOvac0cGcc_0vVc&usqp=CAU'></Image>
          <Searchbar>
            <Input type='search' placeholder='Searh batches'></Input>
            <CustomIcon className='m-2 gray-icon' fas icon="search" size='lg' />
          </Searchbar>
        </Leftside>
        <Rightside>
 
        <Link to={'/createstudent'} className='text-decoration-none d-flex align-items-center' style={{color:"#411B66"}} >
  <MDBIcon fas icon="plus-circle" /><SpaceGroteskText>create student</SpaceGroteskText>
</Link>
          <Button>
          <SpaceGroteskText>Logout</SpaceGroteskText>
          </Button>
        </Rightside>
      </Navsection1>
      <Navsection2>
        <Leftside2>
     <MDBDropdown>
            <DropDown className='text-white  bg-transparent border-0 py-2 px-4 shadow-none border'>
              Active student
            </DropDown>
            <MDBDropdownMenu>
          
                  <MDBDropdownItem link onClick={() => filterStatus('active')}>Active</MDBDropdownItem>
                  <MDBDropdownItem link  onClick={() => filterStatus('inactive')}>Inactive</MDBDropdownItem>
             
          
            </MDBDropdownMenu>
          </MDBDropdown>
          <MDBDropdown>
            <DropDown className='text-white  bg-transparent border-0 py-2 px-4 shadow-none border'>
              Select Course
            </DropDown>
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
        {loading ? <Loading/> : StudentDetails?.filter((li, index, self) => index === self.findIndex((t) => t.status === li.status))
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
                       <Loading/> // Show loader if data is still being fetched
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
                  <StyledModal  open={updateModal} onClose={() => setupdatedModal(false)} backdrop={false}>
                        {loading1 ? (
                        <Loading/>  // Show loader if data is still being fetched
                      ) : (
                    <MDBModalDialog centered>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBBtn className='btn-close' color='none' onClick={updateToggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
         

        <MDBCardBody className='px-4'>
          <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Registration Form</h3>

          <MDBRow>
            <MDBCol md='6'>
              <MDBInput wrapperClass='mb-4' label='First Name' size='lg' id='form1' type='text'/>
            </MDBCol>

            <MDBCol md='6'>
              <MDBInput wrapperClass='mb-4' label='Last Name' size='lg' id='form2' type='text'/>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md='6'>
              <MDBInput wrapperClass='mb-4' label='Date of birth' size='lg' id='form3' type='date'/>
            </MDBCol>

            <MDBCol md='6' className='mb-4'>
              <h6 className="fw-bold">Gender: </h6>
              <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Female' inline />
              <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='Male' inline />
              <MDBRadio name='inlineRadio' id='inlineRadio3' value='option3' label='Other' inline />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md='6'>
              <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form4' type='email'/>
            </MDBCol>

            <MDBCol md='6'>
              <MDBInput wrapperClass='mb-4' label='Phone Number' size='lg' id='form5' type='rel'/>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md='6'>
              <MDBInput wrapperClass='mb-4' label='Joining Date' size='lg' id='form4' type='date'/>
            </MDBCol>

            <MDBCol md='6'>
              <MDBInput wrapperClass='mb-4' label='Duration' size='lg' id='form5' type='text'/>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md='6'>
              <MDBInput wrapperClass='mb-4' label='Course' size='lg' id='form4' type='Course'/>
            </MDBCol>

            <MDBCol md='6'>
            <MDBDropdown>
            <MDBDropdownToggle style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }} className='text-dark  bg-transparent border-0 mt-3 py-2 px-4 shadow-none border'>
               student status
            </MDBDropdownToggle>
            <MDBDropdownMenu>
          
                  <MDBDropdownItem link >Active</MDBDropdownItem>
                  <MDBDropdownItem link >Inactive</MDBDropdownItem>
             
          
            </MDBDropdownMenu>
          </MDBDropdown>
            </MDBCol>
          </MDBRow>

          <MDBRow>
  <MDBTextArea
    wrapperClass='mb-4'
    label='Your Message'
    id='textAreaExample'
    rows={4} // Number of visible rows
    placeholder='Address'
  />
</MDBRow>
<MDBRow>
<MDBInput wrapperClass='mb-4' size='lg' id='form4' type='file'/> 
</MDBRow>
<div className="d-flex justify-content-center">
  <MDBBtn className='mb-4' size='sm' color='success'>Submit</MDBBtn>
</div>


        </MDBCardBody>

                        </MDBModalBody>
                       
                      </MDBModalContent>
                    </MDBModalDialog>
                      )}
                  </StyledModal>
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
  </MDBContainer>
);
}

export default Student