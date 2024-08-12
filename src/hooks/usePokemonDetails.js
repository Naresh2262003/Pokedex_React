import axios from 'axios';
import { useState, useEffect } from 'react';
import usePokemonList from './usePokemonList';


function usePokemonDetails(id){

    const [Pokemon, setPokemon]= useState({});

    async function getPokemonDetails(){
        const result= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
    }

    const [PokemonListState, setPokemonListState]= usePokemonList();

    useEffect(()=>{
        getPokemonDetails();
    },[]);

    return [Pokemon, PokemonListState];
}

export default usePokemonDetails;