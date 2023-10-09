
import React, { useState } from 'react';
import "../css/login.css"

import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("https://652016e0906e276284c4046c.mockapi.io/user", {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); 
            })
            .then(data => {
                console.log("data>>>", data);
                const emailExists = data.some(user => user.email === email);
                console.log("emailExists>>", emailExists)
                if (emailExists) {

                    const passExists = data.some(user => user.password === password);
                    if (passExists) {
                        const foundUser = data.find(user => user.email === email);
                        localStorage.setItem("user", JSON.stringify(foundUser))
                        alert(`Login Suceesfully`);
                        navigate('/dashboard')
                    } else {
                        alert(`Incorrect Password.`);
                    }
                } else {
                    alert(`Email '${email}' does not exist.`);
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
            });
    }
    return (
        <div className='center-container'>
            <div className="login-container">
                <div className='login'>
                    <div>
                        <h2>PET MANAGEMENT</h2>
                        <h2>Login</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />
                    </div>
                    <div className='loginsignup'>
                        <button type="submit">Login</button>
                        <button onClick={() => navigate('/')} type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
