import{getCategoriesPreview,
    getTrendingMoviesPreview} from './main.js'

const navigator = ()=>{
    if(location.hash.startsWith('#trends')){
        trendsPage();

    }else if(location.hash.startsWith('#search')){
        searchPage();
    }else if(location.hash.startsWith('#movie=')){
        movieDetailsPage();
    }else if(location.hash.startsWith('#category=')){
        categoriesPage();
    }else{
        homePage();
    }
}

const homePage = ()=>{
    getCategoriesPreview();
    getTrendingMoviesPreview();
}
const categoriesPage = ()=>{}
const movieDetailsPage = ()=>{}
const searchPage = ()=>{}
const trendsPage = ()=>{}

export {navigator};