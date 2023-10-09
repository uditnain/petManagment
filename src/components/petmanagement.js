// src/PetManagement.js
import React, { useEffect, useState } from 'react';
import "../css/petmanagement.css"

import { useNavigate } from 'react-router-dom';

function PetManagement() {
    const [pets, setPets] = useState([]);
    const [newPet, setNewPet] = useState({ petName: '', customerName: '', email: '' });
    const [showTableHeadings, setShowTableHeadings] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        petName: '',
        customerName: '',
        email: '',
    });
    const [petData, setPetData] = useState([])

    const petDataList =  () => {
         fetch("https://652016e0906e276284c4046c.mockapi.io/petManagment", {
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
                console.log("petdata>>>", data);
                setPetData(data)
            })
            .catch(error => {
                console.error('Fetch Error:', error);
            });
    }

    useEffect(() => {


        petDataList()

    }, [])



    const addPet = () => {


        const errors = {};

        if (!newPet.petName) {
            errors.petName = 'Please Enter Pet Name';
        }

        if (!newPet.customerName) {
            errors.customerName = 'Please Enter Customer Name';
        }

        if (!newPet.email) {
            errors.email = 'Please Enter Email';
        } else if (!isValidEmail(newPet.email)) {
            errors.email = 'Invalid Email Format';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const data = {
            petName: newPet.petName,
            customerName: newPet.customerName,
            email: newPet.email
        }

        fetch('https://652016e0906e276284c4046c.mockapi.io/petManagment', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => {
            console.log("res>>", res)
            if (res.ok) {
                petDataList()

            }
        }).then(task => {

        }).catch(error => {
        })

        setNewPet({ petName: '', customerName: '', email: '' });
        if (!showTableHeadings) {
            setShowTableHeadings(true);
        }

    };

    const deletePet = (id, index) => {

        fetch(`https://652016e0906e276284c4046c.mockapi.io/petManagment/${id}`, {
            method: 'Delete',
            headers: { 'content-type': 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert("Deleted SucessFully")
                petDataList()
            })
            .catch(error => {
                console.error('Fetch Error:', error);
            });
    };
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    return (
        <div className="pet-management-container">
            <h3>Pet Management</h3>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Pet Name"
                    value={newPet.petName}
                    onChange={(e) => {
                        setNewPet({ ...newPet, petName: e.target.value });
                        setValidationErrors({ ...validationErrors, petName: '' });
                    }}

                />

                {validationErrors.petName && (
                    <p className="error">{validationErrors.petName}</p>
                )}
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={newPet.customerName}
                    onChange={(e) => {
                        setNewPet({ ...newPet, customerName: e.target.value });
                        setValidationErrors({ ...validationErrors, customerName: '' });
                    }} />
                {validationErrors.customerName && (
                    <p className="error">{validationErrors.customerName}</p>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={newPet.email}
                    onChange={(e) => {
                        setNewPet({ ...newPet, email: e.target.value });
                        setValidationErrors({ ...validationErrors, email: '' });
                    }}
                />
                {validationErrors.email && (
                    <p className="error">{validationErrors.email}</p>
                )}
                <button onClick={addPet}>Add Pet</button>

            </div>
            {/* {showTableHeadings && ( */}
            <table className="pet-list">
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {petData?.map((pet, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    <td>{pet.petName}</td>
                                    <td>{pet.customerName}</td>
                                    <td>{pet.email}</td>
                                    <td>
                                        <button onClick={() => deletePet(pet.id, index)}>Delete</button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}

                </tbody>
            </table>
            {/* )} */}
        </div>
    );
}

export default PetManagement;
