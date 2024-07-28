import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonDetails.css'

function PokemonDetails(){
    const id= useParams().id;

    const [Pokemon, setPokemon]= useState({});
    
    async function getPokemonDetails(){
        let result= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        const details={
            name:result.data.name,
            image:result.data.sprites.front_default,
            weight:result.data.weight,
            height:result.data.height,
            types: result.data.types.map((t)=>t.type.name)
        }
        setPokemon(details);
    }

    useEffect(()=>{
        getPokemonDetails()
    },[]);

    return (
        <div className='pokemon-details'>
            { 
            Object.keys(Pokemon).length === 0 ? <div className='loading'>"Loading..."</div>:
                (<div className='pokemon-details-wrapper'>
                    <img className='img' src={Pokemon.image} alt={`Image: ${Pokemon.name} `} />
                    <h2 className='name'>{Pokemon.name}</h2>
                    <div className='height'>Height: {Pokemon.height}</div>
                    <div className='weight'>Weight: {Pokemon.weight}</div>
                    <div className='types'>
                        {Pokemon.types.map((el)=> <span key={el} >{el}</span>)}
                    </div>
                </div>)
            }
        </div>
    )
}

export default PokemonDetails;