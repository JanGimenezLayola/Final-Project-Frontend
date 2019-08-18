import React from 'react';  
import tripsService from '../services/trips-service';


import { withFormik, Form, Field } from 'formik';
// import * as Yup from 'yup'

class Popup extends React.Component {  

  state={
    name: '',
    date: ''
  }

  componentDidMount() {
    console.log('id -------> ', this.props);
    
  }

  render() {  
    return (  
    <div className='popup'>  
      <div className='popup\_inner card'>  
        <button onClick={this.props.closePopup}>X</button>  
        <Form className='create-activity' autoComplete="off">
          <h1>{this.props.text}</h1>
          <section>
            <label htmlFor="name">Name</label>
            <Field type='name' name='name' placeholder='Visit Machu Pichu' />
          </section>
          <section>
           <label htmlFor="date">Description</label>
           <Field className='date' type='date' name='date' />
          </section>
          {/* <section>
            <label htmlFor="Tickets">Description</label>
            <Field type='file' name='tickets' />
          </section> */}
          {/* <section>
            <label htmlFor="price">Description</label>
            <Field type='number' name='price' placeholder='75' />
          </section> */}
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
    console.log(props.props.props.match.params.id)
    const id = props.props.props.match.params.id
    const name = values.name;
    const date = values.date;
    tripsService.addActivity({ id, name, date })
    // console.log(id, name, date )
  
    .catch( error => console.log(error) )
  },
})(Popup);