import React from 'react'

const NoteContext= React.createContext({
    notes: [],
    folders: [],
    selectedFolderId: '',
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
    
}

)

export default NoteContext;