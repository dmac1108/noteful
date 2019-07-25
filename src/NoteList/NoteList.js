import React from 'react';
import {Route} from 'react-router-dom';
import './NoteList.css';
import Note from '../Note/Note';

function NoteList(props){
  
  const notelist = props.notes.map(note => <li key={note.id}><Note Id={note.id} Folder={note.folderId} Title={note.name} Modified={note.modified} Content={note.content}/></li>)  ;
  return(
      <div className="note-list">
          <ul>
          {notelist}
          </ul>
      </div>
  );

}

NoteList.defaultProps ={
    notes: [],
    
};

export default NoteList;