import create from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: null,

  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  fetchNotes: async () => {
    try {
      const res = await axios.get("http://localhost:3000/notes");
      set({ notes: res.data.notes });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      createForm: {
        ...state.createForm,
        [name]: value,
      },
    }));
  },

  createNote: async (e) => {
    e.preventDefault();
    try {
      const { createForm, notes } = notesStore.getState();
      const res = await axios.post("http://localhost:3000/notes", createForm);
      set({
        notes: [...notes, res.data.note],
        createForm: {
          title: "",
          body: "",
        },
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  },

  deleteNote: async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${_id}`);
      set((state) => ({
        notes: state.notes.filter((note) => note._id !== _id),
      }));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  },

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        [name]: value,
      },
    }));
  },

  toggleUpdate: ({ _id, title, body }) => {
    set({
      updateForm: {
        title,
        body,
        _id,
      },
    });
  },

  updateNote: async (e) => {
    e.preventDefault();
    try {
      const { updateForm, notes } = notesStore.getState();
      const res = await axios.put(`http://localhost:3000/notes/${updateForm._id}`, {
        title: updateForm.title,
        body: updateForm.body,
      });
      const updatedNoteIndex = notes.findIndex((note) => note._id === updateForm._id);
      if (updatedNoteIndex !== -1) {
        const newNotes = [...notes];
        newNotes[updatedNoteIndex] = res.data.note;
        set({
          notes: newNotes,
          updateForm: {
            _id: null,
            title: "",
            body: "",
          },
        });
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  },
}));

export default notesStore;
