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
    const newNotes = this.state.notes.filter(note => note.id !== NoteId);
    this.setState({
      notes: newNotes
    });
    this.props.history.goBack();
  }

  
  
  componentDidMount(){
    const url = "http://localhost:9090/db";
    fetch(url)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(this.setData)
    .catch(error => console.log(error))
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
