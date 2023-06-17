
//Default function to ease getting of DOM elements
const elem = (x) =>{
    return document.querySelector(x)
}

//Loading Screen
var loading_screen = elem("#loading_screen");

window.setTimeout(()=>{
    loading_screen.style.display = "none"
},3000)//3 seconds maximum wait

//Search Functionalities
var form = elem(".search_form"),
    search_input = elem("#search"),
    search_term = "",

    container = elem("#container"),
    loader = container.querySelector(".loader"),
    contents = elem(".contents");


//Prevent form default submit functionalities
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    e.stopPropagation();
})

const handleSearchMovie = () =>{
    if(search_input.value!=""){
        search_term = search_input.value;
        search_input.style = "border: 1px solid transparent";

        loader.style.display = "flex";
        contents.innerHTML = "";

        fetch(`https://www.omdbapi.com/?s=${search_term}&apikey=907ac560`).then((response)=> response.json())
        .then((data)=>{
                loader.style.display = "none";

                data.Search.forEach(movie => {
                    contents.innerHTML += `
                        <div class="box">
                            <div class="img_part">
                                ${movie.Poster == "N/A" ? " " : `<img src=${movie.Poster} alt=${movie.Title}>`}
                            </div>
            
                            <div class="title_part">
                                <!--- Prevent Long words title to misarrange the contents div --->
                                <h3>${movie.Title.length >=20 ? movie.Title[0]+"..." : movie.Title}</h3>
                            </div>
                
                            <div class="text_part">
                                <p>Released: ${movie.Year}</p>
                            </div>
                
                            <div class="btn_part">
                                <button class="btn" onclick="handleViewMore('${movie.imdbID}')">View More</button>
                            </div>
                        </div>
                    `
                   
                });
                
            }
        ).catch(()=>{
            loader.style.display = "none";
            contents.innerHTML = '<p class="error_text">Sorry Not Found! Please Try Again with another title</p>';
        })

    }else{
        search_input.style = "border: 1px solid red";
        contents.innerHTML = '<p class="error_text">Please Enter the Movie Title</p>';

    }

}

//View More Button Functionalities
const handleViewMore = (id) =>{
    let movie_id = id,
        api_url = `https://www.omdbapi.com/?i=${movie_id}&apikey=907ac560`;
    
    loader.style.display = "flex";
    contents.innerHTML = "";    
    contents.classList.add("content_view");

    fetch(api_url).then((response)=> response.json())
    .then((data)=>{
        loader.style.display = "none";

        contents.innerHTML = `

            <div class="part_1">
                <div class="img_part">
                    <!--- Check if Poster is Available --->
                    ${data.Poster == "N/A" ? " " : `<img src=${data.Poster} alt=${data.Title}>`}
                </div>
            </div>

            <div class="part_2">
                <ul>
                    <li><span>Title:</span> ${data.Title}</li>
                    <li><span>Plot:</span> <br> ${data.Plot}</p></li>
                    <li><span>Actors:</span> ${data.Actors}</li>
                    <li><span>Director:</span> ${data.Director}</li>
                    <li><span>Genre:</span> ${data.Genre}</li>
                    <li><span>Language:</span> ${data.Language}</li>
                    <li><span>Released:</span> ${data.Released}</li>
                    <li><span>Rated:</span> ${data.Rated}</li>
                    <li><span>Awards:</span> ${data.Awards}</li>
                </ul>
            
            </div>
        
        `;
 
    }).catch(()=>{
        loader.style.display = "none";
        contents.innerHTML = '<p class="error_text">Somethings Wrong! Please Try Again</p>';
    })

}

