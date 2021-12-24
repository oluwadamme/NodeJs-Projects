//  A callback function is a function provided to a function as an argument so as to be call back later on.
const add  = (a,b, callback)=>{
    setTimeout(()=>{
        const sum = a + b
        callback(sum)
    }, 2000)

}

add(1,3, (sum)=>{
    console.log(sum)
})