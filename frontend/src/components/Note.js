import React from "react";
import notesStore from "../stores/notesStore";
import "./Note.css"; // Importing CSS file for styling

export default function Note({ note }) {
  const { deleteNote, toggleUpdate } = notesStore();

  const handleDeleteClick = () => {
    deleteNote(note._id);
  };

  const handleUpdateClick = () => {
    toggleUpdate(note);
  };

  return (
    <tr key={note._id}>
      <td>{note.title}</td>
      <td>{note.body}</td>
      <td>
        <button
          className="delete-button"
          onClick={handleDeleteClick}
        >
          Delete note
        </button>
      </td>
      <td>
        <button
          className="update-button"
          onClick={handleUpdateClick}
        >
          Update note
        </button>
      </td>
    </tr>
  );
}
