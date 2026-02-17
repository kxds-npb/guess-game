const form = document.querySelector('form');
const input = document.getElementById('input-number')
const checkButton = document.getElementById('check-button')
const highNumberMessage = document.getElementById('high-number')
const lowNumberMessage = document.getElementById('low-number')
const successNumberMessage = document.getElementById('success-number')
const nombreEssaie = document.getElementById('try-number')
const nombreEssaieRestant = document.getElementById('remaining-number')
const failure = document.getElementById('failure')
const answer = document.getElementById('answer')

const nombre = Math.floor(Math.random() * (10 - 1 + 1)) + 1
let tour = 0
let tentative = 5

nombreEssaie.innerText = tour
nombreEssaieRestant.innerText = tentative

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const nombreEntree = input.value.trim()
    tentative--
    tour++
    nombreEssaie.innerText = tour
    nombreEssaieRestant.innerText = tentative
    if (tentative > 0) {
        if (nombreEntree == nombre) {
            successNumberMessage.style.display = "flex"
            lowNumberMessage.style.display = "none"
            highNumberMessage.style.display = "none"
            input.classList.remove("error")
            input.classList.add("success")
            checkButton.disabled = true
            input.readOnly = true
        } else if (nombreEntree > nombre) {
            highNumberMessage.style.display = "flex"
            lowNumberMessage.style.display = "none"
            input.classList.add("error")
        } else {
            lowNumberMessage.style.display = "flex"
            highNumberMessage.style.display = "none"
            input.classList.add("error")
        }
    } else {
        failure.style.display = "flex"
        answer.innerText = nombre
        checkButton.disabled = true
        input.readOnly = true
        successNumberMessage.style.display = "none"
        lowNumberMessage.style.display = "none"
        highNumberMessage.style.display = "none"
    }
})