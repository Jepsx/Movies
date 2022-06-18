import{getCategoriesPreview,
    getTrendingMoviesPreview,getMoviesById,getMoviesBySearch, getTrendingMovies,getMovieById} from './main.js'

import{headerSection,arrowBtn,headerCategoryTitle,headerTitle,searchForm, trendingPreviewSection, categoriesPreviewSection,genericSection, movieDetailSection} from './nodes.js'

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
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const homePage = ()=>{

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');


    getCategoriesPreview();
    getTrendingMoviesPreview();
}
const categoriesPage = ()=>{

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    let [_,categoryData]=location.hash.split('=');
    let [categoryId,categoryName] = categoryData.split('-');
    headerCategoryTitle.innerHTML=categoryName;
    getMoviesById(categoryId);
}
const movieDetailsPage = ()=>{
    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    let [_,movieId]=location.hash.split('=');
    getMovieById(movieId);
}
const searchPage = ()=>{
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    let [_,query]=location.hash.split('=');
    getMoviesBySearch(query);
}
const trendsPage = ()=>{
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerCategoryTitle.innerHTML='Trends';
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMovies();
}

export {navigator};