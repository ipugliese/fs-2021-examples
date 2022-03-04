import React, { useState, useEffect } from 'react';
import Note from './components/Note'

import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("add a new Note ...")
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios.get('http://localhost:3001/notes').then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })  
  }
  useEffect(hook, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked - target: ', event.target)

    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    setNotes(notes.concat(noteObject))
    setNewNote("add a new Note ...")
  }

  const handleNoteChange = (event) => {
    console.log('Note change - target: ', event.target)
    console.log('Note change - target.value: ', event.target.value)

    setNewNote(event.target.value) 
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {
          notesToShow.map(
            note => <Note key={note.id} note={note} />
          )
        }
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App