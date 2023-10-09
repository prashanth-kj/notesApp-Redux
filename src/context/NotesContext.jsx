import React from 'react'
export const notesDataContest=React.createContext(null)
function NotesContext({children}) {
      const API_URL='https://651666a009e3260018c9b7e2.mockapi.io/notes'
  return (
      <notesDataContest.Provider  value={{API_URL}}>
        {children}
      </notesDataContest.Provider>
  )
}

export default NotesContext