import React, {Component} from 'react';
import NoteContext from '../NoteContext';
import './AddNote.css';
import FormValidationError from '../FormValidationError/FormValidationError';



class AddNote extends Component {
   constructor(props){
       super(props);
       this.state={
           id: '',
           name: '',
           modified: '',
           folderId: '',
           content: '',
       };
   }

   static contextType= NoteContext;
    

    onNameChange(name){
        this.setState({
            name
        });
    }

    onFolderChange(folderId){
        this.setState({
            folderId
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


    validateFolderSelection(){
        console.log(this.state.folderId);
        if(this.state.folderId === ''){
            console.log("no folder");
            return "Please select a folder";
        }
    }

    validateNoteLength(){
        if(this.state.name.trim().length < 1)
        {
            return "The note name must be at least one character."
        }
    }

handleSubmit = (e) => {
    e.preventDefault();
    const postUrl = 'http://localhost:9090/notes';
    fetch(postUrl,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(this.state),
    })
    .then(res => {
        console.log(res)
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
        const options = this.context.folders.map(folder => <option value={folder.id}>{folder.name}</option>)
        //Add a Select Value option to the beginning of the options arry
        const selectOptions = [<option value=""></option>, ...options];
        console.log(selectOptions);

        return(
            <form id="noteInput" className="new-note" onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Note Name:</label>
                    <input type="text" name="name" id="name" onChange={(e)=>this.onNameChange(e.target.value)} />
                </div>
                <div className="validation"><FormValidationError message={this.validateNoteLength()}/></div>
                <div className="input-group">
                    <label htmlFor="folder">Folder:</label>
                    <select id="folder" onChange={(e)=>this.onFolderChange(e.target.value)}>
                        {selectOptions}
                    </select>
                </div>
                <div className="validation"><FormValidationError message={this.validateFolderSelection()}/></div>
                <div className="input-group">
                    <label htmlFor="content">Content:</label>
                    <textarea form="noteInput" name="content" id="content" rows="5" onChange={(e)=>this.onContentChange(e.target.value)}/>
                </div>
                <div>
                    <button type="submit" disabled={this.validateFolderSelection() || this.validateNoteLength()}>Submit</button>
                    <button type="reset" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
          

        );

    }

}



export default AddNote;