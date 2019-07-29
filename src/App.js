import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';
import FolderList from './FolderList/FolderList';
import NoteContext from './NoteContext';



class App extends Component{

  state = {
    folders: [],
    notes: [], 
    filteredNotes: [],
    error: null,
  }

  getFolderId(note){
    
    let folder = null;
    for(let i=0; i<this.state.notes.length; i++){ 
      if(this.state.notes[i].id === note){
        return folder =this.state.notes[i].folderId;
      }
    }
  }
  setFilteredNotes = (folder) => {
    //console.log(folder)
    const filteredData = this.state.notes.filter(note => note.folderId === folder);
    
    this.setState({
      filteredNotes: filteredData
    })
  }

  setData = data =>{
    this.setState({
      folders: data.folders,
      notes: data.notes,
      filteredNotes: data.notes,
      error: null
    })
  }

  deleteNote = NoteId => {
    const newNotes = this.state.notes.filter(note => note.Id !== NoteId)
    console.log(newNotes);
    this.setState({
      notes: newNotes
    })
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
    .catch(error => this.setState({error}))
  }



  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      filteredNotes: this.state.filteredNotes,
      deleteNote: this.deleteNote,
      updateFilter: this.setFilteredNotes,
    }
    
    return(
      <div>
      <Link to='/'><h1>Noteful</h1></Link>
      <NoteContext.Provider value={contextValue}>
      <div className="lists">
      <sidebar>
        <Route exact path='/' component={FolderList}/>
        <Route path='/folder/:folderId' component={FolderList}/>
        
        <Route path='/note/:noteId' component={FolderList}/>
        
      </sidebar>
      
      <main>
      
      <Route exact path='/' component={NoteList}/>
      <Route path='/folder/:folderId' component={NoteList}/>
      

      <Route path='/note/:noteId' component={NotePage}/>
      </main>
      </div>
      </NoteContext.Provider>
      </div>
    );
  }
}

export default App;
