const pokeImg = document.querySelector('.pokemon-image');
const pokeName = document.getElementById('pokemon-name');
const pokeId = document.getElementById('pokemon-id');
const pokeWeight = document.getElementById('weight');
const pokeHeight = document.getElementById('height');
const pokeType = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const spAttack = document.getElementById('special-attack');
const spDefence = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchBtn = document.getElementById('search-button');
const inputElement = document.getElementById('search-input');

const getPokeInfo = async () => {
    try {
        const pokeNameOrId = inputElement.value.toLowerCase();
        const response = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokeNameOrId}`
        );
        const data = await response.json();
        // Setting the Pokémon Info
        pokeName.textContent = `${data.name.toUpperCase()}`;
        pokeId.textContent = `#${data.id}`;
        pokeWeight.textContent = `${data.weight}`;
        pokeHeight.textContent = `${data.height}`;
        // Type of Pokémon
        pokeType.innerHTML = data.types
            .map(obj => `<span class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`)
            .join(', ');
        pokeImg.innerHTML = `
            <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
        `;
        // Update stats
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        spAttack.textContent = data.stats[3].base_stat;
        spDefence.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;
    } catch (err) {
        console.log(err);
        resetDisplay();
        alert('Pokémon not found');
    }
}

const resetDisplay = () => {
    pokeName.textContent = '--';
    pokeId.textContent = '--';
    pokeWeight.textContent = '--';
    pokeHeight.textContent = '--';
    pokeType.innerHTML = '--';
    hp.textContent = '--';
    attack.textContent = '--';
    defense.textContent = '--';
    spAttack.textContent = '--';
    spDefence.textContent = '--';
    speed.textContent = '--';
    pokeImg.innerHTML = '';
}

searchBtn.addEventListener('click', () => {
    getPokeInfo();
});
