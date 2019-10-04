import React, {Component} from 'react';
import NoteContext from '../NoteContext';
import './AddNote.css';
import FormValidationError from '../FormValidationError/FormValidationError';
import Moment from 'moment';
import config from '../config';


class AddNote extends Component {
   constructor(props){
       super(props);
       this.state={
           id: '',
           name: '',
           modified:  Moment(new Date()).format,
           folderid: '',
           content: '',
       };
   }

   static contextType= NoteContext;
    

    onNameChange(name){
        this.setState({
            name
        });
    }

    onFolderChange(folderid){
        console.log(folderid)
        this.setState({
            folderid
        });
    }

    onContentChange(content){
        this.setState({
            content
        });
    }

    handleCancel = () =>{
        this.props.history.push('/');
    }

    validateNoteLength(){
        if(this.state.name.trim().length < 1)
        {
            return "The note name must be at least one character."
        }
    }

handleSubmit = (e) => {
    e.preventDefault();
    const postUrl = `${config.API_ENDPOINT}/notes`;
    fetch(postUrl,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(this.state),
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data =>{
        
       this.context.addNote(data);
       this.props.history.push('/');
    })
    .catch(error => this.setState({error}))

    
}
  

    render(){
        const options = this.context.folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)
        
        return(
            <form id="noteInput" className="new-note" onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Note Name:</label>
                    <input type="text" name="name" id="name" onChange={(e)=>this.onNameChange(e.target.value)}
                    aria-required="true" aria-label="Enter the Note Name" aria-describedby="nameValidation" />
                </div>
                <div id="nameValidation" className="validation"><FormValidationError message={this.validateNoteLength()}/></div>
                <div className="input-group">
                    <label htmlFor="folder">Folder:</label>
                    <select id="folder" onChange={(e)=>this.onFolderChange(e.target.value)} aria-required="true" aria-label="Select the Folder for the Note" value={this.state.folderid} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT">Choose a folder</option>
                        {options}
                    </select>
                </div>
                
                <div className="input-group">
                    <label htmlFor="content">Content:</label>
                    <textarea form="noteInput" name="content" id="content" rows="5" onChange={(e)=>this.onContentChange(e.target.value)}/>
                </div>
                <div>
                    <button type="submit" disabled={this.validateNoteLength()}>Submit</button>
                    <button type="reset" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
          

        );

    }

}



export default AddNote;