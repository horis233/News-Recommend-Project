import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import './SignupForm.css';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="container">
    <div className="card-panel signup-panel">
      <form className="col s12">
        <h4 className="center-align">Sign Up</h4>
        {errors.summary && <div className="row"><p className="error-message">{errors.summary}</p></div>}
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" name="email" className="validate" onChange={onChange}/>
            <label htmlFor="email">Email</label>
          </div>
        </div>
        {errors.email && <div className="row"><p className="error-message">{errors.email}</p></div>}
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" name="password" className="validate" onChange={onChange}/>
            <label htmlFor="password">Password</label>
          </div>
        </div>
        {errors.password && <div className="row"><p className="error-message">{errors.password}</p></div>}
        <div className="row">
          <div className="input-field col s12">
            <input id="confirm_password" type="password" name="confirm_password" className="validate" onChange={onChange}/>
            <label htmlFor="confirm_password">Conform Password</label>
          </div>
        </div>
        { errors.auth && <div className="warning row"> Server: {errors.auth} </div> }
        { errors.network && <div className="warning row"> {errors.network} </div> }
        <div className="row">
          {/* TODO: disable button if form is invalid */}
          <a className="waves-effect btn float-right" onClick={onSubmit}>
            Sign Up
          </a>
        </div>
        <div className="row">
          <p className="right-align"> Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
