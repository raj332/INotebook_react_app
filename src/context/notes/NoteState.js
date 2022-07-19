import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
const host ="http://localhost:5000"
var notesInitial=[];
  const [notes, setnotes] = useState(notesInitial);
 
  const getNotes = async () => {
    const url=`${host}/api/notes/fetchallnotes` ;

    const response = await fetch(url,{
        method :'GET',
        headers : {
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token'),

        }
    })
    const json = await response.json();
    
    setnotes(json)
   
  };
  const addNote = async (title, description, tag) => {
    const url=`${host}/api/notes/addnote`;

    let response= await fetch(url,{
        method :'POST',
        headers : {
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token'),

        },
        body : JSON.stringify({title ,description ,tag})
    })
    const note = await response.json();
    console.log( "Response note :", note);
    setnotes(notes.concat(note));
    console.log("In addnote");
  };
  const deleteNote = async (id) => {
    const url=`${host}/api/notes/deletenote/${id}`;

     await fetch(url,{
        method :'DELETE',
        headers : {
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token'),

        }
    })
    // const json =response.json();
    // console.log(json);
    const newNotes = notes.filter((note) => {
    return note._id !== id;
    });
    setnotes(newNotes);
  };
  const editNote = async (id, title, description, tag) => {

    const url=`${host}/api/notes/updatenote/${id}`;
    await fetch(url,{
        method :'PUT',
        headers : {
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token'),

        },
        body : JSON.stringify({title ,description ,tag})
    });
    // const json =response.json();
    // console.log(json)
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
      }
    }
    getNotes();
  };
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, setnotes ,getNotes}}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
