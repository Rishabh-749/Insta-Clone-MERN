import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router';
import {useAuth} from "../hooks/useAuth";

const Login = () => {

  const {user, loading, handleLogin} = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const res = await handleLogin(username, password);
    console.log(res.user);

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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={(e)=> setUsername(e.target.value)}
          type="text" name='username' placeholder='Enter Username'/>
          <input onChange={(e)=> setPassword(e.target.value)}
          type="password" name='password' placeholder='Enter Password'/>
          <button>Login</button>

          <p>Don't have an account ? <NavLink to={"/register"}>Create One.</NavLink></p>
        </form>
      </div>
    </main>
  )
}

export default Login