import axios from 'axios'
import {useEffect, useState} from 'react'
import PokemonCard from '../PokemonCard/PokemonCard.jsx';
import './PokedexList.css'

function PokedexList(){
    const [Pokemon, setPokemon]= useState([]);
    const [isLoading, setisLoading]= useState(true);

    const [URL, setURL]=useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextURL, setnextURL]= useState("");
    const [prevURL, setprevURL]= useState("");

    async function downloadPokemons(){
        setisLoading(true);
        // getting the data for all 20 pokemons like the name and the url to get more info about them
        const response= await axios.get(URL);
        const pokemonResult= response.data.results;

        setnextURL(response.data.next);
        setprevURL(response.data.previous);

        // now getting the details of all 20 pokemons details like name, image , id and type
        const pokemonResultPromise= pokemonResult.map((pokemon)=> axios.get(pokemon.url));
        const pokemonData= await axios.all(pokemonResultPromise);
        
        const res= pokemonData.map((pokemon)=>{
            return {
                id:pokemon.data.id,
                name:pokemon.data.species.name,
                image:pokemon.data.sprites.front_default, 
                type:pokemon.data.types
            };
        });

        // now the initial data in the Pokemon Statevariable
        setPokemon(res);
        setisLoading(false);
    }

    useEffect(()=>{
        downloadPokemons()
    },[URL]);


    return (
        <div className="pokemon-list-wrapper">
            <div className='pokemon-wrapper'>
                {isLoading ? "Loading...":Pokemon.map((p)=> <PokemonCard name={p.name} image={p.image} id={p.id} key={p.id}/>)}
            </div>

            <div className="controls">
                <button disabled={prevURL==null} onClick={()=>setURL(prevURL)} >prev</button>
                <button disabled={nextURL==null} onClick={()=>setURL(nextURL)} >next</button>
            </div>
        </div>
    )
}

export default PokedexList;