console.log("client side file is loaded");

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});


// fetch('http://api.weatherstack.com/current?access_key=5f3307759bba80193ce3828b0336bcb1&query=buxar&units=f').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log("error is ", data.error);
//         } else {
//             console.log(data.location);
//         }
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    messageOne.textContent = "loading.......";
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.errorMessage) {
                console.log("error is ", data.errorMessage);
                messageOne.textContent = data.errorMessage;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
})
