
// //const fs = require('fs');
const notes = require('./notes.js'); // To import your module add './'
// const validator = require('validator');

// //const utils = require('./utils.js');

// //fs.writeFileSync('notes.txt','This file is new\n')
// //fs.appendFileSync('notes.txt',"I'm appending a new text line\n")
// msg = getNotes()
// console.log(msg)

// console.log(validator.isEmail('dammy@gmail.com'))
 // This package is used for styling your response
// succ = chalk.inverse.green('Success')
// console.log(succ)

// Process is used to access command line argumemt into your script

// if (command == 'add') {
//     console.log('Adding Note')
// } else if(command == 'remove') {
//     console.log('Removing Note')
// } else{
//     console.log('Nothing is done')
// }
const yargs = require('yargs')
const command = process.argv
const chalk = require('chalk');
const { argv } = require('yargs');
// console.log(command)


// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
       title: {
           describe: "Note title",
           demandOption:true,
           type:'string',
       },
       body:{
           describe:'Note body',
           demandOption:true,
           type:'string'
       }
    },
    handler: function(argv){
        // console.log(chalk.green('Title: '+argv.title))
        // console.log(chalk.blue('Body: '+argv.body))
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder:{
        title: {
            describe: "Note title",
            demandOption:true,
            type:'string',
        }
     },
    handler: function(argv){
        notes.removeNote(argv.title)
        //console.log('Removing a note...')
    }
})

// Create read command
yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title: {
            describe: "Note title",
            demandOption:true,
            type:'string'
        }
     },
    handler:function(argv){
        if (argv.title.length ===0||argv.title === ' ' ) {
            notes.readNotes(argv.title)
        } else {
            notes.readNotes(argv.title)
        }
        
    }
}) 

// Create list command
yargs.command({
    command:'list',
    describe:'list notes',
    handler:function(){
      notes.listNotes()
    }
}) 

yargs.parse() // To print out the argument in the console
//console.log(yargs.argv)