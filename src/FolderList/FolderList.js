import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import './FolderList.css';
import '../AddFolder/AddFolder';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';



class FolderList extends Component{    
   static contextType = NoteContext;
    getFolder(noteId){
        const note = this.context.notes.find(note => note.id === noteId) || {content: ''};
        const folderId = note.folderId;
        
        
        return folderId
    }
   
    render(){
    
    const folderId = (!this.props.match.params.noteId) ? null : this.getFolder(this.props.match.params.noteId);
    
    const folders = (!folderId)? this.context.folders :
    this.context.folders.filter(folder => folder.id === folderId);
    
     
    const folderList = folders.map(folder => <li  className="folder" key={folder.id} data-index={folder.id}><NavLink key={folder.id} activeClassName="active" to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>);
    
    const goBackButton = (!this.props.match.params.noteId) ? null: <input type='button'  value="Go Back" onClick={()=>this.props.history.goBack()}/>;

    
    
    return(
        <div className="folder-list">
            
            <div className="folders">
                {goBackButton}
                <ul>
            {folderList}
            </ul>
            {(!this.props.match.params.noteId) ?  <Link to="/NewFolder">Add Folder</Link>: <></>}
            </div>
        </div>
    );
    }
}

FolderList.defaultProps ={
    folders: [],
};

FolderList.propTypes ={
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired,
      }))
}

export default FolderList;