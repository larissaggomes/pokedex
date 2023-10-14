const pokemonname = document.querySelector('.pokemon_name')
const pokemonnumber = document.querySelector('.pokemon_number')
const pokemonimage = document.querySelector('.pokemon_imagem')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonprev = document.querySelector('.btn-prev')
const buttonnext = document.querySelector('.btn-next')

let searchpokemon = 1;

const fethpokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }

}

const renderpokemon = async (pokemon) => {

    pokemonname.innerHTML = 'loading...';
    pokemonname.innerHTML = '';

    const data = await fethpokemon(pokemon);

    if (data) {
        pokemonimage.style.displays = 'block'
        pokemonname.innerHTML = data.name;
        pokemonnumber.innerHTML = data.id;
        pokemonimage.src = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default'];
        input.value = '';   
        searchpokemon = data.id;
    }else{
        pokemonimage.style.displays = 'none'
        pokemonname.innerHTML = 'Not found :c';
        pokemonnumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderpokemon(input.value.toLowerCase());
})

buttonprev.addEventListener('click', () =>{
    if (searchpokemon > 1) {
        searchpokemon -= 1;
        renderpokemon(searchpokemon);   
    }
})

buttonnext.addEventListener('click', () =>{
    searchpokemon += 1;
    renderpokemon(searchpokemon);
})

searchpokemon(searchpokemon)