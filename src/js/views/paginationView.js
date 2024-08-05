import icons from 'url:../../img/icons.svg';
import View from './View'

class PaginationView extends View{
_parentElement = document.querySelector('.pagination');

addHandlerClick(handler){
    this._parentElement.addEventListener('click', function(e){
        const btn = e.target.closest('.btn--inline')
      
        const goToPage = +btn.dataset.goto;
       
        handler(goToPage)
    })
}
_markupgenerator(){
     const curpage = this._data.page
    const numPage =  Math.ceil(this._data.results.length / this._data.resultsPerPage)
    
    //there is one page and others

    if(this._data.page === 1 && numPage > 1)
        return ` <button data-goto="${curpage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curpage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`

    // last page
    if(this._data.page === numPage && numPage >1)
        return `<button data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curpage - 1}</span>
          </button>`

    // other page
    if(this._data.page < numPage)
        return `<button data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curpage - 1}</span>
          </button>
          <button data-goto="${curpage + 1}"  class="btn--inline pagination__btn--next">
            <span>Page ${curpage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `

    // only one page
   // if(this._data.page === 1 && numPage===1)
        return ''
    


}

}


export default new PaginationView