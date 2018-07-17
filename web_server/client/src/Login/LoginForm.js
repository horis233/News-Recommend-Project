import React from 'react';
import './LoginForm.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router';


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
}) => (
    <div id="login" className='container'>
      <div className="row">
        <br />
        <br />
      <div className='card-panel login-panel col s10 m6 l4 offset-s1 offset-m3 offset-l4'>
        <br />
        <form className="col s12" action="/" onSubmit={onSubmit}>
          <h4 className="center-align">Login</h4>
          {errors.summary && <div className="row"><p className="error-message">{errors.summary}</p></div>}

          <div className="row">
            <div className="demo-info"><font color='green'><b>Demo Account:</b></font>
            <br />
            <i className="fa fa-user-circle-o" aria-hidden="true"> </i> demo@demo.com <br />
            <i className="fa fa-key" aria-hidden="true"> </i> demodemo
            </div>

          </div>



          <div className="row">
            <div className="input-field col s12">
              <input className="validate" id="email" type="email" name="email" onChange={onChange}/>
              <label htmlFor='email'>Email</label>
            </div>
          </div>
          {errors.email && <div className="row"><p className="error-message">{errors.email}</p></div>}
          <div className="row">
            <div className="input-field col s12">
              <input className="validate" id="password" type="password" name="password" onChange={onChange}/>
              <label htmlFor='password'>Password</label>
            </div>
          </div>
          {errors.password && <div className="row"><p className="error-message">{errors.password}</p></div>}
          <div className="row right-align">
            <input type="submit" className="waves-effect waves-light btn indigo lighten-1" value='Log in'/>
          </div>


          <div className="row">
            <p className="right-align"> New to TopNews?  <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
      </div>
      </div>
    </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default LoginForm;
