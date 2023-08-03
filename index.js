const searchInput = document.getElementById("dataSearch");
const searchButton = document.getElementById("search-btn");
const mainContainer = document.getElementById("main-data-container01");


const APIKey = "AIzaSyCXDn0knkHxalLJvY4LQu2BaPaR5dKk6bI";
const baseUrl = " https://www.googleapis.com/youtube/v3/";

let recievedData;

searchButton.addEventListener('click', ()=>{
    let searchStringVal = searchInput.value;
    searchStringVal.trim();
    
    fetchData(searchStringVal);

});


async function fetchData(searchStringVal){

    let maxSearchValue = searchStringVal ? 30 : 21;

     const urlData = `${baseUrl}search?key=${APIKey}&q=${searchStringVal}&part=snippet&maxResults=${maxSearchValue}`;
     let response = await fetch(urlData, {method: "GET"});
     recievedData = await response.json(); 

     displayUIdata(recievedData.items);
}

function displayUIdata(contentArray){
    contentArray.forEach((vedioInfo)=>{

        const {snippet} = vedioInfo;

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");

        const yutuberData = `
        <div class="card-image" id=${vedioInfo.id.videoId}>
            <img class = "thumnail-img" src=${snippet.thumbnails.high.url} alt="image text">
            <span class="vedio-duration">23:14</span>
        </div>

        <div class="channel-img-container">
            
            <img src="https://source.unsplash.com/random?profile" alt="channel-image">
            <p class="vidio-desp" id=${snippet.channelId}>${snippet.title}</p>
        </div>

        <div class="more-info">
            <p class="youtuber-name">${snippet.channelTitle}</p>
            <span class = "views-count">15k views. </span>
            <span class="uploaded-time-span">1 week ago</span>
        </div>
        
        `;
        cardContainer.innerHTML = yutuberData;
        mainContainer.appendChild(cardContainer);


    });
}

