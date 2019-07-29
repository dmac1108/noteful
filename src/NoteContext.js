import React from 'react'

const NoteContext= React.createContext({
    notes: [],
    folders: [],
    filteredNotes: [],
    updateFilter: () => {},
    deleteNote: () => {},

}

)

export default NoteContext;