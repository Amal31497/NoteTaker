//const express = require('express');
const fs = require('fs');
//const notesDB = require('../db/db.json')
//const { v4: uuidv4 } = require('uuid');
//const app = express();

module.exports = (app) => {
    
    app.get('/api/notes', (req,res) => {
        fs.readFile('./db/db.json','utf-8',(err,data) => {
            if(err){
                throw err;
            } else{
                res.json(JSON.parse(data))
            }
                
        })
    })

    app.post('/api/notes',(req,res) => {
        let receivedNotes = req.body;
        receivedNotes.id = Date.now().toString();
        
        fs.readFile('./db/db.json','utf-8',(err,data) => {
            if(err){
                throw err;
            }
            var savedNotes = JSON.parse(data)
            savedNotes.push(receivedNotes);
            fs.writeFile('./db/db.json',JSON.stringify(savedNotes, null, 2), (err) => {
                if(err) throw err;
                res.send(savedNotes)
            })
        })
    })
    
    app.delete('/api/notes:id', (req,res) => {
        let deletedNoteId = req.params.id;
        fs.readFile('./db/db.json', 'utf-8', (err,data) => {
            if(err) throw err
            var savedNotes = JSON.parse(data)
            var filteredNotes = savedNotes.splice(savedNotes.findIndex(note => note.id === deletedNoteId),1);

            fs.writeFile('./db/db.json',JSON.stringify(filteredNotes, null, 2), (err) => {
                if(err) throw err;
                res.send(filteredNotes);
            })
        })
    })
}
