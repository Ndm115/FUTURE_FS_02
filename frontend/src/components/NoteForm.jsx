import React, { useState } from "react";
import API from "../api";

export default function NoteForm({ leadId, onNoteAdded }) {
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/leads/${leadId}/notes`, { note });
      setNote("");          
      onNoteAdded();        
    } catch (err) {
      console.error(err);
      alert("Failed to add note");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Add a follow-up note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ padding: "5px", width: "70%" }}
        required
      />
      <button type="submit" style={{ padding: "5px 10px", marginLeft: "5px" }}>
        Add Note
      </button>
    </form>
  );
}
