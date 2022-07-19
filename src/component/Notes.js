import React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate} from "react-router-dom"
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
const Notes = (props) => {
  const context = useContext(noteContext);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  let navigate= useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')!=null){
      getNotes();
    }
    else{
navigate("/login");
    }
    
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentnote) => {
    ref.current.click();
    setnote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const handleClick = (e) => {

    editNote(note.id, note.etitle, note.edescription, note.etag);
    
    refClose.current.click();
    props.showAlert("Note Updated !!","success") 
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
     

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength="5"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    rows='3'
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength="5"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength="5"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary d-none"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
              disabled ={note.etitle.length<3 || note.edescription.length <5}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    
      <div className="row my-3">
        <h2> Your Notes</h2>
        <div className="container">
          {notes.length === 0 && 'No Notes to Display'}</div>
        {notes.map((note) => {
          return (
            <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
