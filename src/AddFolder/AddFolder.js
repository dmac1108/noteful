import React, {Component} from 'react';
import NoteContext from '../NoteContext';
import './AddFolder.css'
import FormValidationError from '../FormValidationError/FormValidationError';

class AddFolder extends Component {
constructor(props){
    super(props);
    this.state={
            id: '',
            name: ''
    };
}

static contextType= NoteContext;

onNameChange(name){
    this.setState({
        name
    })
}

handleCancel = () =>{
    this.props.history.push('/');
}

handleSubmit = (e) => {
    e.preventDefault();
    const postUrl = 'http://localhost:9090/folders';
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
        
       this.context.addFolder(data);
       this.props.history.push('/');
    })
    .catch(error => this.setState({error}))

    
}

validateFolderLength(){
    if(this.state.name.trim().length < 1)
    {
        return "The folder name must be at least one character."
    }
}

render(){
    
    return(
       
        <form className="new-folder" onSubmit={this.handleSubmit}>
            
            <div className="form-block">
                 <label htmlFor="name">Folder Name:</label>
                 <input type="text" name="name" id="name" aria-label="Folder Name" onChange={(e) => this.onNameChange(e.target.value) } />
            </div>
            <FormValidationError message={this.validateFolderLength()} />
            <div className="form-block">
                <button type="submit" disabled={this.validateFolderLength()}>Submit</button>
                <button type="reset" onClick={this.handleCancel}>Cancel</button>
            </div>
           
        </form>
        


    );


}

}

export default AddFolder;