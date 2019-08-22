import React from 'react';  
import tripsService from '../services/trips-service';

import { Redirect } from 'react-router-dom';

import { withFormik, Form, Field } from 'formik';
// import * as Yup from 'yup'

class Popup extends React.Component {  

  state={
    name: '',
    date: '',
    redirect: false
  }

  render() {  
if(this.state.redirect){
  return (<Redirect to='/'/>)
}
    return (  
      
    <div className='popup'>  
      <div className='popup-inner'>  
        <button onClick={this.props.closePopup}><img src='./../../close.png' alt='delete trip'></img></button>  
        <Form className='create-activity' autoComplete="off" redirect={this.state.redirect}>
          <h1>{this.props.text}</h1>
          <section>
            <Field hidden type='text' name='redirect'/>
            <label htmlFor="name">Name</label>
            <Field type='name' name='name' placeholder='Visit Machu Pichu' />
          </section>
          <section>
           <label htmlFor="date">Description</label>
           <Field className='date' type='datetime-local' name='date' />
          </section>
          <button onClick={this.handleSubmit}>Submit</button>
        </Form> 
      </div>  
    </div>  
    );  
  } 
}  

export default withFormik({
  mapPropsToValues({ name, date }) {    
    
    return ({
      name: name || '',
      date: date || '',
    })
  },
  handleSubmit(values, props)  {
    const id = props.props.props.match.params.id
    const name = values.name;
    const date = values.date;    
    tripsService.addActivity({ id, name, date })
    .then (response => {
      window.location.reload();      
    })
    .catch( error => console.log(error) )
  },
})(Popup);