// const square = (x) =>{
//     return x*x
// }

// const square = (x) => x*x

// console.log(square(3))

// event is a method 
const events = {
    name: 'Birthday Party',
    guestList:['Dammy', 'James', 'John'],
    printGuestList: function (){
        console.log('Guest list for ' + this.name)

        this.guestList.forEach((guest)=>{
            console.log(guest + ' is attending ' + this.name)
        })
    }
}
// arrow function does not bind their own 'this' value


events.printGuestList()