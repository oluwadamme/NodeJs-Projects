const fs = require('fs');
const chalk = require('chalk');

const addNote = function(title,body){
    const _notes = loadNotes()
    // const duplicateNotes = _notes.filter(function (note){
    //     return note.title===title
    // }) // This returns an array of duplicate notes

    debugger // this stops the code at this point and you can use the debug tools to solve your problem
            // this is activated by running 'node inspect app.js'

    const duplicateNote = _notes.find((note)=>note.title === title) // this returns the first duplicate match.

    if (!duplicateNote) {
        _notes.push({
            title: title,
            body: body
        })
        saveNote(_notes)
        console.log(chalk.inverse.blue('New note added'))
        
    } else {
        
        console.log(chalk.inverse.red('Note title already exist'))
    }
        
}

const removeNote = function(title){
    
    const _notes = loadNotes()
    const _newNotes = _notes.filter(function (note){
        return note.title!=title
    })

    if (_newNotes.length != 0) {
        saveNote(_newNotes)
        console.log('Note title removed')
    } else {
        console.log('Note title doesnt exist ')
      
    }
}

const saveNote = function(note){
    const dataJSON = JSON.stringify(note)
    fs.writeFileSync('./notes.json',dataJSON)
}

const loadNotes = function(){
    try {
        const _dataJSON  = fs.readFileSync('./notes.json').toString()
        return JSON.parse(_dataJSON)
    } catch (error) {
        return []
    }
}

const listNotes = ()=>{
    const _notes = loadNotes()
    console.log(chalk.green('Your notes: ')) 
    _notes.forEach(note => {
        console.log(note.title)
    });
}

const readNotes = (title)=>{
    const _notes = loadNotes()
    if (title.length ===0 || title === ' '){
        const readNote = _notes
        readNote.forEach((note)=>{console.log('Title: '+chalk.blue(note.title))
        console.log('Body: '+note.body)} )
        
    }else{
    const readNote = _notes.find((note)=>note.title === title) // this returns the first duplicate match.
    if (readNote) {
        console.log('Title: '+chalk.blue(readNote.title))
        console.log('Body: '+readNote.body)
    } else {
        console.log(chalk.inverse.red('Note does not exist'))
    }
    }
    
}



module.exports = {
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNotes:readNotes
}