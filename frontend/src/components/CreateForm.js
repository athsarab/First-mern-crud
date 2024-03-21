import React from "react";
import notesStore from "../stores/notesStore";
import "./CreateForm.css"; // Importing CSS file for styling

export default function CreateForm() {
  const store = notesStore();

  if (store.updateForm._id) return <></>;

  return (
    <div className="create-form-container">
      <h2 className="create-form-heading">Create note</h2>
      <form className="create-form" onSubmit={store.createNote}>
        <input
          onChange={store.updateCreateFormField}
          value={store.createForm.title}
          name="title"
          placeholder="Enter title"
        />
        <textarea
          onChange={store.updateCreateFormField}
          value={store.createForm.body}
          name="body"
          placeholder="Enter body"
        />
        <button type="submit">Create note</button>
      </form>
    </div>
  );
}
