import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();


  const host = "http://localhost:5000";

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      "email": credentials.email,
      "password": credentials.password
    })
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    }

    );
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Logged in Successfully","success")
      //redirect
    } else {
        props.showAlert("Invailid Credentials","danger")
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="example">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name="password" className="form-control" value={credentials.password} id="password" onChange={onChange} placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-primary my-3" >Login</button>
      </form>
    </>
  )
}

export default Login