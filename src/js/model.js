import { API_URL,RES_PAGE, KEY } from "./views/config"
//import { getJSON, postJSON } from "./helper"
import { AJAX } from "./helper"
export const state = {
 recipe:{},
 searchrecipe:{
    query : {},
    results :[],
    resultsPerPage : RES_PAGE,
    page: 1

 },
 bookmarks:[]
 

}
  const createRecipeObject = function(data){
   const {recipe} = data.data
   return {
    id   : recipe.id,
    publisher : recipe.publisher,
    sourceUrl  : recipe.source_url,
    image  : recipe.image_url,
    cooking_time : recipe.cooking_time,
    servings  : recipe.servings,
    title   : recipe.title,
    ingredients : recipe.ingredients,
   ...(recipe.key && {key : recipe.key})
   }
  }
export const loadrecipe = async function(id){
  
    try{
       const data = await AJAX(`${API_URL}${id}?key=${KEY}`)
       state.recipe = createRecipeObject(data)
         if(state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true
         else
         state.recipe.bookmarked = false
}catch(error){
   console.log(error, 'error re baba')
   throw error
}
}

export const searchrecipe = async function(query){

    try{
       const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)
        

       state.searchrecipe.results = data.data.recipes.map((rec)=>{
        return{
        id   : rec.id,
        publisher : rec.publisher,
        image  : rec.image_url,
        title   : rec.title,
        ...(rec.key && {key : rec.key}),}
       })


    }catch(error){
        console.error(error)
    }
}
const presistBookmarks = function(){
   localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}
export const searchrecipePage = function(page=state.searchrecipe.page){

         state.searchrecipe.page = page
   const start = (page-1)*state.searchrecipe.resultsPerPage;
   const end = page*state.searchrecipe.resultsPerPage;
   
   return state.searchrecipe.results.slice(start, end)
}

export const updateServing = function(newServing){
      
    state.recipe.ingredients.forEach((res)=>{
       res.quantity = (res.quantity ?(res.quantity*newServing)/state.recipe.servings:"")
       
   })
   state.recipe.servings = newServing;
}

export const addBookmark = function(recipe){
   state.bookmarks.push(recipe)

   if(recipe.id === state.recipe.id) state.recipe.bookmarked = true
   presistBookmarks();
}

export const deleteBookmark = function(id){
   const index = state.bookmarks.findIndex(el=> el.id === id)

   state.bookmarks.splice(index, 1)
   if(id === state.recipe.id) state.recipe.bookmarked = false

   presistBookmarks()
}

const init = function(){
  const storage = localStorage.getItem('bookmarks')
   if(!storage) state.bookmarks = JSON.parse(storage)
}

init()

console.log(state.bookmarks)


const newfeature = function(){
   console.log('Welcome to the Jungle Brother')
}
newfeature();
const clearBookmarks = function(){
   localStorage.clear('bookmarks')
}

//clearBookmarks()

export const uploadRecipe =  async function(newRecipe){
   try{

const ingredient = Object.entries(newRecipe)
           .filter(entry => entry[0].startsWith('ingredient') && entry[1]!=='')
           .map(ing => {
            //const ingArr = ing[1].replaceAll(' ', '').split(',')
            const ingArr = ing[1].split(',').map(ele=> ele.trim())
            if(ingArr.length !==3) throw new Error('Wrong ingredient format! Please use the correct format')

               const  [quantity, unit,  description] = ingArr;

               return {quantity : quantity ? +quantity : null  , unit, description}
            
           })

           const recipe = {
           
            publisher : newRecipe.publisher,
            source_url  : newRecipe.sourceUrl,
            image_url  : newRecipe.image,
            cooking_time : +newRecipe.cookingTime,
            servings  : +newRecipe.servings,
            title   : newRecipe.title,
            ingredients : ingredient
           }
           console.log(ingredient)
      const res =    await AJAX(`${API_URL}?key=${KEY}` , recipe)
      state.recipe = createRecipeObject(res)
      addBookmark(state.recipe)
      
      }catch(err){
         throw err
      }
    
}