import React,{useContext} from "react";
import NoteContext from "../contexts/notes/noteContext";

const Noteitem = ({ note ,updateNote ,showAlert}) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  return (
    <div className="col-md-3">
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="bx bx-trash ms-2" style={{fontSize:"26px"}} onClick={()=> {deleteNote(note._id); showAlert("Deleted successfully" ,"success")} }></i>
          <i className="bx bx-edit ms-2" style={{fontSize:"26px"}} onClick={()=> {updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
