import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note added !!","success")
    setnote({ title: "", description: "", tag: "" })
  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control"  id="description" name="description" onChange={onChange} rows={3} value={note.description}/>
          </div>
          <div className='mb-3'>
            <label className="form-label">Tag</label>
            <input type="text" className='form-control' id="tag" name="tag" onChange={onChange} value={note.tag}/>
          </div>
          <button disabled ={note.title.length<3 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>  </div></>
  )
}

export default Addnote;