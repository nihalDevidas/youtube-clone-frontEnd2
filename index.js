const searchInput = document.getElementById("dataSearch");
const searchButton = document.getElementById("search-btn");
const mainContainer = document.getElementById("main-data-container01");


const APIKey = "AIzaSyCXDn0knkHxalLJvY4LQu2BaPaR5dKk6bI";
                 
const baseUrl = "https://www.googleapis.com/youtube/v3/";

fetchData("");
let recievedData;

searchButton.addEventListener('click', ()=>{
    let searchStringVal = searchInput.value;
    searchStringVal.trim();
    
    fetchData(searchStringVal);

});



async function fetchData(searchStringVal){

    let maxSearchValue = searchStringVal ? 30 : 21;

        const urlData = `${baseUrl}search?key=${APIKey}&q=${searchStringVal}&part=snippet&maxResults=${maxSearchValue}`;
        const response = await fetch(urlData,{method: "GET"});
        recievedData = await response.json(); 
   
        displayUIdata(recievedData.items);
   
}

function displayUIdata(contentArray){
    contentArray.forEach((vedioInfo)=>{

        const {snippet} = vedioInfo;

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
 
        const yutuberData = `
        <div class="card-image">
           <a href = "details.html" class="image-a"  id=${vedioInfo.id.videoId}>
             <img class = "thumnail-img" src=${snippet.thumbnails.high.url} alt="image text">
            </a>
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

    assingEvents();
}


// functionality to pass vedio id

function assingEvents(){
    const cards = document.getElementsByClassName("image-a");

    const cardArray = Array.from(cards);

    cardArray.forEach((card)=>{

          card.addEventListener('click',(e)=>{
                  const vedeoId = e.target.id;
                  localStorage.setItem('vedeoId',vedeoId);
          });
    });
}



