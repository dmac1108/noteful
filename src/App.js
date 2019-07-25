import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';
import FolderList from './FolderList/FolderList';
//import Folder from './Folder/Folder';

class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      folders: props.Store.folders,
      notes: props.Store.notes,
      selectedFolderId: null

    };
  }

  getFolderId(note){
    
    let folder = null;
    for(let i=0; i<this.state.notes.length; i++){ 
      if(this.state.notes[i].id === note){
        return folder =this.state.notes[i].folderId;
      }
    }
  }

  render(){
  

    return(
      <div>
      <Link to='/'><h1>Noteful</h1></Link>
      
      <div className="lists">
      <sidebar>
        <Route exact path='/' render={(routeProps) => (<FolderList folders={this.state.folders}/>)}/>

        <Route path='/folder/:folderId' render={(routeProps) => (<div className="lists"><FolderList folders={this.state.folders}/> <NoteList {...routeProps} notes={this.state.notes.filter(note => note.folderId === routeProps.match.params.folderId)}/></div>)}/>
      </sidebar>
      
      <main>
      
      <Route exact path='/' render={(routeProps) => (<NoteList notes={this.state.notes}/>)}/>
      
      <Route path='/note/:noteId' render={(routeProps) =>(<div className="lists"><FolderList {...routeProps} notePage="true" folders={this.state.folders.filter(folder => folder.id === this.getFolderId(routeProps.match.params.noteId))}/><NotePage {...routeProps}/></div>)}/>
      </main>
      </div>
      
      </div>
    );
  }
}

export default App;
