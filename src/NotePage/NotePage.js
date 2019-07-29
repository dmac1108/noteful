import React, {Component} from 'react';
import Note from '../Note/Note.js';
import NoteContext from '../NoteContext';


    class NotePage extends Component{
        static contextType = NoteContext;
        
        render(){
            const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
            
                
    return(
        
        <div>
            <Note Title={note.name} Modified={note.modified}></Note>
            <article>{note.content}</article>
        </div>
      
    );

        }
}


export default NotePage;