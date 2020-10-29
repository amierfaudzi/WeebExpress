const searchForm = document.querySelector(".anime-search-form");
const animeTray = document.querySelector(".selectedAnime");

//sending the choice to axios
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let cat = event.target.category.value;
    console.log("button has been pressed");

    fetchAnime(cat);
});

//axios to get the endpoint
const fetchAnime = (categorySelected)  => {
    let BASE_URL = "https://kitsu.io/api/edge/anime?filter[categories]=";
    BASE_URL += categorySelected;
    BASE_URL += "&sort=popularityRank&page[limit]=9&page[offset]=0"
    
    axios({
        url: BASE_URL,
        method: "GET"
    }).then(result => populateDiv(result))  //the data passed here
    .catch(error => console.log(error));
}

//div maker
function populateDiv(getAnime) {
    console.log(getAnime.data);
    animeTray.innerHTML="";
    for(i=0; i < getAnime.data.data.length; i++){
        //recommendation container
        const makeDiv = document.createElement('div');
        makeDiv.classList.add("anime-card");
        animeTray.appendChild(makeDiv);
        //make main container
        const makeMainDiv = document.createElement('div');
        makeMainDiv.classList.add("anime-card__main-content");
        makeDiv.appendChild(makeMainDiv);
        //image
        let image = getAnime.data.data[i].attributes.posterImage.small;
        const makeImg = document.createElement('img');
        makeImg.classList.add("anime-card__image");
        makeImg.src = image;
        makeMainDiv.appendChild(makeImg);
        //title
        let title = getAnime.data.data[i].attributes.titles.en
        const makeTitle = document.createElement('h2');
        makeTitle.classList.add("anime-card__title");
        makeTitle.innerText = title;
        makeMainDiv.appendChild(makeTitle);
        //make synopsis container
        const makeSynopsisDiv = document.createElement('div');
        makeSynopsisDiv.classList.add("anime-card__synopsis");
        makeDiv.appendChild(makeSynopsisDiv);
        //synopsis
        let synopsis = getAnime.data.data[i].attributes.synopsis;
        const makesSynopsis = document.createElement('p');
        makesSynopsis.classList.add("anime-card__paragraph");
        makesSynopsis.innerText = synopsis;
        makeSynopsisDiv.appendChild(makesSynopsis);
    }
}