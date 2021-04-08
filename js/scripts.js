const body = document.querySelector('body')
const h1 = document.querySelector('h1')
h1.classList.add('ready')
setTimeout(() => h1.classList.remove('ready'), 1000)
const modalContainer = document.createElement('div')
body.appendChild(modalContainer)
const gallery = document.querySelector('#gallery')
let profileData = []




// SEARCH
const searchContainer = document.querySelector('.search-container')
const searchHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`
searchContainer.insertAdjacentHTML('beforeend', searchHTML)


//FETCH
fetch('https://randomuser.me/api/?page=1&results=12&seed=abc')
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
        profileData = data.results
        console.log(profileData);
        generateCard(profileData);
        // generateModal(profileData);
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
    const userEmail = card.querySelector('.card-text').textContent
    if (e.target !== parent) {
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

// cards.forEach(card => {
//     card.addEventListener('click', (e) => {
//         console.log(e.target)
//     })
// })

function generateModal(data) {
    const modalHTML = `<div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${data.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="modal-text">${data.email}</p>
        <p class="modal-text cap">${data.location.city}</p>
        <hr>
        <p class="modal-text">${data.phone}</p>
        <p class="modal-text">${data.location.street.number} ${data.location.street.name} , ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
        <p class="modal-text">Birthday: ${data.dob.date.substring(0, 10)}</p>
    </div>
</div>`;
    modalContainer.insertAdjacentHTML('beforeend', modalHTML)
    modalRemove()
}

function modalRemove() {
    const button = document.getElementById('modal-close-btn')
    const modalContainer = document.querySelector('.modal-container')
    button.addEventListener('click', e => {
        console.log('remove me')
        modalContainer.remove()
    })
}














