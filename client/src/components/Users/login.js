//
//
import React, { Component } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/user_actions';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Too Short Bozo !!')
    .required('Required Bozo !!'),
  email: Yup.string().email('Invalid Email').required('Required !!'),
});

class Login extends Component {
  //
  state = {
    success: false,
    validation: false,
  };

  static getDerivedStateFromProps(props, state) {
    const auth = props.user.auth;
    if (auth) {
      return {
        success: auth ? true : false,
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.success) {
      this.props.history.push('/admin');
    }
  }

  render() {
    return (
      <div className="container form_container">
        <h1>Welcome Back</h1>
        <hr />
        <h4>Sign In Here:</h4>
        <Formik
          initialValues={{ email: 'test@test.com', password: 'password123' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            this.props.dispatch(loginUser(values)).then((response) => {
              if (!this.props.user.auth) {
                this.setState({
                  validation: true,
                });
              }
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="twelve columns">
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter Your Email"
                      className="u-full-width"
                    />
                    {errors.email && touched.email ? (
                      <div className="error_label">{errors.email}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="twelve columns">
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter Your Password"
                      className="u-full-width"
                    />
                    {errors.password && touched.password ? (
                      <div className="error_label">{errors.password}</div>
                    ) : null}
                  </div>
                </div>

                <button type="submit">LogIn</button>

                <br />

                {this.state.validation ? (
                  <div className="error_label">
                    Error, please try again bozo
                  </div>
                ) : null}
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
