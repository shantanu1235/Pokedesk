import "./Pokemon.css"
function Pokemon({name,image}){
return(
    <div className="pokemon-wrapper">
    <div className="pokemon-name">{name}</div>
    <div><img src={image}/></div>
    </div>
)
}
export default Pokemon