// import { API_KEY } from "./secrets.js";
import  {navigator} from './navigation.js';
import { categoriesPreviewList, trendingMoviesPreviewList,searchFormBtn, trendingBtn, arrowBtn, genericSection, searchFormInput,movieDetailTitle,movieDetailDescription,movieDetailScore, movieDetailCategoriesList, headerSection,relatedMoviesContainer } from "./nodes.js";

const API_KEY='ae260be5c599e593d15365da9b45c3bc';
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{'Content-Type':'application/json;charset=utf-8'
    },
    params:{
        'api_key':API_KEY
    }
})

//Utils
const createMovies= (parent,list)=>{
    parent.innerHTML='';
    list.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click',()=>{
            location.hash=`movie=${movie.id}`
        });
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/'+ movie.poster_path);

        movieContainer.appendChild(movieImg);
        parent.appendChild(movieContainer);

    });
}

const createCategory = (parent,list)=>{
    parent.innerHTML='';
    list.forEach(category => {
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category-container');
            const categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('category-title');
            categoryTitle.setAttribute('id',`id${category.id}`);
            categoryTitle.addEventListener('click',()=>{
                location.hash =`category=${category.id}-${category.name}`;
            })
            const categoryTitleText = document.createTextNode(category.name);
    
            categoryTitle.appendChild(categoryTitleText);
            categoryContainer.appendChild(categoryTitle);
            parent.appendChild(categoryContainer);
    });
}


//callsAPi

//Axios
const getTrendingMoviesPreview = async ()=>{
    const {data} = await api('trending/movie/day');

    const movies = data.results;
    createMovies(trendingMoviesPreviewList,movies);
}
const getCategoriesPreview = async (id)=>{
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    createCategory(categoriesPreviewList,categories);
}

const getMoviesById = async(id)=>{
    const {data} = await api('discover/movie',{
        params:{
            with_genres: id,
        }
    });

    const movies = data.results;
    createMovies(genericSection,movies);
}
const getMoviesBySearch = async(query)=>{
    const {data} = await api('search/movie',{
        params:{
            query,
        }
    });

    const movies = data.results;
    createMovies(genericSection,movies);
}

const getTrendingMovies = async ()=>{
    const {data} = await api('trending/movie/day');

    const movies = data.results;
    createMovies(genericSection,movies);
}
const getMovieById = async (movieId)=>{
    const {data: movie} = await api(`movie/${movieId}`);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path;
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`;

    movieDetailTitle.textContent=movie.title;
    movieDetailDescription.textContent=movie.overview;
    movieDetailScore.textContent=movie.vote_average;

    createCategory(movieDetailCategoriesList,movie.genres);
    getRelatedMoviesId(movieId)

}

const getRelatedMoviesId= async (id) =>{
    const {data} = await api(`movie/${id}/recommendations`);
    const movies = data.results;
    createMovies(relatedMoviesContainer,movies);
}

//fetch
// const getTrendingMoviesPreview = async ()=>{
//     const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);

//     const data = await res.json();

//     const movies = data.results;
//     movies.forEach(movie => {
//         const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

//         const movieContainer = document.createElement('div');
//         movieContainer.classList.add('movie-container');
//         const movieImg = document.createElement('img');
//         movieImg.classList.add('movie-img');
//         movieImg.setAttribute('alt',movie.title);
//         movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300/'+ movie.poster_path);

//         movieContainer.appendChild(movieImg);
//         trendingPreviewMoviesContainer.appendChild(movieContainer);

//     });
// }


// const getCategoriesPreview = async ()=>{
//     const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);

//     const data = await res.json();

//     const categories = data.genres;
//     categories.forEach(category => {
//         const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');

//         const categoryContainer = document.createElement('div');
//         categoryContainer.classList.add('category-container');
//         const categoryTitle = document.createElement('h3');
//         categoryTitle.classList.add('category-title');
//         categoryTitle.setAttribute('id',`id${category.id}`);
//         const categoryTitleText = document.createTextNode(category.name);

//         categoryTitle.appendChild(categoryTitleText);
//         categoryContainer.appendChild(categoryTitle);
//         previewCategoriesContainer.appendChild(categoryContainer);

//     });
// }

searchFormBtn.addEventListener('click',()=>{
   
    location.hash = `search=${searchFormInput.value}`;
});
trendingBtn.addEventListener('click',()=>{
    location.hash = 'trends';
});

arrowBtn.addEventListener('click',()=>{
    if(document.domain !== '127.0.0.1'){
        debugger
        location.hash = '';
    }else{

        location.hash = window.history.back();
    }
})


window.addEventListener('hashchange',navigator,false);
window.addEventListener('DOMContentLoaded',navigator,false);
export {getCategoriesPreview,
getTrendingMoviesPreview,getMoviesById,getMoviesBySearch,getTrendingMovies,getMovieById}