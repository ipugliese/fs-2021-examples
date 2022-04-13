import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Note from './components/Note'
import noteService from './services/notes.js'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService.getAll()
      .then(notes => {
        setNotes(notes)
      })

  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked - target: ', event.target)

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(createdNote => {
        console.log(createdNote)
        setNotes(notes.concat(createdNote))
        setNewNote("")
      })
  }

  const handleNoteChange = (event) => {
    console.log('Note change - target: ', event.target)
    console.log('Note change - target.value: ', event.target.value)

    setNewNote(event.target.value) 
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    noteService
      .update(id, {...note, important: !note.important})
      .then(updatedNote => {
        setNotes(notes.map(note => note.id === id ? updatedNote : note))
        console.log(`importance of ${id} needs to be toggled`)
      })
      .catch(error => {
        alert(`the note ${note.content} does not exist in the server`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

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
          notesToShow.map(note => 
            <Note 
              key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
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