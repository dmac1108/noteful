import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './Folder.css';
import STORE from '../dummy-store';

function Folder(props){
    
    const folder = STORE.folders.find(folder => folder.id === props.match.params.folderId);
    
    return(
        <div className="folder">
            
            <h2>{folder.name}</h2>
        </div>
    );
}

export default withRouter(Folder);