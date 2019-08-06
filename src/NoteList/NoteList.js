import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NoteContext from '../NoteContext';
import './NoteList.css';
import Note from '../Note/Note';
import PropTypes from 'prop-types';


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
          <Link to='/newNote'>Add Note</Link>
      </div>
    
  );
  }
}

NoteList.defaultProps ={
    notes: [],
    
};

NoteList.propTypes ={
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string
  }))
}

export default NoteList;