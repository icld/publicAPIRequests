/* Ian Cameron Lyles 
ian@icldesign.com
Treehouse Full Stack Javascript Techdegree 
Unit 5 project 
Public API Requests */

//  animate h1
const h1 = document.querySelector('h1')
h1.classList.add('ready')
setTimeout(() => h1.classList.remove('ready'), 1000)

// html for card creation
function galleryHTML(profile) {
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
    return galleryHTML
}

// html for modal creation 
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

    return modalHTML
}

// html for search creation 
const searchHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input ready" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`


// html for error message
const errorHTML = `<div class="error-message">
<strong style="font-size:100px">No Users Found &#129409</strong>
</div>`