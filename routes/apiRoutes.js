'use strict'
const fs = require('fs');
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
    
    app.delete('/api/notes/:id', (req,res) => {
        var deletedNoteId = req.params.id;
        fs.readFile('./db/db.json', 'utf-8', (err,data) => {
            if(err) throw err
            var savedNotes = JSON.parse(data)
            var filteredNotes = savedNotes.filter(note => note.id !== deletedNoteId);
            console.log(filteredNotes)
            fs.writeFile('./db/db.json',JSON.stringify(filteredNotes, null, 2), (err) => {
                if(err) throw err;
                res.send(filteredNotes);
            })
        })
    })
}
