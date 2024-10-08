import useDebounce from '../../hooks/useDebounce';
import './Search.css'

function Search({updateSearchTerm}){
    const debouncedCallback= useDebounce((e)=>updateSearchTerm(e.target.value),500)
    return(
        <div className='search-wrapper'>
            <input 
                id='pokemon-name-search'
                type="text"
                placeholder="Pokemon Name"
                onChange={(e)=>debouncedCallback(e)}
            />
        </div>
    )
}

export default Search;