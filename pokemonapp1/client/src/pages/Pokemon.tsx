import { useEffect, useState } from "react";
import auth from "../utils/auth";

function Pokemon() {
    const [pokemon, setPokemon] = useState({
        pokemonName: "",
        pokemonType: "",
        pokemonOrder: 0,
        pokemonAPIId: 0,
        pokemonImage: "",
        pokemonWeight: 0,
    })
    const [pokemonName, setPokemonName] = useState("")
    const [pokemons, setPokemons] = useState({})
    const [display, setDisplay] = useState(true)
    useEffect(() => { })
    const getAPIData = () => {
        console.log(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(res => res.json())
            .then(data => {
                console.log(data, "API")
                setPokemons(data)
                setDisplay(false)
                let pokemon = {
                    pokemonName: pokemons.name,
                    pokemonType: pokemons.types?.[0]?.type?.name ?? 'Unkonown',
                    pokemonOrder: pokemons.order,
                    pokemonAPIId: pokemons.id,
                    pokemonImage: pokemons?.sprites?.front_default ?? '',
                    pokemonWeight: pokemons.weight
                }
                setPokemon(pokemon)
            })
    }


    function savePokemon() {
        console.log(pokemons)

        const pokemonToBeSaved = {
            pokemonName: pokemons.name,
            pokemonType: pokemons.types[0].type.name,
            pokemonOrder: pokemons.order,
            pokemonAPIId: pokemons.id,
            pokemonImage: pokemons.sprites.front_default,
            pokemonWeight: pokemons.weight
        }

        console.log(pokemonToBeSaved);

        fetch("/api/pokemons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(pokemonToBeSaved)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })

        // public pokemonName!: string;
        // pokemonType!:string;
        // pokemonOrder!: number;
        // pokemonAPIId!: number;
        // pokemonImage!: string;
        // pokemonWeight!: number; 
    }


    return (
        <>
        <a href="/favorites">
        <button>Go to Favorites</button>
        </a>
            <h1>Pokemon List</h1>
            {display && <>
                <input
                    type="text"
                    placeholder="Enter Pokemon name to search"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                />
                <button onClick={getAPIData}>Search</button>
            </>

            }

            {pokemons ?
                <div>
                    <h2>Id:{pokemons.id}</h2>
                    <h3>Name : {pokemons.name}</h3>
                    <h4>Order: {pokemons.order}</h4>
                    <h5>Weight: {pokemons.weight}</h5>
                    <h6>Type: {pokemons.types?.[0]?.type?.name ?? 'Unknown'}</h6>
                    {/* <h6>Type :{pokemons.types[0].type.name}</h6> */}
                    <img src={pokemons?.sprites?.front_default ?? ''} alt="Pokemon" />
                    {/* <a href={pokemons?pokemons.species.url}>Link</a> */}
                    <button onClick={savePokemon}>Save Pokemon</button>
                    <hr />
                </div>


                : <h4>No results from API</h4>}



        </>
    )
}

export default Pokemon;