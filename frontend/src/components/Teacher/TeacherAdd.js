import React, { Component} from 'react'
import Layout from '../Layout'
import { Container } from 'react-bootstrap';
import './style.css';
import axios from "axios";
import Select from 'react-select';
import Pdf from "react-to-pdf";
const ref = React.createRef();


const initialState = {
    teacherId:'',
    name:'',
    email: '',
    contactnumber:'',
    subject:'', 
   grade:'', 
    classes:[],
    optionscl:[],
    selectedclass:[]
}
class AddTeacher extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClassSelected = this.onClassSelected.bind(this);
        this.state = initialState;
    }
    componentDidMount(){
       
        axios.get('http://localhost:8065/api/classschedule/viewall')
        .then(res => {
            this.setState({ classes: res.data.data}, () => {
                let data=[];
                
                this.state.classes.map((item,index) => {
                    let classes ={
                        value: item._id,
                        label: item.ClassId
                    }
                    console.log("classes")
                    console.log(classes)
                    data.push(classes)
                });
                this.setState({ optionscl:data})
            })
        })
        }
   
   onChange(e) {
     this.setState({ [e.target.name]: e.target.value } )}
     onClassSelected(e){
        this.setState({ selectedclass: e ? e.map(item => item.value) : []});
     }
    
    onSubmit(e) 
    {
        e.preventDefault();
        let studentGroup = {
            teacherId:this.state.teacherId ,
            name:this.state.name,
            email: this.state.email,
            contactnumber: this.state.contactnumber,
            grade: this.state.grade,
            subject: this.state.subject,
            classid: this.state.selectedclass,
            
        } ;
       
        axios.post('http://localhost:8065/api/teacher/create',studentGroup)
        .then(res=>{
            alert('added');

            console.log('added');
        })
        .catch(err =>{
          console.log(err);
        })
    }
    render(){
        return(
            <Layout sidebar>
            <Container>
            <div className="header">
            <div className="headerTitles">
        <span className="headerTitleLg">Add Teacher </span>
      </div>
                <div className ="container-form">
               <form onSubmit={this.onSubmit}>
 
  

  <div class="form-group">
    <label for="des">Teacher Id</label>
    <input required type="test" 
     className="form-control" 
     id="teacherId" 
     name="teacherId" 
     value={this.state.teacherId}
     onChange={this.onChange}
     placeholder="teacherId"/>
  </div>

  <div class="form-group">
    <label for="des">Name</label>
    <input required type="test" 
     className="form-control" 
     id="name" 
     name="name" 
     value={this.state.name}
     onChange={this.onChange}
     placeholder="name"/>
  </div>

  <div class="form-group">
    <label for="des">Email</label>
    <input 
     required type="text" 
     className="form-control" 
     id="email" 
     name="email" 
     value={this.state.email}
     onChange={this.onChange}
     placeholder="Email"
     />
  </div>

  <div class="form-group">
    <label for="des">Contact Number</label>
    <input 
     required type="text" 
     className="form-control" 
     id="contactnumber" 
     name="contactnumber" 
     value={this.state.contactnumber}
     onChange={this.onChange}
     placeholder="Contact Number"
     />
  </div>
  
 

<label htmlFor="name">classes ID</label>
  <Select
  options={this.state.optionscl}
  onChange={this.onClassSelected}
  className="basic-multi-select"
  placeholder="Class Id"
  isMulti/>

  
  {/* <div class="form-group">
    <label for="des">Grade</label>
    <input 
     type="text" 
     className="form-control" 
     id="grade" 
     name="grade" 
     value={this.state.grade}
     onChange={this.onChange}
     placeholder="Grade"
     />
     
  </div> */}
   <div class="form-group">
    <label for="des">Grade</label>
    <input 
     type="Number" 
     className="form-control" 
     id="grade" 
     name="grade" 
     value={this.state.grade}
     onChange={this.onChange}
     />
   
  </div>

  <div class="form-group">
    <label for="des">Subject</label>
    <input 
     type="text" 
     className="form-control" 
     id="subject" 
     name="subject" 
     value={this.state.subject}
     onChange={this.onChange}
     placeholder="Subuject"
     />
     
  </div>
  
  
  
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

    <div ref={ref}>
                <h1>Teacher Details</h1>
                        
                <p>{this.state.name}</p>
                <p>{this.state.email}</p>
                <p>{this.state.contactnumber}</p>
                <p>{this.state.subject}</p>
                <p>{this.state.grade}</p>
                        
    </div>
                    <Pdf targetRef={ref} filename="recept.pdf">
                        {({toPdf}) => <button onClick={toPdf}>Capture as PDF</button>}
                    </Pdf>
               
             
               
            </div>
            </div>
            </Container>
           
            

        </Layout>
        )
    }
}
export default AddTeacher;