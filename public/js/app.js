console.log("Client side js file loaded.");


// Asynchronous calls
// fetch('http://localhost:3000/weather?address=mussorrie').then((res) => {
//     res.json().then((data) => {
//         if(data.error)
//             console.log(data.error);
//         else
//             console.log(data);
            
//     })
// })

const weatherForm = document.querySelector("form")
const search  = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    if(!location){
        console.log('Please Enter a valid location.');
        messageOne.textContent = "Please Enter a valid location."
        messageTwo.textContent = ""
    }
    else{
        const url = '/weather?address=' + location;
        fetch(url).then((res) => {
            res.json().then((data) => {
                if(data.error){
                    console.log(data.error);
                    messageOne.textContent = data.error
                    messageTwo.textContent = ""
                }
                else{
                    console.log(data);
                    messageOne.textContent = "The current temperature is " + data.Data.CurrentTemp + ". The chances of precipitation are " + data.Data.PrecipitationChance + "%."
                    messageTwo.textContent = "The location you have searched for is "+data.Location
                }
                    
            })
        })
    }
    // console.log(location);
})