import { useEffect, useState } from "react";
import auth from "../utils/auth";

function Favorites() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetch("/api/pokemons/favorites", {
            headers: {
                "Authorization": `Bearer ${auth.getToken()}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            setPokemons(data.data)
        })
    }, [])

    return (
        <div>
            <h3>This is the Favorites Page</h3>
            <ul>
                {
                    pokemons.map(pokemon => {
                        return (
                            <li>
                                <h2>Id:{pokemon.pokemonAPIId}</h2>
                                <h3>Name : {pokemon.pokemonName}</h3>
                                <h4>Order: {pokemon.pokemonOrder}</h4>
                                <h5>Weight: {pokemon.pokemonWeight}</h5>
                                <h6>Type: {pokemon.pokemonType}</h6>
                                {/* <h6>Type :{pokemons.types[0].type.name}</h6> */}
                                <img src={pokemon.pokemonImage} alt="Pokemon" />

                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default Favorites;