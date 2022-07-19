import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
  const context = useContext(noteContext)
  const{deleteNote}=context;
  
    const {note,updateNote,showAlert} = props;
  return (
    <div className='col-md-3 my-3'>
<div className="card" >
  <div className="card-body m-2">
    <div className='d-flex justify-content-between'>
    <h4 className="card-title ">{note.title}</h4>
    <div className='h4'>
    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); showAlert("Note Deleted !!","success")}}></i>
    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
    </div>
   
    </div>
    
    <p className="card-text">{note.description}</p>
   
  </div>
</div>
    </div>
  )
}

export default Noteitem