const form = document.querySelector('form');
const turnsSection = document.getElementById('turns-section')
const input = document.getElementById('input-number')
const checkButton = document.getElementById('check-button')
const restartButton = document.getElementById('restart-button')
const highNumberMessage = document.getElementById('high-number')
const lowNumberMessage = document.getElementById('low-number')
const successNumberMessage = document.getElementById('success-number')
const nombreEssaie = document.getElementById('remaining-number')
const nombreEssaieInitial = document.getElementById('initial-number')
const failureMessage = document.getElementById('failure')
const answer = document.getElementById('answer')

const nombre = Math.floor(Math.random() * (10 - 1 + 1)) + 1
let tour = 0
let tentative = 5

nombreEssaie.innerText = tour
nombreEssaieInitial.innerText = tentative

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const nombreEntree = input.value.trim()
    tentative--
    tour++
    nombreEssaie.innerText = tour
    if (tentative > 0) {
        turnsSection.style.display = "flex"
        if (nombreEntree == nombre) {
            resetDisplay()
            successNumberMessage.style.display = "flex"
            input.classList.add("success")
            input.readOnly = true
            checkButton.disabled = true
            setTimeout(() => {
                checkButton.style.display = "none"
                restartButton.style.display = "block"
            }, 3000)
        } else if (nombreEntree > nombre) {
            resetDisplay()
            setTimeout(() => {
                highNumberMessage.style.display = "flex"
                input.classList.add("error")
            }, 1);
        } else {
            resetDisplay()
            setTimeout(() => {
                lowNumberMessage.style.display = "flex"
                input.classList.add("error")
            }, 1);
        }
    } else {
        resetDisplay()
        failureMessage.style.display = "flex"
        answer.innerText = nombre
        checkButton.disabled = true
        setTimeout(() => {
            checkButton.style.display = "none"
            restartButton.style.display = "block"
        }, 3000)
        input.readOnly = true
    }
})

restartButton.addEventListener('click', () => window.location.reload())

function resetDisplay() {
    successNumberMessage.style.display = "none"
    lowNumberMessage.style.display = "none"
    highNumberMessage.style.display = "none"
    failureMessage.style.display = "none"
    restartButton.style.display = "none"
    input.classList.remove("error")
    input.classList.remove("success")
}