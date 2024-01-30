import React, { useEffect, useState } from 'react';
import logo from './assets/icon.png';
import und from './assets/undentified.png'
import './Dex.css';

function Poke(props) {
  const typeCor = {
    'normal': "#A8A77ec1",
    'fire': "#EE813ec1",
    'water': "#6390Fec1",
    'electric': "#F7D02ec1",
    'grass': "#7AC74ec1",
    'ice': "#96D9Dec1",
    'fighting': "#C22E2ec1",
    'poison': "#A33EAec1",
    'ground': "#E2BF6ec1",
    'flying': "#A98FFec1",
    'psychic': "#F9558ec1",
    'bug': "#A6B91ec1",
    'rock': "#B6A13ec1",
    'ghost': "#73579ec1",
    'dragon': "#6F35Fec1",
    'dark': "#70574ec1",
    'steel': "#B7B7Cec1",
    'fairy': "#D685Aec1"
  }
  const pokeId = props.poke;
  const [pokeInfo, setPokeInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite]= useState(false)

  function enviar(data,name){
    props.msg(data,name)}
  
  const procurarPokemon = async (pokemon) => {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    setIsLoading(true);

    procurarPokemon(pokeId)
      .then((info) => {
        try {
          setPokeInfo(info);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [pokeId]);

  if (isLoading || pokeInfo==null) {

    return null;
  }
  {pokeInfo.sprites.other.home.front_default?pokeInfo.sprites.other.home.front_default:pokeInfo.sprites.other.home.front_default=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeInfo.id}.png`?und:und}
  return (
    <div id="dBg"
      className="dBg"
      style={{ background: `linear-gradient(to bottom, #162e9751 1%, #21243184 40%, ${typeCor[pokeInfo.types[0]?.type?.name]})` }}>
        
      <div className="idDex">{pokeInfo.id}</div>
      <img src={pokeInfo.sprites.other.home.front_default} alt="" className="Pokemon"/>
      <h2 className="name">{pokeInfo.name[0].toUpperCase() + pokeInfo.name.slice(1)}</h2>
      <div className="types">
        {pokeInfo.types.map((pokeInfo) =>
          <div id={pokeInfo.type.name} className={pokeInfo.type.name}>{pokeInfo.type.name.toUpperCase()}</div>
        )}

      </div>
      <div className="info">
        <div>{
          pokeInfo.height < 10 ? `0.${pokeInfo.height}` : `${pokeInfo.height}`.slice(0, 1) + '.' + `${pokeInfo.height}`.slice(-1, 2)} M</div>
        <div>{pokeInfo.weight / 10} KG</div>
      </div>
      <button className="Detalhe"
      onClick={()=>{enviar([pokeInfo.sprites.other.home.front_default],pokeInfo.name)}}
      >Salvar
      </button>
      <img src={logo} alt="" className="logo" />
    </div>
  )
}

export default Poke