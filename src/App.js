import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';
import FolderList from './FolderList/FolderList';
import NoteContext from './NoteContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ErrorBoundary from './ErrorBoundary/ErroBoundary';
import { withRouter } from "react-router-dom";
import config from './config'

class App extends Component{

  state = {
    folders: [],
    notes: [], 
    error: null,
    
  }

  setData = data =>{
    
    this.setState({
      folders: data.folders,
      notes: data.notes,
      filteredNotes: data.notes,
      error: null
    })
  }


  addFolder = newFolder => {
    const folders = [...this.state.folders,newFolder];
    this.setState({
      folders
    })
  }

  addNote = newNote => {
    const notes = [...this.state.notes,newNote];
    this.setState({
      notes
    })
  }


  deleteNote = NoteId => {
    console.log(NoteId)
    console.log(this.state.notes)
    const newNotes = this.state.notes.filter(note => note.id !== NoteId);
    this.setState({
      notes: newNotes
    });
    this.props.history.push('/');
  }

  
  
  componentDidMount(){
  
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/notes`),
      fetch(`${config.API_ENDPOINT}/api/folders`)
    ])
    .then(([notesRes, foldersRes]) => {
      if(!notesRes.ok) {
        return notesRes.json().then(e => Promise.reject(e));
      }
      if(!foldersRes.ok) {
        return foldersRes.json().then(e => Promise.reject(e));
      }
      return Promise.all([notesRes.json(), foldersRes.json()]);
    })
    .then(([notes, folders]) =>{
      this.setState({notes,folders});
    })
    .catch(error => console.error(error));
  }

  render(){
    
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      
    }
    
    return(
      <div>
      <header>
      <Link to='/'><h1>Noteful</h1></Link>
      </header> 
      <NoteContext.Provider value={contextValue}>
       
      <div className="lists">
      <ErrorBoundary>
      <nav>
        {/*<Route exact path='/' component={FolderList}/>*/}
        <Route exact path='/' component={FolderList}/>
        <Route path='/folder/:folderId' component={FolderList}/>
        <Route path='/note/:noteId' component={FolderList}/>
        <Route path='/newfolder' component={AddFolder}/>
        
      </nav>
      </ErrorBoundary>  
      <ErrorBoundary>
      <main>
      
      <Route exact path='/' component={NoteList}/>
      <Route path='/folder/:folderId' component={NoteList}/>
      <Route path='/note/:noteId' component={NotePage}/>
      <Route path='/newNote' component={AddNote}/>

      </main>
      </ErrorBoundary>
      </div>
      </NoteContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
