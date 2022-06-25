require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

const requestLogger = (request, response, next) => {
  console.log('========================================================')
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('--------------------------------------------------------')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    if (note)
      response.json(note)
    else 
      response.status(404).end()
  }).catch(error => {
    response.status(404).end()
  })
})

/*
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    if (note)
      response.json(note)
    else {
      response.status(400).json({id: request.params.id, error: 'Id not found'}).end()
    }
  }).catch(error => {
    response.status(400).json({
      id: request.params.id,
      error: error.kind === 'ObjectId' ? 'Invalid Id' : error.kind
    }).end()
  })
})
*/

app.delete('/api/notes/:id', (request, response) => {
  Note.deleteOne({_id: request.params.id}).then(deletedNote => {
    response.status(204).end()
  }).catch(error => {
    response.status(204).end()
  })
})

/*
app.delete('/api/notes/:id', (request, response) => {
  Note.deleteOne({_id: request.params.id}).then(deletedNote => {
    response.status(400)
    if (deletedNote.acknowledged && deletedNote.deletedCount === 0)
      response.json({id: request.params.id, error: 'Id not found'}).end()
  }).catch(error => {
    response.status(400).json({
      id: request.params.id,
      error: error.kind === 'ObjectId' ? 'Invalid Id' : error.kind
    }).end()
  })
})
*/

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})