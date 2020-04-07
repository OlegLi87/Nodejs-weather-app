const formElement = document.querySelector('form')
const url = 'http://localhost:3000/weather-api'

const errorParagraph = document.getElementById('error')
const dataParagraph = document.getElementById('data')

formElement.addEventListener('submit', (e) => {
    e.preventDefault() // prevents reloading of the page
    const inputElement = formElement.childNodes[1]
    const location = inputElement.value

    dataParagraph.textContent = ''
    errorParagraph.innerHTML = ''

    fetch(url + `?location=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.hasOwnProperty('error')) errorParagraph.appendChild(document.createTextNode(data.error))
            else dataParagraph.appendChild(document.createTextNode(data.location + ' : ' + data.response))
        })
    })
})