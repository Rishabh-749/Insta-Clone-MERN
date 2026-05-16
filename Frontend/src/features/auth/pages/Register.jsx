import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router';
import {useAuth} from "../hooks/useAuth";

const Register = () => {

  const {user, loading, handleRegister} = useAuth();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const res = await handleRegister(username, email, password);

    console.log(res);

    navigate("/");
  }

   if(loading){
    return (
      <main>
        <h1>Loading</h1>
      </main>
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={(e)=> setUsername(e.target.value)}
          value={username}
          type="text" name='username' placeholder='Enter Username'/>
          <input onChange={(e)=> setEmail(e.target.value)}
          value={email}
          type="email" name='email' placeholder='Enter Email'/>
          <input onChange={(e)=> setPassword(e.target.value)}
          value={password}
          type="password" name='password' placeholder='Enter Password'/>
          <button>Register</button>

          <p>Already have an account ? <NavLink to={"/login"}>Login to account.</NavLink></p>
        </form>
      </div>
    </main>
  )
}

export default Register
