// client side script to connect to the server web scoket

const socket = io()

// to receive emitted data from the server

// socket.on('countUpdated', (count)=>{
//     console.log('the count has been updated', count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('clicked!!')
//     // sending data fro the client side to the server
//     socket.emit('increment')
// })
const chatForm  = document.querySelector('#message-form')
const message = document.querySelector('input')

chatForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const msgVal = e.target.elements.messageInput.value

    socket.emit('messageSent', msgVal)
   
    socket.on('message', (msg)=>{
        console.log(msg);
    })

    
})
socket.on('message', (msg)=>{
    console.log(msg);
})
