import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Donor = () => {
  const [donors, setDonors] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle for the form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bloodGroup: "",
  });

  const navigate = useNavigate();

  // Fetch donors
  useEffect(() => {
    API.get("/donor/")
      .then((response) => setDonors(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle form submission for adding a donor
  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/donor/add", formData)
      .then(() => {
        alert("Donor added successfully!");
        setFormData({ firstName: "", lastName: "", bloodGroup: "" }); // Clear the form
        setShowForm(false); // Hide the form after submission
        API.get("/donor/").then((response) => setDonors(response.data)); // Refresh the donor list
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h1>Donors</h1>

      {/* Add Donor Button */}
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Donor
        </button>
      )}

      {/* Add Donor Form */}
      {showForm && (
        <div className="mb-3">
          <h2>Add Donor</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Blood Group</label>
              <input
                type="text"
                className="form-control"
                value={formData.bloodGroup}
                onChange={(e) =>
                  setFormData({ ...formData, bloodGroup: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>{" "}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Donor Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Blood Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor.id}>
              <td>{donor.firstName}</td>
              <td>{donor.lastName}</td>
              <td>{donor.bloodGroup}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/donor/edit/${donor.id}`)}
                >
                  Edit
                </button>{" "}
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => navigate(`/donor/history/${donor.id}`)}
                >
                  View History
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donor;
