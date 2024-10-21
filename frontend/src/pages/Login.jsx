import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1000/api/auth/login', {email, password});
            localStorage.setItem('token', response.data.token); // save token in local storage
            alert('Login Successfull')
            navigate('/home')
        } catch (error) {
            alert('login failed')
            console.log(error)
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login