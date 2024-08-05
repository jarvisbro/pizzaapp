import View from "./View"
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView";
class ResultView extends View{
    _parentElement = document.querySelector('.results')
    _erroeMessage = "No recipe found for your query. Please try again!!"
  _message = "Sucessfully recipe loaded"


  _markupgenerator(){
     
    return this._data.map(result => previewView.render(result, false) ).join('')
  
}
}

export default new ResultView