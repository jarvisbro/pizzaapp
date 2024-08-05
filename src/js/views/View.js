
import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
export default class View {
    _data

    /**
     *  Render the recieved object to the Dom
     * @param {*} data 
     * @param {*} render 
     * @returns 
     */
    render(data, render = true){
      // console.log('render',data)
    //   if(!data || (Array.isArray(data)&& data.length ===0)) return this.errorHandler()
        this._data = data
       const markup = this._markupgenerator()

       if(!render) return markup
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup) 
    }
    
    update(data){
      
      if(!data || (Array.isArray(data)&& data.length ===0)) return this.errorHandler()
        this._data = data
       const newMarkup = this._markupgenerator()
       const newDom = document.createRange().createContextualFragment(newMarkup);
       const newElement = Array.from(newDom.querySelectorAll('*'));
       const curElement = Array.from(this._parentElement.querySelectorAll('*'));

       newElement.forEach((newEl, i)=>{
        const curEl = curElement[i];
        // update the text
        if(
          !newEl.isEqualNode(curEl) &&
          newEl.firstChild?.nodeValue.trim() !== ""
        ){
          curEl.textContent = newEl.textContent;
        }

        // update change attribut
        if(!newEl.isEqualNode(curEl))
          Array.from(newEl.attributes).forEach(attr =>
        curEl.setAttribute(attr.name, attr.value))

       })
    }
    _clear(){
        this._parentElement.innerHTML = '';
    }
    renderSpinner = function(){
        const markup = ` <div>
         <svg>
         <use href="${icons}#icon-loader"></use>
       </svg>
       </div>`
       this._parentElement.innerHTML = '';
       this._parentElement.insertAdjacentHTML('afterbegin', markup)
       }
    
       
    errorHandler(message = this._errorMessage){
     // console.log('error message', this._errorMessage)
       const markup = `  
       <div class="error">
       <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
                   </div>
              `
              this._clear()
              this._parentElement.insertAdjacentHTML('afterbegin', markup) 
           
    }
    messageHandler(message = this._message){
        const markup = ` 
         <div class="message">
         <div>
                   <svg>
                     <use href="${icons}#icon-smile"></use>
                   </svg>
                 </div>
                 <p>${message}</p>
                 </div>
               `
               this._clear()
               this._parentElement.insertAdjacentHTML('afterbegin', markup) 
     }
    
}