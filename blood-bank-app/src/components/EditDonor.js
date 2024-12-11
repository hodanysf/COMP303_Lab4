import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const EditDonor = () => {
  const { id } = useParams(); // Get donor ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bloodGroup: '',
  });

  // Fetch donor details
  useEffect(() => {
    API.get(`/donor/${id}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`/donor/update/${id}`, formData)
      .then(() => {
        alert('Donor updated successfully!');
        navigate('/donors'); // Redirect back to donor list
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h1>Edit Donor</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Blood Group</label>
          <input
            type="text"
            className="form-control"
            value={formData.bloodGroup}
            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditDonor;
