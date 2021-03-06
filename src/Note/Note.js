import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import NoteContext from '../NoteContext'
import './Note.css';
import Moment from 'moment';
import PropTypes from 'prop-types';
import config from '../config';

class Note extends Component{

static contextType = NoteContext;

deleteNote = (noteId, callback) => {
  const deleteUrl = `${config.API_ENDPOINT}/api/notes/${noteId}`;
    fetch(deleteUrl,{
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status)
      }
      else {
       console.log(callback)
        callback(noteId)
      }
    })
    .catch(error => console.log(error));
}




render(){

    const {Title, Id, Modified} = this.props;
    return(
        
        <div className="Note">
            <Link to={`/note/${Id}`}><h2>{Title}</h2></Link>
            <p>Date modified on {Moment(Modified).format('Do MMM YYYY')}</p>
            <button onClick={() =>{
                this.deleteNote(Id,this.context.deleteNote);
            }}>Delete</button>
        </div>
        
    );

}
}

Note.propTypes = {
    Title: PropTypes.string.isRequired,
    Id: PropTypes.string.isRequired,
    Modified: PropTypes.string,
};

export default Note;