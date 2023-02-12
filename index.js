const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";
const container = document.querySelector(".container");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

async function fetchPokemons() {
    const response = await fetch(API_URL);
    const pokemons = await response.json();
    return pokemons.results;
}

async function fetchPokemonData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function displayPokemons(pokemons) {
    container.innerHTML = "";
    for (const pokemon of pokemons) {
        const pokemonData = await fetchPokemonData(pokemon.url);
        const pokemonCard = createPokemonCard(pokemonData);
        container.appendChild(pokemonCard);
    }
}

function createPokemonCard(pokemonData) {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.classList.add("pokemon-image");
    pokemonCard.appendChild(pokemonImage);

    const pokemonName = document.createElement("div");
    pokemonName.textContent = pokemonData.name;
    pokemonName.classList.add("pokemon-name");
    pokemonCard.appendChild(pokemonName);

    const pokemonNumber = document.createElement("div");
    pokemonNumber.textContent = "#" + pokemonData.id;
    pokemonNumber.classList.add("pokemon-number");
    pokemonCard.appendChild(pokemonNumber);

    if (pokemonData.types.length > 1) {
        const pokemonTypeDiv = document.createElement("div");
        pokemonTypeDiv.classList.add("pokemon-type-div");
        pokemonCard.appendChild(pokemonTypeDiv);
        const pokemonType = document.createElement("div");
        const typeColor = colours[pokemonData.types[0].type.name.toLowerCase()];
        pokemonType.textContent = pokemonData.types[0].type.name;
        pokemonType.classList.add("pokemon-type");
        pokemonTypeDiv.appendChild(pokemonType);
        pokemonType.style.backgroundColor = typeColor;
        const pokemonType2 = document.createElement("div");
        const typeColor2 = colours[pokemonData.types[1].type.name.toLowerCase()];
        pokemonType2.textContent = pokemonData.types[1].type.name;
        pokemonType2.classList.add("pokemon-type2");
        pokemonTypeDiv.appendChild(pokemonType2);
        pokemonType2.style.backgroundColor = typeColor2;
    } else {
        const pokemonType = document.createElement("div");
        const typeColor = colours[pokemonData.types[0].type.name.toLowerCase()];
        pokemonType.textContent = pokemonData.types[0].type.name;
        pokemonType.classList.add("pokemon-type");
        pokemonCard.appendChild(pokemonType);
        pokemonType.style.backgroundColor = typeColor;
    }

    const pokemonHeight = document.createElement("div");
    pokemonHeight.textContent = "Height: " + pokemonData.height;
    pokemonHeight.classList.add("pokemon-height");
    pokemonCard.appendChild(pokemonHeight);

    const pokemonWeight = document.createElement("div");
    pokemonWeight.textContent = "Weight: " + pokemonData.weight;
    pokemonWeight.classList.add("pokemon-weight");
    pokemonCard.appendChild(pokemonWeight);

    return pokemonCard;
}

searchButton.addEventListener("click", async function() {
    container.innerHTML = '<div class="loading"></div>';
    const searchTerm = searchInput.value.toLowerCase();
    const pokemons = await fetchPokemons();

    setTimeout(async function() {
        const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
        displayPokemons(filteredPokemons);
    }, 1000);
});