import React, {Component} from 'react';
import Note from '../Note/Note.js';
import NoteContext from '../NoteContext';
import './NotePage.css';
import PropTypes from 'prop-types';



class NotePage extends Component{
    static contextType = NoteContext;
    
    render(){
        const note = this.context.notes.find(note => note.id == this.props.match.params.noteId) || {content: ''};
        
    return(
        
        <div>
            <Note Id={note.id} Title={note.name} Modified={note.modified} ></Note>
            <article>{note.content}</article>
        </div>
    
    );

    }
}

Note.propTypes ={
    notes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string,
      folderId: PropTypes.string.isRequired,
      content: PropTypes.string
    }))
  }
  
export default NotePage;