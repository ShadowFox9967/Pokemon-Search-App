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

const getPokeInfo = async ()=>
{
    try{
        const pokeNameOrId = inputElement.value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`);
        const data = await response.json();
        console.log(data);
        //Setting the Pokemon Info
        pokeName.textContent = `${data.name.toUpperCase()}`;
        pokeId.textContent = `#${data.id}`;
        pokeWeight.textContent = `${data.weight}`;
        pokeHeight.textContent = `${data.height}`;
        //Type of Pokemon
        pokeType.innerHTML = data.types
        .map(obj => `<span class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`)
        .join(',');
        pokeImg.innerHTML = 
        `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;
        ;
    updateStats(data.stats[0].base_stat,data.stats[1].base_stat,data.stats[2].base_stat,data.stats[3].base_stat,data.stats[4].base_stat,
        data.stats[5].base_stat);
    }catch (err){
        console.log(err);
        resetDisplay();
        alert('Pokémon not found');
    }
}
function updateStats(hpValue, attackValue, defenseValue, specialAttackValue, specialDefenseValue, speedValue)
{
    const maxValues = {
        hp: 255,
        attack: 180,
        defense: 230,
        specialAttack: 194,
        specialDefence: 230,
        speed: 180
    };
    // Update the width of the progress bars using the selected elements
    hp.style.width = `${(hpValue / maxValues.hp) * 100}%`;
    attack.style.width = `${(attackValue / maxValues.attack) * 100}%`;
    defense.style.width = `${(defenseValue / maxValues.defense) * 100}%`;
    spAttack.style.width = `${(specialAttackValue / maxValues.specialAttack) * 100}%`;
    spDefence.style.width = `${(specialDefenseValue / maxValues.specialDefence) * 100}%`;
    speed.style.width = `${(speedValue / maxValues.speed) * 100}%`;
}
const resetDisplay = ()=>{
    hp.style.width = `1%`;
    attack.style.width = `1%`;
    defense.style.width = `1%`;
    spAttack.style.width = `1%`;
    spDefence.style.width = `1%`;
    speed.style.width = `1%`;
}
searchBtn.addEventListener('click',()=>{
    getPokeInfo();
});
