import React from 'react';  
import tripsService from '../services/trips-service';

import { Redirect } from 'react-router-dom';
import withAuth from './../components/withAuth';

import { withFormik, Form, Field } from 'formik';
// import * as Yup from 'yup'

class PopupUpdate extends React.Component {  

  state={
    name: '',
    date: '',
    country: '',
    activities: [],
    redirect: false,
    id: ''
  }

  componentDidMount() {
    // console.log(this.props);
    console.log(this.props.props.match.params.id);
    
    const id = this.props.props.match.params.id
    tripsService.activitiesList (id)
    .then( (response) => {    
      console.log(response);
       
      this.setState({
        name: response.name,
        country: response.country,
        date: response.date,
        activities: response.activities
      })   
    })
    .catch(error => console.log(error) )
  }

  render() {  
if(this.state.redirect){
  return (<Redirect to='/'/>)
}
    return (  
      
    <div className='popup'>  
      <div className='popup\_inner card'>  
        <button onClick={this.props.closePopup}>X</button>  
        <Form className='create-activity' autoComplete="off" redirect={this.state.redirect}>
          <h1>{this.props.text}</h1>
          {console.log(this.props)}
          <section>
            <label htmlFor="name">Name</label>
            <Field type='name' name='name' value={this.state.name} />
          </section>
          <section>
           <label htmlFor="date">Description</label>
           <Field className='date' type='datetime-local' name='date'  value={this.props.values.date}/>
          </section>
          {/* <section>
            <label htmlFor="Tickets">Description</label>
            <Field type='file' name='tickets' />
          </section> */}
          {/* <section>
            <label htmlFor="price">Description</label>
            <Field type='number' name='price' placeholder='75' />
          </section> */}
          <button onClick={() => this.handleSubmit(this.props)}>Submit</button>
        </Form> 
      </div> 
    </div>  
    );  
  } 
}  

export default withAuth(withFormik({
  mapPropsToValues({ name, date }) {    
    return ({
      name: name || '',
      date: date || '',
    })
  },
  handleSubmit(props)  {
    console.log(props.match.params.id);
    const id = this.props.match.params.id
    const name = props.values.name;
    const date = props.values.date;    
    tripsService.addActivity({ id, name, date })
    .then (response => {
    })
    .catch( error => console.log(error) )
  },
})(PopupUpdate));