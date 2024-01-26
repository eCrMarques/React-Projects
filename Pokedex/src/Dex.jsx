import { useEffect, useState } from 'react';
import './Dex.css';
import Poke from './Poke';

function Dex() {
  let [page, setPage] = useState(0)
  let [srchPoke, setSrchPoke] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSearch, setIsSearch] =useState(false)
  const [listAux, setlistAux] =useState([])
  var contDex = [];
  

  function nextPage() {
    if(isSearch){
      let alt=listAux
      for(let i=0;i<9;i++){
        if(listAux.length>9){
        listAux.push(alt[i])}
      }
      if(listAux.length>9){
        setlistAux(listAux.slice(9))}

      console.log(alt)
      console.log(listAux)
  }
    
    else{
    if (page==1017){
      setPage(10000)
    }else{
      if(page>=10261){
    setPage(page + 7)}
    else{
      setPage(page+9)
    }
  }}}
  function prevPage() {
    if (isSearch){
      let alt = listAux.slice(-9)

      for(let i=0;i<listAux.length;i++){
        if(i<9){
          listAux.pop()
        }
          alt.push(listAux[i])

      }
      setlistAux(alt)

    }
    else{
      if(page==10000){
        setPage(1017)
      }else{
    if (page <= 8) {
      setPage(0)
    } else if(page>10261) {
      setPage(page - 7)
    }else{setPage(page - 9)}}
  }}

  for (let i = 1; i <= 18; i++) {
    contDex.push(i);
  }
  function search(pokeName) {
    var lista=[]
    setIsSearch(true)
    if(!pokeName || pokeName==''){
      setIsSearch(false)
      setPage(0)
      lista=[]
      return
    }

    try {

      srchPoke.results.map((srchPoke)=>{
        if (pokeName==srchPoke.name.slice(0,pokeName.length)){
        lista.push(srchPoke.name)
        setlistAux(lista)
        }
      })
    } catch (error) {
      console.log('\n\n\n\n\n'+error)
    }
  }

  async function searchAll() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    const data = await response.json();
    return data
  };

  useEffect(() => {
    if(srchPoke){
    }

    searchAll().then((srchPoke) => {
      try {
        setSrchPoke(srchPoke)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })
  }

    , [])
  if (isLoading) {
    return null
  }
  return (
    <div className='main'>
      {page >= 9  || (listAux.length>9 && isSearch)
        ? <button className='Previous' onClick={prevPage}>Anterior</button>
        : <div></div>
      }
      {(page<10268 && !isSearch) || (listAux.length>9 && isSearch)
      ?<button className='Next' onClick={nextPage}>Proximo</button>
      : <div></div>
      }
      <div className="topBar">
        <button className="recentPoke"></button>
        <button className="recentPoke"></button>
      </div>
      <div className="Dex">
        <div className="mainBar">
          <div className="select"></div>
          <input onChange={(e) => {
            search(e.target.value)
          }}
            onClick={searchAll}
            placeholder='Digite seu Pokemon' type="text" className="srch" />

        </div>
          {isSearch?
          listAux.map((listAux) =>
          <Poke poke={listAux} key={listAux}></Poke>
        ):
          contDex.map((contDex) =>
            {return <Poke poke={contDex + page} key={contDex + page}></Poke>?<Poke poke={contDex + page} key={contDex + page}></Poke>:<div/>}
            
            
          )
          }
        
      </div>

    </div>
  );
}

export default Dex;
