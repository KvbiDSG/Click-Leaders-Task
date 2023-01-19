const firstName = document.querySelector('#name')
const surname = document.querySelector('#surname')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const registerBtn = document.querySelector('.register')
const popup = document.querySelector('.popup')
const checkbox = document.querySelector('#checkbox')
const letters = /[a-z]/i;
const bigLetters = /[A-Z]/i;
const numbers = /[0-9]/;
const special = /[!@#$%^&*()]/;


const showError = (input, msg) => {

    const formBox = input.parentElement
    const errorMsg = formBox.querySelector('.error-text')


    formBox.classList.add('error')
    errorMsg.textContent = msg
}

const clearError = input => {
    const formBox = input.parentElement
    formBox.classList.remove('error')
}



const checkForm = (input) => {
    input.forEach(el => {
        if(el.value === '') {
            showError(el, el.placeholder)
        } else {
            clearError(el)
        }      
    });
}

const checkLength = (input, min) => {
    if(input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków`)
    }
}

const checkMail = email => {
    const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email.value)) {
    clearError(email);
    } else {
    showError(email, 'Email jest niepoprawny!');
    }
}

const checkPassword = (input) => {
    if(password.value.match(letters) && password.value.match(numbers) && password.value.match(bigLetters) && password.value.match(special)) {
        clearError(password)
    } else {
        showError(password, 'Hasło musi zawierać znaki specjalne, małą i dużą literę, oraz cyfrę')
    }
}

const checkError = () => {
    const allInputs = document.querySelectorAll('.form-box')
    let errorCount = 0

    allInputs.forEach(el => {
        if(el.classList.contains('error')) {
            errorCount++
        }
    })

    if(errorCount === 0) {
        popup.classList.add('show-popup')
    }
}

function enable() {
    if(checkbox.checked){
        registerBtn.removeAttribute("disabled")
        registerBtn.classList.remove('unchecked')
    } else {
        registerBtn.disabled="true"
        registerBtn.classList.add('unchecked')
        
    }
}

registerBtn.addEventListener('click', (e) => {
    e.preventDefault()
    checkForm([firstName, surname, email, password])
    checkLength(firstName, 3)
    checkLength(password, 7)
    checkMail(email)
    checkPassword(password)
    checkError()
    isChecked()
})