import './PokemonCard.css'
import {Link} from 'react-router-dom'

function PokemonCard({name , image, id}){
    return (
        <>
        
        <Link to={`/pokemon/${id}`}>
            <div className="pokemon-card" >
                <h3 className='pokemon-name'>{name}</h3>
                <div>
                    <img src={image} />
                </div>
            </div>
        </Link>
        
        </>
    )
}

export default PokemonCard;