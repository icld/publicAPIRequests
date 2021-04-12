/* Ian Cameron Lyles 
ian@icldesign.com
Treehouse Full Stack Javascript Techdegree 
Unit 5 project 
Public API Requests */

const body = document.querySelector('body')
const gallery = document.querySelector('#gallery')
let profileData = []
const searchContainer = document.querySelector('.search-container')
searchContainer.insertAdjacentHTML('beforeend', searchHTML)
const searchInput = document.querySelector('#search-input')


// EVENT LISTENERS
searchContainer.addEventListener('submit', searchFilter)
searchInput.addEventListener('keyup', searchFilter)
body.addEventListener('click', handleModalBtns)
gallery.addEventListener('click', handleCardClick)

//FETCH
fetch('https://randomuser.me/api/?results=12')
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
        profileData = data.results
        console.log(profileData);
        generateCard(profileData);
    })
    .catch(error => console.log('Looks like there was a problem', error))


// FUNCTIONS
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function generateCard(data) {
    data.forEach(profile => {
        gallery.insertAdjacentHTML('beforeend', galleryHTML(profile));
    });
}

function searchFilter() {
    removeError()
    const cards = document.querySelectorAll('.card')
    let blankCard = 0
    cards.forEach(card => {
        const cardName = card.querySelector('h3').textContent.toLowerCase()
        const userInput = searchInput.value.toLowerCase()

        if (cardName.includes(userInput) || userInput.length === 0) {
            card.style.display = ''
        } else {
            card.style.display = 'none'
            blankCard += 1
        }
        if (blankCard === 12) {
            body.insertAdjacentHTML('beforeend', errorHTML)
            h1.textContent = 'Whoopsy!'
        }
    })
}

function removeError() {
    if (body.textContent.includes('No Users Found')) {
        const errorMessage = document.querySelector('.error-message')
        errorMessage.remove()
        h1.textContent = 'AWESOME STARTUP EMPLOYEE DIRECTORY'
    }
}

function handleCardClick(e) {
    const parent = gallery
    const card = e.target.closest('.card')
    if (e.target !== parent) {
        const userEmail = card.querySelector('.card-text').textContent
        profileData.forEach(profile => {
            if (profile.email === userEmail) {
                console.log(profile)
                generateModal(profile)
                if (profile === profileData[0]) {
                    document.getElementById('modal-prev-btn').disabled = true
                }
                if (profile === profileData[11]) {
                    document.getElementById('modal-next-btn').disabled = true
                }
            }
        })
    }
}

function handleModalBtns(e) {
    if (gallery.nextElementSibling.className === 'modal-container') {
        const prev = document.getElementById('modal-prev-btn')
        const next = document.getElementById('modal-next-btn')
        const cards = document.querySelectorAll('.card')
        const modal = document.querySelector('.modal')
        const modalName = modal.querySelector('.modal-name').textContent.toLowerCase()
        let cardNumber;

        if (e.target === prev) {
            makePrevModal()
        }
        else if (e.target === next) {
            makeNextModal()
        }

        function makePrevModal() {
            for (let i = 0; i < cards.length; i++) {
                cardNumber = i;
                const cardName = cards[i].querySelector('#name').textContent.toLowerCase()
                const modalContainer = document.querySelector('.modal-container')
                if (cardName === modalName) {
                    if (cardNumber > 1) {
                        modalContainer.remove()
                        generateModal(profileData[cardNumber - 1])
                    } else if (cardNumber === 1) {
                        modalContainer.remove()
                        generateModal(profileData[0])
                        document.getElementById('modal-prev-btn').disabled = true
                    }
                }
            }
        }

        function makeNextModal() {
            for (let i = 0; i < cards.length; i++) {
                cardNumber = i;
                const cardName = cards[i].querySelector('#name').textContent.toLowerCase()
                const modalContainer = document.querySelector('.modal-container')
                if (cardName === modalName) {
                    if (cardNumber < 10) {
                        modalContainer.remove()
                        generateModal(profileData[cardNumber + 1])
                    } else if (cardNumber === 10) {
                        modalContainer.remove()
                        generateModal(profileData[11])
                        document.getElementById('modal-next-btn').disabled = true
                    }
                }
            }
        }
    }
}

function generateModal(data) {
    gallery.insertAdjacentHTML('afterend', modalHTML(data))
    showModal()
    modalRemove()

}

function showModal() {
    const modal = document.querySelector('.modal')
    const container = document.querySelector('.modal-container')
    container.style.display = 'block'
    setTimeout(() => modal.classList.remove('ready'), 200)
    setTimeout(() => container.classList.remove('ready'), 200)
}

function modalRemove() {
    const button = document.getElementById('modal-close-btn')
    const modalContainer = document.querySelector('.modal-container')
    const modal = document.querySelector('.modal')
    button.addEventListener('click', e => {
        modal.classList.add('ready')
        modalContainer.classList.add('ready')
        setTimeout(() => modalContainer.remove(), 300)
    })
}

function formatPhone(oldPhone) {
    const cleaned = ('' + oldPhone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    // return null;
}

function formatDOB(date) {
    const dob = new Date(date)
    return `${dob.getMonth()}/${dob.getDate()}/${dob.getFullYear()}`
}









