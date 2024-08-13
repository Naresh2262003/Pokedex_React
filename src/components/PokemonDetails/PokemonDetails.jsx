import {useParams} from 'react-router-dom'
import usePokemonDetails from '../../hooks/usePokemonDetails';
import './PokemonDetails.css'

function PokemonDetails({PokemonName}){
    const {id}= useParams();
    const [Pokemon]= usePokemonDetails(id,PokemonName);

    console.dir(Pokemon)

    return (
        <div className='pokemon-details'>
            { 
            Object.keys(Pokemon).length === 0 ? <div className='loading'>"Loading..."</div>:
                (
                <div>
                    <div className='pokemon-details-wrapper'>
                        <img className='img' src={Pokemon.image} alt={`Image: ${Pokemon.name} `} />
                        <h2 className='name'>{Pokemon.name}</h2>
                        <div className='height'>Height: {Pokemon.height}</div>
                        <div className='weight'>Weight: {Pokemon.weight}</div>
                        <div className='types'>
                            { Pokemon.types &&  Pokemon.types.map((el)=> <span key={el} >{el}</span>)}
                        </div>
                    </div>

                    {
                        Pokemon.types && Pokemon.similarPokemons &&
                        <div className='similar-pokemon-wrapper'>
                            <h2>More {Pokemon.types[0]} type Pokemons</h2>
                            <ul className='similar-pokemon-list'>
                                {Pokemon.similarPokemons.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                            </ul>
                        </div>
                    }
                </div>
                )
            }
        </div>
    )
}

export default PokemonDetails;