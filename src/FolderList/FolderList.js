import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import './FolderList.css';
//import Folder from '../Folder/Folder';

function FolderList(props){
    
    const folderList = props.folders.map(folder => <NavLink activeClassName="active" to={`/folder/${folder.id}`}><li className="folder" key={folder.id}>{folder.name}</li></NavLink>);
    
    const goBackButton = props.notePage === "true" ? <input type='button'  value="Go Back" onClick={()=>props.history.goBack()}/> : null;
    
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

FolderList.defaultProps ={
    folders: [],
    notePage: false
};

export default FolderList;