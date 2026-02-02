import React, { useEffect, useState } from "react";
import API from "../api";
import LeadDetails from "./LeadDetails";
import "../App.css"; // for styling

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch leads. Make sure you are logged in.");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/leads/${id}/status`, { status });
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  if (selectedLead) {
    return (
      <LeadDetails
        lead={selectedLead}
        onBack={() => setSelectedLead(null)}
      />
    );
  }

  return (
    <div className="dashboard">
      <h2>Leads Dashboard</h2>
      <p className="lead-count">Total Leads: {leads.length}</p>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No leads yet.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.message}</td>

                  <td>
                    <span className={`status ${lead.status}`}>
                      {lead.status}
                    </span>
                  </td>

                  <td className="actions">
                    <button
                      className="btn-view"
                      onClick={() => setSelectedLead(lead)}
                    >
                      View
                    </button>

                    <select
                      className="status-select"
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value)
                      }
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
