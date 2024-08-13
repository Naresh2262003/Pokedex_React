import axios from 'axios';
import { useState, useEffect } from 'react';

function usePokemonDetails(id,PokemonName){

    const [Pokemon, setPokemon]= useState({});

    async function getPokemonDetails(){
        try {
            let result;
            if(PokemonName){
                result= await axios.get(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`);
            }else{
                result= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            }
            const pokemonOfSameTypes= await axios.get(`https://pokeapi.co/api/v2/type/${result.data.types ? result.data.types[0].type.name :''}`)

            const details={
                name:result.data.name,
                image:result.data.sprites.front_default,
                weight:result.data.weight,
                height:result.data.height,
                types: result.data.types.map((t)=>t.type.name),
                similarPokemons: pokemonOfSameTypes.data.pokemon.slice(0, 5)
            }
            setPokemon(details);
            setPokemonListState({...PokemonListState, type: result.data.types ? Pokemon.types[0].type.name:''})
            // setPokemonListState({...PokemonListState, type: result.data.types ? Pokemon.types[0]:''})
        } catch (error) {
            console.log("something went wrong!");
        }
    }

    const [PokemonListState, setPokemonListState]= useState({});

    useEffect(()=>{
        getPokemonDetails();
    },[]);

    return [Pokemon, PokemonListState];
}

export default usePokemonDetails;