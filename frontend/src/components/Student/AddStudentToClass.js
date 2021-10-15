import React, { Component} from 'react'
import Layout from '../../components/Layout'
// import SimpleReactValidator from 'simple-react-validator';
import SimpleReactValidator from "simple-react-validator";
import { Container } from 'react-bootstrap';
import './style.css';
import axios from "axios";
import Select from 'react-select';
import Pdf from "react-to-pdf";
const ref = React.createRef();


const initialState = {
    StudentGroupId: '',
    name:'',
    email: '',
    Studentclass:'', 
    students:[],
    options:[],
    selectedstudent:[],
    classes:[],
    optionscl:[],
    selectedclass:[]
}
class AddStudenttoclass extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onStudentselected = this.onStudentselected.bind(this);
        this.onClassSelected = this.onClassSelected.bind(this);
        this.state = initialState;
        this.validator = new SimpleReactValidator();
    }
    componentDidMount(){
        axios.get('http://localhost:8065/api/studentInstitute/viewall')
        .then(res => {
            this.setState({ students: res.data.data}, () => {
                let data=[];
                this.state.students.map((item,index) => {
                    let student ={
                        value: item._id,
                        label: item.studentId
                    }
                    data.push(student)
                });
                this.setState({ options:data})
            })
        })
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
        // componentDidMount(){
        //     axios.get('http://localhost:8065/api/classschedule/viewall')
        //     .then(res => {
        //         this.setState({ classes: res.data.data}, () => {
        //             let data=[];
        //             this.state.classes.map((item,index) => {
        //                 let classes ={
        //                     value: item._id,
        //                     label: item.name
        //                 }
        //                 data.push(classes)
        //             });
        //             this.setState({ optionscl:data})
        //         })
        //     })
        //     }
   onChange(e) {
     this.setState({ [e.target.name]: e.target.value } )}
     onClassSelected(e){
        this.setState({ selectedclass: e ? e.map(item => item.value) : []});
     }
     onStudentselected(e){
        this.setState({ selectedsub: e ? e.map(item => item.value) : []});
     }
    onSubmit(e) 
    {   

        // if (this.validator.allValid()) {
        //     alert('You submitted the form and stuff!');
        //   } else {
        //     this.validator.showMessages();
        //     // rerender to show messages for the first time
        //     // you can use the autoForceUpdate option to do this automatically`
        //     this.forceUpdate();
        e.preventDefault();
        let studentGroup = {
            StudentGroupId:this.state.StudentGroupId ,
            name:this.state.name,
            email: this.state.email,
            Studentclass: this.state.Studentclass,
            studentid: this.state.selectedsub,
            classid: this.state.selectedclass,
            
        } ;
       
        axios.post('http://localhost:8065/api/studentforclass/create',studentGroup)
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
        <span className="headerTitleLg">Add Student to Class</span>
      </div>
                <div className ="container-form">
               <form onSubmit={this.onSubmit}>
  <div class="form-group">
    <label htmlFor="name">Student Group ID</label>
    <input 
     type="text"
     className="form-control" 
     id="StudentGroupId"
     name="StudentGroupId" 
     value={this.state.StudentGroupId}
     onChange={this.onChange}/>
     {this.validator.message('StudentGroupId', this.state.StudentGroupId, 'required|min:1|max:5',{ className: 'text-danger' })}
  </div>
  <div class="form-group">
    <label for="des">Name</label>
    <input type="test" 
     className="form-control" 
     id="name" 
     name="name" 
     value={this.state.name}
     onChange={this.onChange}
     placeholder="name"/>
      {this.validator.message('name', this.state.name, 'required|alpha',{ className: 'text-danger' })}
  </div>
  <div class="form-group">
    <label for="des">Email</label>
    <input 
     type="text" 
     className="form-control" 
     id="email" 
     name="email" 
     value={this.state.email}
     onChange={this.onChange}
     />
      {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
  </div>
  
  <label htmlFor="name">Student ID</label>
  <Select
  options={this.state.options}
  onChange={this.onStudentselected}
  className="basic-multi-select"
  isMulti/>

<label htmlFor="name">classes ID</label>
  <Select
  options={this.state.optionscl}
  onChange={this.onClassSelected}
  className="basic-multi-select"
  isMulti/>

  
  <div class="form-group">
    <label for="des">Student class</label>
    <input 
     type="Number" 
     className="form-control" 
     id="Studentclass" 
     name="Studentclass" 
     value={this.state.Studentclass}
     onChange={this.onChange}
     />
      {this.validator.message('Studentclass', this.state.Studentclass, 'required|number',{ className: 'text-danger' })}
  </div>
  
  
  
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<div ref={ref}>
                        <h1>{this.state.StudentGroupId}</h1>
                        
                        <p>{this.state.name}</p>
                        <p>{this.state.email}</p>
                        <p>{this.state.Studentclass}</p>
                        <p>{this.state.studentid}</p>
                        <p>{this.state.class}</p>
                        
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
export default AddStudenttoclass;