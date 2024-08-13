import Search from "../Search/Search";
import PokedexList from "../PokedexList/PokedexList";
import { useState } from "react";
import './Pokedex.css'
import PokemonDetails from "../PokemonDetails/PokemonDetails";

function Pokedex(){
    const [searchTerm, setSearchTerm]= useState("");

    return (
        <div className="pokedex-wrapper">
            <Search updateSearchTerm={setSearchTerm} />
            {(!searchTerm) ? <PokedexList/>:<PokemonDetails key={searchTerm} PokemonName={searchTerm} />}
        </div>
    )
}

export default Pokedex;