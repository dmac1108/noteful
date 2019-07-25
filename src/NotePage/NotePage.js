import React from 'react';
import Note from '../Note/Note.js';
import STORE from '../dummy-store';

function NotePage(props){
    const note = STORE.notes.find(note => note.id === props.match.params.noteId);
    
    return(

        <div>
            <Note Title={note.name} Modified={note.modified}></Note>
            <article>{note.content}</article>
        </div>

    );


}

export default NotePage;