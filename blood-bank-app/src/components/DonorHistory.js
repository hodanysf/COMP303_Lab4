import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const DonorHistory = () => {
  const { id } = useParams(); // Get donor ID from the URL
  const [history, setHistory] = useState([]);
  const [donorInfo, setDonorInfo] = useState(null); // Optionally fetch donor info
  const navigate = useNavigate();

  // Fetch donor history on component mount
  useEffect(() => {
    API.get(`/donor/history/${id}`)
      .then((response) => setHistory(response.data))
      .catch((error) => console.error("Error fetching history:", error));
  }, [id]);

  // Optionally fetch donor info
  useEffect(() => {
    API.get(`/donor/${id}`)
      .then((response) => setDonorInfo(response.data))
      .catch((error) => console.error("Error fetching donor info:", error));
  }, [id]);

  return (
    <div className="container mt-5">
      <h1>Donor History</h1>
      {donorInfo && (
        <div className="mb-3">
          <h3>
            {donorInfo.firstName} {donorInfo.lastName} - {donorInfo.bloodGroup}
          </h3>
        </div>
      )}

      {history.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Quantity</th>
              <th>Best Before</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.bloodGroup}</td>
                <td>{entry.quantity}</td>
                <td>{new Date(entry.bestBefore).toLocaleDateString()}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No donation history found for this donor.</p>
      )}

      <button className="btn btn-secondary" onClick={() => navigate("/donors")}>
        Back to Donors
      </button>
    </div>
  );
};

export default DonorHistory;
