
import React, { useEffect, useState } from 'react';
import "../css/dashboard.css"
import PetManagement from './petmanagement';
import ServiceListing from './servicelisting';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const [sidebar, setsidebar] = useState("pet")
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {

        const user = localStorage.getItem("user")
        console.log("user", JSON.parse(user))
        if (user == null) {
            alert("Please Login to continue")
            navigate('/login')
        } else {
            const id= JSON.parse(user).id
            console.log("id",id)
            fetch(`https://652016e0906e276284c4046c.mockapi.io/user/${id}`, {
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
                    console.log("userdata>>>", data);
                    setUserData(data)
                })
                .catch(error => {
                    console.error('Fetch Error:', error);
                });
        }
    }, [])



    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/')
    }
    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div>
                    <h2>Hello {userData?.name} </h2>
                </div>
                <ul>
                    <li onClick={() => setsidebar("pet")}> PET MANAGEMENT</li>
                    <li onClick={() => setsidebar("service")}>SERVICE LISTING</li>
                    <li onClick={handleLogout}>LOGOUT</li>

                </ul>
            </div>
            <div className="main-content">
                {sidebar == "pet" &&
                    <PetManagement />
                }
                {sidebar == "service" &&
                    <ServiceListing />
                }
            </div>
        </div>
    );
}

export default Dashboard;
