let tentative = 0
let nombreMax = 0

function enregistrerInfos(nombreTentatives, nombreMaximal) {
    tentative = nombreTentatives
    nombreMax = nombreMaximal
    localStorage.setItem('tentative', tentative)
    localStorage.setItem('nombreMax', nombreMax)
    window.location.href = "game.html"
}

if (document.getElementById('facile') || document.getElementById('intermediaire') || document.getElementById('difficile')) {
    document.getElementById('facile').addEventListener('click', () => enregistrerInfos(3, 10))
    document.getElementById('intermediaire').addEventListener('click', () => enregistrerInfos(4, 50))
    document.getElementById('difficile').addEventListener('click', () => enregistrerInfos(5, 100))
}

if (document.getElementById('input-number') || document.getElementById('check-button')) {
    let tentative = localStorage.getItem('tentative')
    const nombreMax = localStorage.getItem('nombreMax')

    const form = document.querySelector('form');
    const turnsSection = document.getElementById('turns-section')
    const input = document.getElementById('input-number')
    const checkButton = document.getElementById('check-button')
    const menuButton = document.getElementById('menu-button')
    const restartButton = document.getElementById('restart-button')
    const highNumberMessage = document.getElementById('high-number')
    const lowNumberMessage = document.getElementById('low-number')
    const successNumberMessage = document.getElementById('success-number')
    const nombreEssaie = document.getElementById('remaining-number')
    const essaieInitialBas = document.getElementById('initial-number-down')
    const essaieInitialHaut = document.getElementById('initial-number-up')
    const failureMessage = document.getElementById('failure')
    const answer = document.getElementById('answer')
    const maxNum = document.getElementById('max-num')
    const nombrePrecedent = document.getElementById('previous-number')
    const messageNombrePrecedent = document.getElementById('previous-number-message')

    const nombre = Math.floor(Math.random() * (nombreMax - 1 + 1)) + 1
    let tour = 0
    maxNum.innerText = nombreMax
    nombreEssaie.innerText = tour
    essaieInitialBas.innerText = tentative
    essaieInitialHaut.innerText = tentative

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const nombreEntree = input.value.trim()
        tentative--
        tour++
        nombreEssaie.innerText = tour
        nombrePrecedent.innerText = nombreEntree
        messageNombrePrecedent.style.display = "block"
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
                menuButton.style.display = "block"
            }, 3000)
        } else
            if (tentative > 0) {
                if (nombreEntree > nombre) {
                    resetDisplay()
                    clearInput()
                    setTimeout(() => {
                        highNumberMessage.style.display = "flex"
                        input.classList.add("error")
                    }, 1);
                } else {
                    resetDisplay()
                    clearInput()
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
                    menuButton.style.display = "block"
                }, 3000)
                input.readOnly = true
            }   
    })

    restartButton.addEventListener('click', () => window.location.reload())
    menuButton.addEventListener('click', () => window.location.href = "index.html")

    function resetDisplay() {
        successNumberMessage.style.display = "none"
        lowNumberMessage.style.display = "none"
        highNumberMessage.style.display = "none"
        failureMessage.style.display = "none"
        restartButton.style.display = "none"
        menuButton.style.display = "none"
        input.classList.remove("error")
        input.classList.remove("success")
    }

    function clearInput() {
        input.value = ''
    }
}