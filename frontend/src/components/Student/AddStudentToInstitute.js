
import React, { useState ,useRef} from 'react'
import Layout from '../../components/Layout'
// import { useForm } from 'react-hook-form';
import { Container,  } from 'react-bootstrap';
import Pdf from "react-to-pdf";
import axios from "axios";

import './style.css';
import { Select } from '@material-ui/core';
const ref = React.createRef();



//create student function
const AddStudentToInstitute = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [studentId, setstudentId] = useState('');
    const [Studentclass, setStudentclass] = useState('');
    const [subject, setsubject] = useState('');
    const[year,setYear] = useState('');
    const[month,setMonth] = useState('');
    const[emailValication,setEmailValidation] = useState(false);
  

      
    
   
    

    function sendData(e){
        e.preventDefault();
     
        let data = {
            name:name,
            email:email,
            studentId:studentId,
            Studentclass:Studentclass,
            subject:subject,
            year:year,
            month:month

        }
        // if(name=''){
            
        // }
        //     const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        //     const result = pattern.test(email);
        //     if(result===false){
        //         setEmailValidation(true)
        //      alert('Please check email')
        //     } else{
        //         setEmailValidation(false)
        //       console.log('data',data)

              axios.post( 
                'http://localhost:8065/api/studentInstitute/create',
                data,
               
              ).then(
                  alert("successfully added"),
                  console.log).catch(console.log)
                  .catch(function (error) {
                    console.log(error);
    
                });
            
       
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
        <span className="headerTitleLg">Add Student to Institute</span>
      </div>
      
    </div>
    
        <div className ="container-form">
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
             {emailValication ? <div><p className="error-text">format error</p></div> : null}
                    
                </div>
                <div className="form-group">
                    <label for="studentId">StudentId</label>
                    <input required type="text" className="form-control" id="studentId"  placeholder="Enter StudentId" onChange={(e)=>{
                        setstudentId(e.target.value);
                     }} />
                      
                </div>
                <div className="form-group">
                    <label for="Studentclass">Student class</label>
                    <input required type="number" className="form-control" id="Studentclass"  placeholder="Enter Student class" onChange={(e)=>{
                        setStudentclass(e.target.value);
                     }} />
                     
                    
                </div>
                <div className="form-group">
                    <label for="subject">Subject</label>
                    <input required type="text" className="form-control" id="subject"   placeholder="Enter Subject"
                    
                    onChange={(e)=>{
                        setsubject(e.target.value);
                     }} />
                     <div>
                  
</div>
               
                    
                </div>
                <div className="form-group">
                    <label for="year">Year</label>
                    <input required type="text" className="form-control" id="year"  placeholder="Enter Year" onChange={(e)=>{
                        setYear(e.target.value);
                     }} />
                    
                    
                </div>
               
                <div className="form-group">
                    <label for="month">Month</label>
                    <input required type="text" className="form-control" id="month"  placeholder="Enter month" onChange={(e)=>{
                        setMonth(e.target.value);
                     }} />
                    {/* <Select type="text" className="form-control" id="month"  placeholder="Enter month" onChange={(e)=>{
                        setMonth(e.target.value);
                     }} >
                     <option value="none">None</option>
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
                     
                     </Select> */}
                      
                    
                </div>
                <div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div ref={ref}>
                        <h1>{studentId}</h1>
                        
                        <p>{name}</p>
                        <p>{email}</p>
                        <p>{Studentclass}</p>
                        <p>{month}</p>
                        <p>{year}</p>
                        <p>{subject}</p>
                    </div>
                    <Pdf targetRef={ref} filename="recept.pdf">
                        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
                    </Pdf>
        </div>
      


             
            </Container>
           
            

        </Layout>
    )
}

export default AddStudentToInstitute