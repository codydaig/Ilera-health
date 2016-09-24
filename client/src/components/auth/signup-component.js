import _ from 'lodash';
import axios from 'axios';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Please enter your username'
  }
  if (!values.password) {
    errors.password = 'Password required'
  }
  if (!values.phone) {
    errors.phone = 'Please re-type your password'
  }
  return errors
}

class SignupForm extends Component {

	onSubmit = (props) => {
		console.log(props);
		axios.post('/api/user/signup', props)       
	}

	renderField = ({ input, label, type, meta: { touched, error } }) => {
		return(
			<div key={label}>
				<label>{label}</label>
				<input {...input} placeholder={label} type={type} />
				<div className='formErrors'>
					{ touched && error && <span>{error}</span> }
				</div>
			</div>
		)
	}

	render() {
		const { error, handleSubmit, pristine, reset, submitting } = this.props;

		return (
			<div>
				<h2>Sign Up</h2>
				<form onSubmit={ handleSubmit(props => this.onSubmit(props)) }>
					<Field name="userType" component="select">
						<option></option>
						<option value="Patient">Patient</option>
						<option value="Provider">Provider</option>
					</Field>
					<Field name="first" type="text" component={this.renderField} label="First"/>
					<Field name="last" type="text" component={this.renderField} label="Last"/>
					<Field name="email" type="text" component={this.renderField} label="Email"/>
					<Field name="password" type="password" component={this.renderField} label="Password"/>
					<Field name="reTypePassword" type="password" component={this.renderField} label="Re-Type Password"/>
					{error && <strong>{error}</strong>}
					<button type='submit' className='btn'>Next</button>
				</form>
			</div>
		);
	}   
};

// user types...recorded on application state
export default reduxForm({
	form: 'SignupForm',
	validate
}, null, {  })(SignupForm);