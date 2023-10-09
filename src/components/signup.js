
import { useState } from 'react';
import '../css/signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {

        e.preventDefault()
        const newTask = {
            name: name,
            email: email,
            password: password
        };


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

                if (emailExists) {
                    alert(`Email '${email}' already exists.`);
                } else {
                    fetch('https://652016e0906e276284c4046c.mockapi.io/user', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(newTask)
                    }).then(res => {
                        console.log("res>>", res)
                        if (res.ok) {
                            alert(`Signup succesfully.Login to continue`);
                            navigate('/login')
                        }
                    }).then(task => {
                    }).catch(error => {
                    })
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
            });


    }
    return (
        <div className='center-container'>
            <div className="signup-container">
                <div className='signup'>
                    <div>
                        <h2>PET MANAGEMENT</h2>
                        <h2>Signup</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />
                    </div>
                    <div className='loginsignup'>
                        <button type="submit">Signup</button>
                        <button onClick={() => navigate('/login')} type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
