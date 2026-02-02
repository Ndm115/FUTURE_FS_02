import React, { useEffect, useState } from "react";
import API from "../api";
import NoteForm from "../components/NoteForm";

export default function LeadDetails({ lead, onBack }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await API.get(`/leads/${lead.id}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <button onClick={onBack}>← Back to Dashboard</button>
      <h2>{lead.name}</h2>
      <p><strong>Email:</strong> {lead.email}</p>
      <p><strong>Message:</strong> {lead.message}</p>
      <p><strong>Status:</strong> {lead.status}</p>

      <h3>Notes</h3>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.note} <em>({new Date(note.created_at).toLocaleString()})</em>
          </li>
        ))}
      </ul>

      <NoteForm leadId={lead.id} onNoteAdded={fetchNotes} />
    </div>
  );
}
