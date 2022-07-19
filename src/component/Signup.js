import React, { useState } from 'react'
import {useNavigate} from'react-router-dom'

const Signup = (props) => {
  let navigate= useNavigate();
  const [user, setuser] = useState({ username: '', email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const host = "http://localhost:5000";

    const body = JSON.stringify({
      "name": user.username,
      "email": user.email,
      "password": user.password
    })
    const url = `${host}/api/auth/createuser`;
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
      props.showAlert("Account created successfully","success")
    } else {
      props.showAlert("Invailid Detail","danger")
    }
  }
  const onChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="example">Name</label>
          <input type="text" className="form-control" value={user.username} id="username" name="username" onChange={onChange} placeholder="Enter Name" minLength={3} required />
        </div>
        <div className="form-group">
          <label htmlFor="example">Email address</label>
          <input type="email" className="form-control" value={user.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"minLength={8} required />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name="password" className="form-control" value={user.password} id="password" onChange={onChange} placeholder="Password" minLength={8} required />
        </div>

        <button type="submit" className="btn btn-primary my-3" >Signup</button>
      </form>
    </>
  )
}

export default Signup