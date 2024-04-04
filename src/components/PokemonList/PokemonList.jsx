import axios from "axios"
import { useEffect, useState } from "react"
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon"

function PokemonList(){

    const [pokemonList,setPokemonList]=useState([])
    const [isloading ,setIsloading ]=useState([false])

const [pokedeskurl,setpokedeskurl] =useState("https://pokeapi.co/api/v2/pokemon")

    const [prev,setPrev]=useState([''])
    const[next,setNext]=useState([''])

async function download(){
    const response =await axios.get("https://pokeapi.co/api/v2/pokemon")
    const pokemonresult=response.data.results
    const pokemonpromise=pokemonresult.map((pokemon)=>axios.get(pokemon.url))
    const pokemondata=await axios.all(pokemonpromise)

    console.log(pokemondata)

 const Pokedata =pokemondata.map((pokeData) =>{
const pokemon= pokeData.data

return{
    id:pokemon.id,
    name:pokemon.name,
    image:(pokemon.sprites.other) ? 
    pokemon.sprites.other.dream_world.front_default :
    pokemon.sprites.front_shiny,
    types:pokemon.types 
}
    })
    console.log(Pokedata)
    setPokemonList(Pokedata)
    setIsloading(false)
    
}
    useEffect(() => {
        download()

    },[pokedeskurl])

    return(
        <div className="pokemonlist"> 
            <h3>pokemon List...</h3>
            <div className="pokemon-list-wrapper">
            {(isloading) ? "loading..." : 
            pokemonList.map((poke) => <Pokemon name={poke.name} 
            image={poke.image} key={poke.id}/>
            )}
            </div>
            <div className="controls">
                {/* <button disabled={prevurl == undefined}>prev</button> */}
                <button>Next</button>
            </div>
        </div>
    )


}
export default PokemonList