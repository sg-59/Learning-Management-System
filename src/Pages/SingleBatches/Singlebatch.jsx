import React, { useEffect, useState } from 'react'

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem, MDBCardLink, MDBRow, MDBCol, MDBInput, MDBCheckbox, MDBIcon, MDBRadio, MDBTextArea } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled,{keyframes} from 'styled-components';

const Navbar = styled.div`
  width: 100%;
padding: 1rem;
  background-color: #411B66;
  margin-bottom: 5em;
  display: flex;
  align-items: center;
`

const Left = styled.div`
  width: 50%;
`
const Right = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const TableView = styled.div`
 
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
const Singlebatch = () => {
  const [Batchdetails, setBatchdetails] = useState([]);
  const [StudentDetails, setStudentDetails] = useState([]);
  const [singleStudentData, setsingleStudentData] = useState({})
  const [loading,setLoading]=useState(false)
  const [loading1,setLoading1]=useState(false)
  const { id } = useParams()




  const [centredModal, setCentredModal] = useState(false);
  const [updateModal, setupdatedModal] = useState(false);

  const toggleOpen = (id) => {
    console.log("whereis id", id);
    setCentredModal(!centredModal)
    if (!centredModal) {
      setLoading1(true)
      axios.get(`https://futuralab-lms.onrender.com/student/${id}`, { headers: { 'x-organization-id': 'org1db' } }).then((data) => {

        setsingleStudentData(data.data.data)
setLoading1(false)
      })
    }


  }

  const updateToggleOpen=()=>{
    setupdatedModal(!updateModal)
  }



  useEffect(() => {
setLoading(true)
    axios.get(`https://futuralab-lms.onrender.com/batch/with-students/${id}`, { headers: { 'x-organization-id': 'org1db' } })
      .then((data) => {
        
        setBatchdetails(data.data.data)
        setStudentDetails(data.data.data[0]?.student_details)
        setLoading(false)
      })




  }, []);




  return (
    <>
      <Navbar>
        <Left></Left>
        <Right>
          <MDBDropdown>
            <MDBDropdownToggle style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif', marginLeft: "20px" }} className='text-white  bg-transparent border-0 mt-3 py-2 px-4 shadow-none border'>
              Update and Delete
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link>Update</MDBDropdownItem>
              <MDBDropdownItem link>Delete</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
          <MDBDropdown>
            <MDBDropdownToggle style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif', marginLeft: "20px" }} className='text-white  bg-transparent border-0 mt-3 py-2 px-4 shadow-none border'>
              Change schedule time & date
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              {/* <MDBDropdownItem link>Option 1</MDBDropdownItem>
        <MDBDropdownItem link>Option 2</MDBDropdownItem> */}

              {/* Nested Dropdown */}
              <MDBDropdown>
                <MDBDropdownToggle className='dropdown-item text-dark bg-light border-0'>
                  Select Batch code
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Batch code 1</MDBDropdownItem>
                  <MDBDropdownItem link>Batch code 2</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBDropdownMenu>
          </MDBDropdown>
        </Right>
      </Navbar>
      <TableView className='container'>
        <MDBTable
          align='middle'>
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
          {loading ? <Loader/>
          
          :StudentDetails?.map((li) => (
            <MDBTableBody >
              <tr   >
                <td>
                  <div className={li.status == "active" ? 'bg-success' : "bg-danger"} style={{ width: "15px", height: "15px", borderRadius: '15px', float: "left" }}></div>
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
                  {/* <MDBBtn color='success' className='fs-50' onClick={toggleOpen}>Click</MDBBtn> */}
                  {/* <MDBBadge color='success' className='fs-50' onClick={() => toggleOpen(li._id)} pill>click</MDBBadge> */}
                  <MDBBadge style={{cursor:'pointer'}}  color='success' className='fs-20 px-3' onClick={() => toggleOpen(li._id)} pill>Click</MDBBadge>
                  {centredModal && (
                  <MDBModal open={centredModal} onClose={() => setCentredModal(false)} backdrop={false}>
                        {loading1 ? (
                        <Loader/>  // Show loader if data is still being fetched
                      ) : (
                    <MDBModalDialog centered>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>Profile</MDBModalTitle>
                          <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                          <MDBCard>
                            <MDBCardImage style={{ width: '200px', height: '200px' }} position='top' alt='...' src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' />
                            <MDBCardBody>
                              <MDBCardTitle>{singleStudentData.first_name} {singleStudentData.last_name}</MDBCardTitle>

                              <MDBCardText>
                                {singleStudentData.email}<br></br>
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
                        <MDBBadge color='success' pill onClick={updateToggleOpen} style={{ cursor: 'pointer', width: "100%" }}>
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
                        <Loader/>  // Show loader if data is still being fetched
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


            </MDBTableBody>
          ))}



        </MDBTable>
      </TableView>
    </>
  )
}

export default Singlebatch