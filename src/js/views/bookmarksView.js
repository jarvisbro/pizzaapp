import View from "./View"
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView";

class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list')
    _erroeMessage = "No bookmarks yet. Find a nice recipe and bookmark it"
  _message = "Sucessfully recipe loaded"


  addHandlerRender(handler){
    window.addEventListener('click', handler)
  }
    _markupgenerator(){
        
        return this._data.map(bookmark => previewView.render(bookmark, false) ).join('')
      
    }
  

}

export default new BookmarksView