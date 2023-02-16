const auth = "563492ad6f91700001000001f1368adb8ad047fc8ba2d81457b0add2";

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fecthLink;
let currentSearch;

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})
more.addEventListener('click', loadMore)

function updateInput(e){
    searchValue = e.target.value;
}

async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method : "GET",
        headers: {
            Accept : 'aplication/json',
            Authorization : auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data){
    data.photos.forEach(photo =>{
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
            <div class="gallery-info">
                <p>${photo.photographer}</p>
                <a href="${photo.src.original}">Download</a>
            </div>
            <img src="${photo.src.large}"></img>
        `;
        gallery.appendChild(galleryImg);
    }); 
}

async function curatedPhotos(){
    fecthLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
    data = await fetchApi(fecthLink);
    generatePictures(data);
}

async function searchPhotos(query){
    clearGallery();
    fecthLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fecthLink);
    generatePictures(data);

}

function clearGallery(){
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore(){
    page++;
    if(currentSearch){
        fecthLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    }else{
        fecthLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fecthLink);
    generatePictures(data);
}

curatedPhotos();