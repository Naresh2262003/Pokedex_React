import usePokemonList from '../../hooks/usePokemonList.js';
import PokemonCard from '../PokemonCard/PokemonCard.jsx';
import './PokedexList.css'

function PokedexList(){
    const [PokemonListState, setPokemonListState] = usePokemonList(false);

    return (
        <div className="pokemon-list-wrapper">
            <div className='pokemon-wrapper'>
                {PokemonListState.isLoading ? "Loading...":
                PokemonListState.Pokemon.map((p)=> <PokemonCard name={p.name} image={p.image} id={p.id} key={p.id}/>)}
            </div>

            <div className="controls">
                <button 
                    disabled={PokemonListState.prevURL==null} 
                    onClick={()=> setPokemonListState((p) => ({...p, URL:p.prevURL}))}
                >
                    prev
                </button>

                <button 
                    disabled={PokemonListState.nextURL==null} 
                    onClick={()=> setPokemonListState((p)=>({...p, URL:p.nextURL}))} 
                >
                    next
                </button>
            </div>
        </div>
    )
}

export default PokedexList;