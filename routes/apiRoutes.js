const notesDB = require("../db/db.json")
const fs = require("fs")
const util = require("util")

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)
const { v4: uuidv4 } = require('uuid')

module.exports = app => {

    app.get("/api/notes", (req, res) => {

        const getNotes = readFileAsync("./db/db.json", "utf8")
        const retrieved = getNotes.then(notes => {return JSON.parse(notes)})
        retrieved.then(notes => res.json(notes))
        .catch((err) => res.json(err))


    })

    app.post("/api/notes/", (req, res) => {

        const { title, text } = req.body
        const newNote = {title, text, id: uuidv4()}
        const getNotes = readFileAsync("./db/db.json", "utf8")

        return getNotes.then(notes => {

            let noteAdd = [...JSON.parse(notes)]
            noteAdd.push(newNote)
            return writeFileAsync("./db/db.json", JSON.stringify(noteAdd))

        })

        .then(() => newNote)
        .then(notes => res.json(notes))
        .catch((err) => res.json(err))

    })

    app.delete("/api/notes/:id", (req, res) => {

        const getNotes = readFileAsync("./db/db.json", "utf8")
        return getNotes.then(notes =>{

            const noteDel = [...JSON.parse(notes)]
            const delNotes = noteDel.filter(note => note.id != req.params.id)
            return writeFileAsync("./db/db.json", JSON.stringify(delNotes))

        })
        .then(() => res.sendStatus(200))
        .catch((err) => res.json(err))

    })

}