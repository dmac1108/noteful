import React from 'react';
import { Link} from 'react-router-dom';
import NoteContext from '../NoteContext'
import './Note.css';


function deleteNote(noteId, callback){
 
  const deleteUrl = `http://localhost:9090/notes/${noteId}`;
    fetch(deleteUrl,{
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    })
    .then(res => {
        console.log(res)
      if(!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data =>{
        
        callback(noteId)
    })
    .catch(error => this.setState({error}))
}


function Note(props){
    return(
        <NoteContext.Consumer>
            {(context)=>(
        <div className="Note">
            <Link to={`/note/${props.Id}`}><h2>{props.Title}</h2></Link>
            <p>Date modified on {props.Modified}</p>
            <button onClick={() =>{
                deleteNote(props.Id,context.deleteNote)
            }}>Delete</button>
        </div>
        )}
        </NoteContext.Consumer>
    );
}

export default Note;