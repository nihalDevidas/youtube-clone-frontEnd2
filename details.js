const vedeoId = localStorage.getItem('vedeoId');


const mainCon = document.getElementById("mc1");

const APIKey = "AIzaSyCXDn0knkHxalLJvY4LQu2BaPaR5dKk6bI";
                 
const baseUrl = "https://www.googleapis.com/youtube/v3/";



async function fetchChannelDetails(chId){

    let url = `${baseUrl}channels?key=${APIKey}&part=snippet,statistics&id=${chId}`;

    const response = await fetch(url);
    const result = await response.json();

    return result;

}

async function fetchVedioDetails(vedioId="28ewOqp-5ds"){

    let url = `${baseUrl}videos?key=${APIKey}&part=snippet,statistics&id=${vedioId}`;

    const response = await fetch(url, {method: "GET"});
    const vedioInfo = await response.json();

    const chanelDetails = await fetchChannelDetails(vedioInfo.items[0].snippet.channelId);


     //console.log(vedioInfo);
    addDetailsTopage(vedioInfo, chanelDetails);

}

function addDetailsTopage(vedioInfo, chaDetails){

    const container = document.createElement("div");
          container.className = "vedio-content";

     const content = `
     <div class="vedio-container">
     </div>
     <p class="despt">
      ${vedioInfo.snippet.title}
     </p>

     <div class="statistics">

         <div class="part1">
             <div class="views">
                 ${vedioInfo.items[0].statistics.viewCount} views
             </div>

             <div class="upload-date">
                 oct 8 2021
             </div>
         </div>

         <div class="part2">
             <div class="likes">
                 <i class="fa-regular fa-thumbs-up"></i>
                 <span class="like-count">${vedioInfo.items[0].statistics.likeCount}</span>
             </div>
             <div class="dis-likes">
                 <i class="fa-regular fa-thumbs-down"></i>
                 <span class="dis-like-count">1.8k</span>
             </div>
             <div class="share">
                 <i class="fa-solid fa-share"></i>
                 <span class="share-sym">SHARE</span>
             </div>
             <div class="save-con">
                 <img src="../youClone/p2image/Save.png" alt="image text">
                 <span class="save-sym">SAVE</span>
             </div>
         </div>

     </div>

     <div class="channel-info">
         <div class="upper-part">

             <div class="channel-img-container">
                 <img src="${chaDetails.items[0].snippet.thumbnails.high.url}" alt="channel-image">
                 <div class="inner">
                     <p class="vidio-desp">${chaDetails.items[0].snippet.title}</p>
                     <span>${chaDetails.items[0].statistics.subscriberCount}M subscribers</span>
                 </div>
             </div>

             <button class="subscribe-btn">SUBSCRIBE</button>
         </div>

         <p class="lower-sesp">
             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione ipsa tempore tenetur odio at doloremque illum, minima animi maiores quod error adipisci ducimus! Fuga ullam laboriosam quis praesentium ut distinctio.
         </p>
         
     </div>
     `;  
     
     container.innerHTML = content;
     mainCon.appendChild(container);
}



fetchVedioDetails(vedeoId);