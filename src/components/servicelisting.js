// src/ServiceListing.js
import React, { useState } from 'react';
import "../css/servicelisting.css"

function ServiceListing() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ serviceName: '', price: '' });
  const [showTableHeadings, setShowTableHeadings] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    serviceName: '',
    price: '',
  });

  const addService = () => {
    const errors = {};

    if (!newService.serviceName) {
        errors.serviceName = 'Please Enter Service Name';
      }
      if (!newService.price) {
        errors.price = 'Please Enter Price';
      }
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    setServices([...services, newService]);
    setNewService({ serviceName: '', price: '' });


    if (!showTableHeadings) {
        setShowTableHeadings(true);
      }
  };

  const deleteService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
    if (updatedServices.length === 0) {
        setShowTableHeadings(false);
      }
  };

  return (
    <div  className="pet-management-container">
      <h3>Service Listing</h3>
      <div className="input-container">
        <input
          type="text"
          placeholder="Service Name"
          value={newService.serviceName}
        onChange={(e) => {
            setNewService({ ...newService, serviceName: e.target.value });
            setValidationErrors({ ...validationErrors, serviceName: '' });
          }}

        />
        {validationErrors.serviceName && (
          <p className="error">{validationErrors.serviceName}</p>
        )}
        <input
          type="text"
          placeholder="Price"
          value={newService.price}
        onChange={(e) => {
            setNewService({ ...newService, price: e.target.value });
            setValidationErrors({ ...validationErrors, price: '' });
          }}
        />
         {validationErrors.price && (
          <p className="error">{validationErrors.price}</p>
        )}
        <button onClick={addService}>Add Service</button>
      </div>

{/* {showTableHeadings && ( */}
        <table className="pet-list">
          <thead>
            <tr>
              <th>ServiceName</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td>{service.serviceName}</td>
                <td>{service.price}</td>
                
                <td>
                <button onClick={() => deleteService(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* )} */}
      
    </div>
  );
}

export default ServiceListing;
