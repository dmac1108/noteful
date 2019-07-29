import React, {Component} from 'react';

import NoteContext from '../NoteContext';
import './NoteList.css';
import Note from '../Note/Note';


class NoteList extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = NoteContext;
  
  
    render(){
    
  const {folderId } = this.props.match.params;
  const { notes=[]} = this.context
  
  const filteredNotes = (!folderId) ? notes : notes.filter(note => note.folderId === folderId);
  
  const notelist = filteredNotes.map(note => <li key={note.id}><Note Id={note.id} Folder={note.folderId} Title={note.name} Modified={note.modified} Content={note.content}/></li>)  ;
  return(
    
    
      <div className="note-list">
          <ul>
          {notelist}
          </ul>
      </div>
    
  );
  }
}

NoteList.defaultProps ={
    notes: [],
    
};

export default NoteList;