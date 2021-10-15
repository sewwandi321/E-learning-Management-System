import React, { Component} from 'react'
import Layout from '../../components/Layout'
import SimpleReactValidator from 'simple-react-validator';
import axios from "axios";
import Select from 'react-select';
import Pdf from "react-to-pdf";
import './style.css';
const ref = React.createRef();


const initialState = {
    feesId: 0,
    email: '',
    amount:0, 
    year:'',
    month:'',
    subjects:[],
    options:[],
    selectedsub:[]
   
}
class AddSalary extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubjectSelected = this.onSubjectSelected.bind(this);
        this.state = initialState;
        this.validator = new SimpleReactValidator();
    }
    componentDidMount(){
        axios.get('http://localhost:8065/api/teachers/view')
        .then(res => {
            this.setState({ subjects: res.data.data}, () => {
                let data=[];
                this.state.subjects.map((item,index) => {
                    let subject ={
                        value: item._id,
                        label: item.name
                    }
                    data.push(subject)
                });
                this.setState({ options:data})
            })
        })
       
    }
   onChange(e) {
     this.setState({ [e.target.name]: e.target.value } )}
     
     onSubjectSelected(e){
        this.setState({ selectedsub: e ? e.map(item => item.value) : []});
     }
    onSubmit(e) 
    {
        // if (this.validator.allValid()) {
        //     // alert('You submitted the form and stuff!');
        //   } else {
        //     this.validator.showMessages();
        //     // rerender to show messages for the first time
        //     // you can use the autoForceUpdate option to do this automatically`
        //     this.forceUpdate();
        e.preventDefault();
        let course = {
            salaryId:this.state.feesId ,
            email: this.state.email,
            amount: this.state.amount,
            year: this.state.year, 
            month: this.state.month,
            studentid: this.state.selectedsub,
           
            
        } ;
        console.log(course);
        axios.post('http://localhost:8065/api/salary/create',course)
        .then(res=>{
            alert('Successfuly added');
            console.log('added');
        })
        .catch(err =>{
          console.log(err);
        })
    
}
    render(){
        return(
            <Layout sidebar>
            
                <h2>
                    Add New Salary
                </h2>
                <div className="container-form">  
                <form onSubmit={this.onSubmit}>
  <div class="form-group">
    <label htmlFor="name">Salary ID</label>
    <input 
     type="text"
     className="form-control" 
     id="feesId"
     name="feesId" 
     value={this.state.feesId}
     onChange={this.onChange}/>
    {this.validator.message('FessId', this.state.feesId, 'required|min:1|max:5',{ className: 'text-danger' })}
  </div>
  <label htmlFor="name">Teacher ID</label>
  <Select
  options={this.state.options}
  onChange={this.onSubjectSelected}
  className="basic-multi-select"
  isMulti/>



  <div class="form-group">
    <label for="des">Email</label>
    <input 
     type="text" 
     className="form-control" 
     id="email" 
     name="email" 
     placeholder="Enter Email"
     value={this.state.email}
     onChange={this.onChange}
     />
     {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
  </div>
  <div class="form-group">
    <label for="des">Amount</label>
    <input type="Number" 
     className="form-control" 
     id="amount" 
     name="amount" 
     value={this.state.amount}
     onChange={this.onChange}
     placeholder="amount"/>
      {this.validator.message('amount', this.state.amount, 'required|number',{ className: 'text-danger' })}
  </div>
  <div class="form-group">
    <label for="des">Month</label>
    <input 
     type="text" 
     className="form-control" 
     id="des" 
     placeholder="Enter Month"
     name="month" 
     value={this.state.month}
     onChange={this.onChange}
     
     />
     {this.validator.message('month', this.state.month, 'required',{ className: 'text-danger' })}
      <div class="form-group">
    <label for="des">Year</label>
    <input 
     type="text" 
     className="form-control" 
     id="des" 
     name="year" 
     placeholder="Enter Year"
     value={this.state.year}
     onChange={this.onChange}
     />
       {this.validator.message('year', this.state.year, 'required|number')}
     </div>
  </div>
  
  
  
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

             <div ref={ref}>
                        <h1>{this.state.feesId}</h1>
                        <p>{this.state.selectedsub}</p>
                        <p>{this.state.amount}</p>
                        <p>{this.state.email}</p>
                        <p>{this.state.month}</p>
                    </div>
                    <Pdf targetRef={ref} filename="recept.pdf">
                        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
                    </Pdf>


                </div>
               
           
          
           
            

        </Layout>
        )
    }
}
export default AddSalary;