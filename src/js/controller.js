import * as model from './model.js'
import icons from 'url:../img/icons.svg';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import previewView from './views/previewView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE } from './views/config.js';



if(module.hot){
  module.hot.accept()
}


const controlRecipe = async function (){


  try{  
    const id = window.location.hash.slice(1);
  
     
    if(!id) return;
    recipeView.renderSpinner()

    // update recipe
    resultView.render(model.searchrecipePage())

    bookmarksView.update(model.state.bookmarks)
    //  loadrecipe
   await model.loadrecipe(id)

   recipeView.render(model.state.recipe)

  }catch(error){
     console.error('error', error)
     recipeView.errorHandler()
  }
}

const searchRecipe = async function(){
  try{

    resultView.renderSpinner()
      // get query
       const query = searchView.getQuery()
       await model.searchrecipe(query)

       if(!query) return;

       
       resultView.render(model.searchrecipePage(1))
      //   resultView.render(model.state.searchrecipe.results)

      // pagination view
      paginationView.render(model.state.searchrecipe)
  }catch(error){
   console.log(error)
  }
}

const controlPagination = function(goToPage){
  resultView.render(model.searchrecipePage(goToPage))
  //   resultView.render(model.state.searchrecipe.results)

  // pagination view
  paginationView.render(model.state.searchrecipe)
}

const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)

  recipeView.update(model.state.recipe)

  bookmarksView.render(model.state.bookmarks)
}
const controlServing  = function(newServings){
  model.updateServing(newServings);
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}
const controlBookmarks = function(){
   bookmarksView.render(model.state.bookmarks)
}
const controlAddRecipe = async function(newRecipe){
  try{
     recipeView.renderSpinner();
    await model.uploadRecipe(newRecipe)
    console.log('df',model.state.recipe)

    //render recipe
    recipeView.render(model.state.recipe)

    //success message
    addRecipeView.messageHandler()

    bookmarksView.render(model.state.bookmarks)

    //change id

    window.history.pushState(null, '', `#${model.state.recipe.id}`)
    

    setTimeout(function(){
      addRecipeView.toggleWindow()
    },MODEL_CLOSE*1000)

  }catch(err){
    console.log('error', err)
    addRecipeView.errorHandler(err.message)
  }
}
const init = function(){
  bookmarksView.addHandlerRender(controlAddBookmark)
    recipeView.addHandlerRender(controlRecipe)
    recipeView.addHandlerUpdateServings(controlServing)
    searchView.addHandlerSearch(searchRecipe)
    paginationView.addHandlerClick(controlPagination)
    recipeView.addHandlerAddBookmark(controlAddBookmark)
    addRecipeView.addHandlerUpload(controlAddRecipe)
   
}

init();
// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load', controlRecipe)