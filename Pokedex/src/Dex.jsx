import { useEffect, useState } from 'react';
import './Dex.css';
import Poke from './Poke';

function Dex() {
  const listaStorage = localStorage.getItem('lista')

  let [page, setPage] = useState(0)
  let [srchPoke, setSrchPoke] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSearch, setIsSearch] = useState(false)
  const [listAux, setlistAux] = useState([])
  const [dataChild, setDataChild] = useState(listaStorage ? JSON.parse(listaStorage) : [])
  let [backup, setBackup] = useState([])

  var contDex = [];

  function nextPage() {
    if (isSearch) {
      let alt = listAux
      for (let item of alt) {
        if (!backup.includes(item) && listAux.length > 9) {
          backup.push(item)
        }

      }
      if (listAux.length > 9) {
        alt = listAux.slice(9)
        setlistAux([...alt])
        setBackup(backup.splice(0, backup.indexOf(alt[0])))
      }
      return
    }

    else {
      if (page == 1017) {
        setPage(10000)
      } else {
        if (page >= 10261) {
          setPage(page + 7)
        }
        else {
          setPage(page + 9)
        }
      }
    }
  }
  function prevPage() {
    if (isSearch) {
      for (let i = 1; i < 10; i++) {
        listAux.unshift(backup[backup.length - 1])
        backup.pop()
      }
      setlistAux([...listAux])
      if (backup.length == 0) {
        setBackup(listAux)
      }
    }

    else {
      if (page == 10000) {
        setPage(1017)
      } else {
        if (page <= 8) {
          setPage(0)
        } else if (page > 10261) {
          setPage(page - 7)
        } else { setPage(page - 9) }
      }
    }
  }

  for (let i = 1; i <= 18; i++) {
    contDex.push(i);
  }
  function search(pokeName) {
    var lista = []
    setIsSearch(true)
    if (!pokeName || pokeName == '') {
      setIsSearch(false)
      setPage(0)
      lista = []
      return
    }

    try {

      srchPoke.results.map((srchPoke) => {
        if (pokeName == srchPoke.name.slice(0, pokeName.length)) {
          lista.push(srchPoke.name)
          setlistAux(lista)
          setBackup(lista)
        }
      })
    } catch (error) {
      console.log('\n\n\n\n\n' + error)
    }
  }

  async function searchAll() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    const data = await response.json();
    return data
  };

  function Mensagem(data, name) {
    var count = 0
    var localPoke = []

    if (listaStorage) {
      let storage = JSON.parse(listaStorage)
      storage.map((storage) => localPoke.push(storage[0]))
    }

    if (localPoke.includes(name)) {
      for (let item of dataChild) {
        if (item[0] == name) {
          dataChild.splice(count, 1)
          break
        }
        count += 1
      }
      setDataChild([...dataChild])
      localStorage.setItem('lista', JSON.stringify(dataChild))
      return
    } else {
      let thereIs = false

      for (let item of dataChild) {
        if (item[0] == name) {
          item[1] = data[0]
          thereIs = true
          break
        }
      }
      if (!thereIs) {
        data = [name, data[0]]
        dataChild.push(data);
      }

      setDataChild([...dataChild]);
      localStorage.setItem('lista', JSON.stringify(dataChild))
    }

  }
  useEffect(() => {
    if (srchPoke) {
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
      {page >= 9 || ((backup.length != listAux.length) && isSearch)
        ? <button className='Previous' onClick={prevPage}>Anterior</button>
        : <div></div>
      }
      {(page < 10268 && !isSearch) || (listAux.length > 9 && isSearch)
        ? <button className='Next' onClick={nextPage}>Proximo</button>
        : <></>
      }
      <div className="topBar">
        {dataChild.map((dataChild) =>
          dataChild[1] != ''
            ? <div className="recentPoke"
              onClick={() => { Mensagem(dataChild[1], dataChild[0]) }}>
              <img className="iconRecent" src={dataChild[1]} />
            </div>
            : <div />
        )}
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
        {isSearch ?
          listAux.map((listAux) =>
            <Poke poke={listAux} key={listAux} msg={Mensagem}></Poke>
          ) :
          contDex.map((contDex) => { return <Poke poke={contDex + page} key={contDex + page} msg={Mensagem}></Poke> ? <Poke poke={contDex + page} key={contDex + page} msg={Mensagem}></Poke> : <div /> }


          )
        }

      </div>

    </div>
  );
}

export default Dex;
