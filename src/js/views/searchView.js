class searchView{

    _parentEL = document.querySelector('.search')



  _getClear(){
        this._parentEL.querySelector('.search__field').value = '';
    }

  getQuery(){
       const query = this._parentEL.querySelector('.search__field').value
       console.log('query', query)
         this._getClear()
       return query
    }
     

    addHandlerSearch(handler){
        this._parentEL.addEventListener('submit', function(e){
            e.preventDefault()
            handler()
        })
    }


}

export default new searchView()