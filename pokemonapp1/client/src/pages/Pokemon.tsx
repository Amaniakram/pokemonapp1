import { useEffect, useState } from "react";

function Pokemon () {

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon")
        .then(res => res.json())
        .then(data => {
            console.log(data.results)
            setPokemons(data.results)
        })
    })


    return (
        <>
            <h1>Pokemon List</h1>

            {
                pokemons.map(pokemon => {
                    return (
                        <div>
                            <h3>{pokemon?.name}</h3>
                            <img src={`https://img.pokemondb.net/artwork/${pokemon?.name}.jpg`}/>
                            <a href={pokemon?.url}>Link</a>
                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}

export default Pokemon;