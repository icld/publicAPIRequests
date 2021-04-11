const body = document.querySelector('body')
const h1 = document.querySelector('h1')
h1.classList.add('ready')
setTimeout(() => h1.classList.remove('ready'), 1000)
// const modalContainer = document.createElement('div')
// body.appendChild(modalContainer)
const gallery = document.querySelector('#gallery')
let profileData = []
let click = 0





// SEARCH
const searchContainer = document.querySelector('.search-container')
const searchHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`
searchContainer.insertAdjacentHTML('beforeend', searchHTML)
const submit = document.querySelector('#search-submit')
const searchInput = document.querySelector('#search-input')

searchContainer.addEventListener('submit', searchFilter)
searchInput.addEventListener('keyup', searchFilter)

function searchFilter() {
    const cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        const cardName = card.querySelector('h3').textContent.toLowerCase()
        const userInput = searchInput.value.toLowerCase()

        if (cardName.includes(userInput) || userInput.length === 0) {
            console.log(`${cardName} is a match with input: ${userInput}`)
            card.style.display = ''
        } else {
            card.style.display = 'none'
        }
    })
}




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

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function generateCard(data) {
    data.forEach(profile => {
        const galleryHTML = `<div class="card">
<div class="card-img-container">
    <img class="card-img" src="${profile.picture.medium}" alt="profile picture">
</div>
<div class="card-info-container">
    <h3 id="name" class="card-name cap">${profile.name.first} ${profile.name.last}</h3>
    <p class="card-text">${profile.email}</p>
    <p class="card-text cap">${profile.location.city}, ${profile.location.state}</p>
</div>
</div>`;
        gallery.insertAdjacentHTML('beforeend', galleryHTML);
        const profileGrab = { profile }
        return profileGrab
    });

}
const galleryCards = document.getElementsByClassName("card card")

gallery.addEventListener('click', e => {
    const parent = gallery
    const card = e.target.closest('.card')


    if (e.target !== parent) {
        click++
        console.log(click)
        const userEmail = card.querySelector('.card-text').textContent
        console.log(card)
        console.log(userEmail)
        profileData.forEach(profile => {
            // const newProf = profile
            if (profile.email === userEmail) {
                console.log(profile)
                generateModal(profile)
            }

        })

    }
})





body.addEventListener('click', e => {
    const prev = document.getElementById('modal-prev-btn')
    const next = document.getElementById('modal-next-btn')
    const cards = document.querySelectorAll('.card')
    const modal = document.querySelector('.modal')
    const modalName = modal.querySelector('.modal-name').textContent.toLowerCase()
    let cardNumber;

    console.log(e.target)
    if (e.target === prev) {
        for (let i = 0; i < cards.length; i++) {
            cardNumber = i;
            console.log(cardNumber)
            const cardName = cards[i].querySelector('#name').textContent.toLowerCase()
            const modalContainer = document.querySelector('.modal-container')

            if (cardName === modalName) {
                if (cardNumber > 2) {
                    modalContainer.remove()
                    generateModal(profileData[cardNumber - 1])
                } else if (cardNumber === 1) {
                    modalContainer.remove()
                    generateModal(profileData[0])
                    document.getElementById('modal-prev-btn').disabled = true
                }
            }


        }
        // else if ()

    }

})






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


function modalHTML(data) {
    const modalHTML = `<div class="modal-container ready">
<div class="modal ready">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${data.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="modal-text">${data.email}</p>
        <p class="modal-text cap">${data.location.city}</p>
        <hr>
        <p class="modal-text">${formatPhone(data.phone)}</p>
        <p class="modal-text">${data.location.street.number} ${data.location.street.name} , ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
        <p class="modal-text">Birthday: ${formatDOB(data.dob.date)}</p>
    </div>
    <div class='modal-bottom-btn-container'>
    <button type="button" id="modal-prev-btn" class="modal-prev-btn">prev</button>
    <button type="button" id="modal-next-btn" class="modal-next-btn">next</button>
   </div>
    </div>`;
    // if (click % 2 == 0) {
    //     const container = document.querySelector('.modal', 'ready')
    //     console.log(container)
    //     container.classList.remove('ready')
    //     container.classList.add('readyDown')
    // }
    return modalHTML
}

function formatPhone(oldPhone) {
    const cleaned = ('' + oldPhone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}

function formatDOB(date) {
    const dob = new Date(date)
    return `${dob.getMonth()}/${dob.getDate()}/${dob.getFullYear()}`
}








