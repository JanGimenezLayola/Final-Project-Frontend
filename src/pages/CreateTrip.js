import React, { Component } from 'react'
import withAuth from '../components/withAuth';

import tripsService from '../services/trips-service';

// import Redirect from 'react-router-dom'

import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'

class CreateTrip extends Component {
  state = {
    countryArray: ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegowina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', "Cote d'Ivoire", 'Croatia (Hrvatska)', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Malvinas', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'France Metropolitan', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and Mc Donald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran (Islamic Republic of)', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', "Korea, Democratic People's Republic of", 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', "Lao, People's Democratic Republic", 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Türkiye', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zambia', 'Zimbabwe'],
    page1: true,
    page2: false, 
    page3: false,
  }

  handle1 = () => {
    this.setState({ page1: false, page2: true})
  }

  handleBackTo1 = () => {
    this.setState({ page2: false, page1: true})
  }

  handle2 = () => {
    this.setState({ page2: false, page3: true})
  }

  handleBackTo2 = () => {
    this.setState({ page3: false, page2: true})
  }



  render() {
    const { countryArray, page1, page2, page3 } = this.state;
    const open1 = page1 ? 'page1-opened' : 'page-closed';
    const open2 = page2 ? 'page2-opened' : 'page-closed';
    const open3 = page3 ? 'page3-opened' : 'page-closed';
    return (
    <section  className='create-form-main main-splash'>
      <Form id='create-form' className='create-form-container'autoComplete="off" >
        <div className= {`create-form-div ${open1} form-sections`}>
          <button  type='button' onClick={this.props.history.goBack}>Back</button>
          <h2>What's the trip name?</h2>
          {this.props.errors.name && <p className='form-error'>{this.props.errors.name}</p>}
          <Field type='string' name='name' placeholder='Trip name' />
          {this.props.errors.name ? null : <button type='button' onClick={this.handle1}>Next</button>}
          {console.log(this.props.errors.name)}
        </div>
        <div className={`create-form-div ${open2} form-sections`}>
          <button type='button' onClick={this.handleBackTo1}>Back</button>
          <h2>Where are you going?</h2>
          <Field component='select' name='country' placeholder=''>
            {countryArray.map((country) => {
              return (<option value={country}>{country}</option>)
            })}
          </Field> 
          <button type='button' onClick={this.handle2}>Next</button>
        </div>
        <div className={`create-form-div ${open3} form-sections`}>
          <button type='button' onClick={this.handleBackTo2}>Back</button>
          <h2>My adventure start at...</h2>
          <Field type='date' name='date' />
          <button className='submit-button' type='submit'>Create trip</button>
        </div>
      </Form>
      {/* {redirect ? <Redirect to='/'/> : null} */}
    </section>
    )
  }
}

export default withAuth(withFormik({
  mapPropsToValues({ name, country, date, users }) {
    return ({
      name: name || '',
      country: country || '',
      date: date || '',
    })
  },
  
    handleSubmit(values, ...bag)  {
    const name = values.name;
    const country = values.country;
    const date = values.date;
    tripsService.add({ name, country, date })
    .then( (response) => {
      console.log(response, ' --- frontend response')
      return response;
    })
    .catch( error => console.log(error) )
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required('the trip name is required'),
    country: Yup.string()
      .required('country is required'),
    date: Yup.date()
    .required('the date is required')
  }),
})(CreateTrip));
