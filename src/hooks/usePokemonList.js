import axios from 'axios'
import {useEffect, useState} from 'react'

function usePokemonList(){
    const [PokemonListState, setPokemonListState]= useState({
        Pokemon:[],
        isLoading:true,
        URL:"https://pokeapi.co/api/v2/pokemon/",
        nextURL:"",
        prevURL:""
    });
    
    async function downloadPokemons(){
        setPokemonListState((p)=>{
            return {...p,isLoading:true}
        });

        const response= await axios.get(PokemonListState.URL);
        const pokemonResult= response.data.results;

        setPokemonListState((state)=>({
            ...state,
            prevURL:response.data.previous,
            nextURL:response.data.next
        }));

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

        setPokemonListState((p)=>{
            return {...p, Pokemon:res, isLoading:false}
        });

    }

    useEffect(()=>{
        downloadPokemons()
    },[PokemonListState.URL]);

    return [PokemonListState,setPokemonListState];
}

export default usePokemonList;