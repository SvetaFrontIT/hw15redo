// Интерфейс разделен на две части. В левой части пользователь видит список альбомов. 

// Когда пользователь нажмет на какой-то альбом в правой части он увидит фотографии 
//из этого альбома. Их берем из https://jsonplaceholder.typicode.com/photos?albumId=ID где вместо ID подставляем id нужного альбома.

// Сразу при загрузке приложения и получения списка альбомов, в правой части нужно показать фотографии из первого альбома в списке

const albumsList = document.querySelector('.js-album-list');
const gallery = document.querySelector('.js-gallery');

//LOGIC
function getAlbums() {
    const request = sendAlbumsRequest();
    request.then((response) => {
        renderAlbums(response);
        getFirstAlbum();
    });

}

function getFirstAlbum() {
    const list = Array.from(albumsList.querySelectorAll('.js-album'));
    const album = list[0];
    getPhotos(album.id);
}

function getPhotos(albumID) {
    const photos = sendPhotosRequest(albumID);
    photos.then((response) => {
        renderPhotos(response);
    });
}

function createAlbumEventListener() {
    albumsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('js-album')) {
            clearGallery();
            getPhotos(event.target.id);
        }
    });
}

//HTML
function getAlbumItem(album) {
    return `<a href="#" class="list-group-item list-group-item-action list-group-item-primary js-album" id="${album.id}">${album.title}</a>`
}

function getPhotoItem(photo) {
    return `<div class="card" album-id = "${photo.albumId} "id="${photo.id}"><img src="${photo.url}" class="card-img-top" alt="..."></div>`;
}

//REQUESTS

function sendAlbumsRequest() {
    return fetch('https://jsonplaceholder.typicode.com/albums').then((response) => response.json());
}

function sendPhotosRequest(albumID) {
    return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumID}`).then((response) => response.json());
}


//RENDER
function renderAlbums(response) {
    const albums = response.map(album => getAlbumItem(album));
    albumsList.insertAdjacentHTML('beforeend', albums.join(''));
}

function renderPhotos(response) {
    const photos = response.map(photo => getPhotoItem(photo));
    gallery.insertAdjacentHTML('beforeend', photos.join(''));
}

//CLEAR

function clearGallery() {
    gallery.innerHTML = '';
}

//INIT

init();

function init() {
    getAlbums();
    createAlbumEventListener();
}