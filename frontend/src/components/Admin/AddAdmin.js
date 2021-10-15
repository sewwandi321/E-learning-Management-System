
import React, { useState ,useEffect} from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";
import Pdf from "react-to-pdf";
const ref = React.createRef();

const AddAdmin = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [adminId, setAdminId] = useState('');
    const [role, setRole] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const[emailValidation,setEmailValidation] = useState(false);
    
    function sendData(e){
        e.preventDefault();

        let data = {
            name:name,
            email:email,
            adminId:adminId,
            role:role,
            month:month,
            year:year,
            contactnumber:contactnumber

        }

        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
            const result = pattern.test(email);
            if(result===false){
                setEmailValidation(true)
             alert('Please check email')
            } else{
                setEmailValidation(false)
              console.log('data',data)

        axios.post( 
            'http://localhost:8065/api/admin/create',
            data,
           
          ).then(
              alert("successfully added"),
              console.log).catch(console.log)
              .catch(function (error) {
                console.log(error);

            });
          }
        }

        function valiEmail(){
            const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
            const result = pattern.test(email);
            if(result===false){
                setEmailValidation(true)
             alert('Please check email')
            }else{
                setEmailValidation(false)
            }
          }
       
   

    return (
        <Layout sidebar>
            <Container>
            <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">Add Admin to System</span>
      </div>
      
    </div>


    <div className="container-form">
            <form onSubmit ={sendData}>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input required type="text" className="form-control" id="name"  placeholder="Enter Name"  onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                    
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input required min='1' type="text" className="form-control" id="email"  placeholder="Enter email"  onBlur={valiEmail} onChange={(e)=>{
                        setEmail(e.target.value);
                    }}/>
                    {emailValidation ? <div><p className="error-text">format error</p></div> : null}
              
                    
                </div>
                <div className="form-group">
                    <label for="adminId">AdminId</label>
                    <input required type="text" className="form-control" id="adminId"  placeholder="Enter adminId" onChange={(e)=>{
                        setAdminId(e.target.value);
                     }} />
                    
                </div>

                <div className="form-group">
                    <label for="teacherId">Contact Number</label>
                    <input required type="text" className="form-control" id="contactnumber"  placeholder="Enter contactnumber" onChange={(e)=>{
                        setContactnumber(e.target.value);
                     }} />
                    
                </div>
                <div className="form-group">
                    <label for="role">Admin Role</label>
                    <input required type="text" className="form-control" id="role"  placeholder="Enter Admin Role" onChange={(e)=>{
                        setRole(e.target.value);
                     }} />
                    
                </div>

                <div className="form-group">
                        <label for="day">Month</label>
                        <Form.Control
                            as="select"
                            value={month}
                            id="month"
                            onChange={(e) => {
                                setMonth(e.target.value);
                            }}
                        >
                     
                     <option value="January">January</option>
                     <option value="February">February</option>
                     <option value="March">March</option>
                     <option value="April">April</option>
                     <option value="May">May</option>
                     <option value="June">June</option>
                     <option value="July">July</option>
                     <option value="August">August</option>
                     <option value="September">September</option>
                     <option value="October">October</option>
                     <option value="November">November</option>
                     <option value="December">December</option>
                        </Form.Control>
                    </div>

             

                <div className="form-group">
                    <label for="year">Year</label>
                    <input required type="text" className="form-control" id="year"  placeholder="Enter year" onChange={(e)=>{
                        setYear(e.target.value);
                     }} />
                    
                </div>
                
                
                
                <button required type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div ref={ref}>
                <h1>Admin Details</h1>
                         <p>AdminId:{adminId}</p>
                        <p>Name:{name}</p>
                        <p>E-mail:{email}</p>
                        <p>Admin Role{role}</p>
                        <p>Contact No:{contactnumber}</p>
                        <p>Month:{month}</p>
                        <p>Year:{year}</p>
                        
                    </div>
                    <Pdf targetRef={ref} filename="recept.pdf">
                        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
                    </Pdf>
            
        </div>

        
            </Container>
           
            

        </Layout>
    )
}

export default AddAdmin