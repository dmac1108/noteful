import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './FolderList.css';
import NoteContext from '../NoteContext';



class FolderList extends Component{    
   static contextType = NoteContext;
    getFolder(noteId){
        const note = this.context.notes.filter(note => note.id === noteId);
        console.log(note)
        const folderId = note[0].folderId;
        console.log(folderId)
        return folderId
    }
   
    render(){
    
    
     
    
    const folderId = (!this.props.match.params.noteId) ? null : this.getFolder(this.props.match.params.noteId);
    console.log(folderId);

    const folders = (!folderId)? this.context.folders :
    this.context.folders.filter(folder => folder.id === folderId);
    
       
    const folderList = folders.map(folder => <NavLink activeClassName="active" to={`/folder/${folder.id}`}><li  className="folder" key={folder.id} data-index={folder.id}>{folder.name}</li></NavLink>);
    
    
    
    const goBackButton = (!this.props.match.params.noteId) ? null: <input type='button'  value="Go Back" onClick={()=>this.props.history.goBack()}/>;
    
    return(
        <div className="folder-list">
            
            <div className="folders">
                {goBackButton}
                <ul>
            {folderList}
            </ul>
            </div>
        </div>
    );
    }
}

FolderList.defaultProps ={
    folders: [],
    notePage: false
};

export default FolderList;