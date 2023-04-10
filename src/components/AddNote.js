import React, { useContext, useState } from "react";
import NoteContext from "../contexts/notes/noteContext";

const AddNote = ({showAlert}) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    showAlert("Note addedd successfully" ,"success")
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div  style={{marginTop:"33px"}}>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              value={note.title}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onchange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Deescription
            </label>
            <input
              value={note.description}
              type="text"
              className="form-control"
              onChange={onchange}
              id="descriptioin"
              name="description"
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              value={note.tag}
              type="text"
              className="form-control"
              onChange={onchange}
              id="tag"
              name="tag"
            />
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
