const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'v8uh14n2-W2Mk1DhxJXVZ3kNF46W_PNt2bdhowG0F6Q';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=portrait`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if( imagesLoaded === totalImages) {
        ready = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=portrait`;
        if(!loader.classList.contains('loader-hidden')) {
            loader.classList.add('loader-hidden');
        }
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    // Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create <a> to Link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'

        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>
        item.appendChild(img);

        // Put item inside imageContainer Element
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', function() {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();