// node mongo.js <password>

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://root:${password}@cluster0.pdjwt.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const notes = [
    {
        content: "HTML is easy",
        important: true
    },
    {
        content: "Browser can execute only Javascript",
        important: false
    },
    {
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

const saveNote = async(note) => {
    return await note.save()
} 

//count = 0
let savingNotes = []
notes.forEach(noteInfo => {
    noteInfo.date = new Date()
    let note = new Note(noteInfo)  

    var time = new Date();
    console.log('------------------------------------------------------------------------------------------------')
    console.log('Time: ', time);
    time.setSeconds(time.getSeconds() + 10);
    let saving = true
    savingNotes.push(note._id)
    console.log('Saving note: ', note)
    console.log('Saving Notes: ', savingNotes)
    
    let newNote = note.save().then(result => {
        //console.log('Cleaning Timeout')
        //clearTimeout(timeoutId)
        //count++
        console.log('------------------------------------------------------------------------------------------------')
        console.log('Saved Note: ', note)
        console.log('Filtering from Saving Notes')
        savingNotes = savingNotes.filter(id => {
            console.log('id: ', id, ' / _id', note._id, id === note._id ? ' *** Match ***' : '')
            return (id !== note._id)
        })
        console.log('Saving Notes: ', savingNotes)

        if (savingNotes.length === 0) {
            console.log('------------------------------------------------------------------------------------------------')
            console.log('List of Notes')
            Note.find({}).then(result => {
                console.log("Notes:")
                result.forEach(note => {
                    console.log(note)
                })
                console.log('Closing conection')
                mongoose.connection.close()
            })           
        }
    })
    
    //let newNote = saveNote(note)
    /*
    while (newNote !== note && new Date().getTime() < time.getTime() ) {
        console.log("waiting: ", newNote)
    }
    
    console.log('newNote: ', newNote)
    if (newNote !== note) {
        console.log('Timeout error!!!')
        mongoose.connection.close()
        process.exit(1)
    }
    */

    
})



