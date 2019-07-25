import React from 'react';
import { Link} from 'react-router-dom';
import './Note.css';

function Note(props){
    return(
        <div className="Note">
            <Link to={`/note/${props.Id}`}><h2>{props.Title}</h2></Link>
            <p>Date modified on {props.Modified}</p>
        </div>
    );
}

export default Note;