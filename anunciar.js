
function getTiposPokemon(){
    var pokemon = document.getElementById('pokemonSelect').value;

    switch (pokemon) {
        case 'Pikachu':
            document.getElementById('tipoPokemonSelect1').value = 'ELECTRIC';
            document.getElementById('tipoPokemonSelect2').value = '';
          break;
        case 'Bulbasaur':
        case 'Ivysaur':
        case 'Venusaur':
            document.getElementById('tipoPokemonSelect1').value = 'GRASS';
            document.getElementById('tipoPokemonSelect2').value = 'POISON';
            break;
        case 'Charmander':
        case 'Charmeleon':
            document.getElementById('tipoPokemonSelect1').value = 'FIRE';
            document.getElementById('tipoPokemonSelect2').value = '';
            break;
        case 'Charizard':
            document.getElementById('tipoPokemonSelect1').value = 'FIRE';
            document.getElementById('tipoPokemonSelect2').value = 'FLYING';
            break;
        case 'Squirtle':
        case 'Wartortle':
        case 'Blastoise':
            document.getElementById('tipoPokemonSelect1').value = 'WATER';
            document.getElementById('tipoPokemonSelect2').value = '';
            break;
        case 'Caterpie':
        case 'Metapod':
            document.getElementById('tipoPokemonSelect1').value = 'BUG';
            document.getElementById('tipoPokemonSelect2').value = '';
            break;
        case 'Butterfree':
            document.getElementById('tipoPokemonSelect1').value = 'BUG';
            document.getElementById('tipoPokemonSelect2').value = 'FLYING';
            break;
        case 'Weedle':
        case 'Kakuna':
        case 'Beedrill':
            document.getElementById('tipoPokemonSelect1').value = 'BUG';
            document.getElementById('tipoPokemonSelect2').value = 'POISON';
            break;
    }
}

async function salvarPokemon() {
    let obj = {
        pokename: document.getElementById('pokemonSelect').value,
        types: [
            document.getElementById('tipoPokemonSelect1').value,
            document.getElementById('tipoPokemonSelect2').value
        ],
        level: document.getElementById('level').value,
        price: document.getElementById('valor').value,
        pixKey: document.getElementById('pix').value
    }
    if (!obj.pokename || !obj.types || !obj.price|| !obj.pixKey) {
        return window.alert("Alguns dados parecem não terem sido preenchidos corretamente, verifique e tente novamente.")
    }
    if (obj.level > 100 || obj.level < 0) {
        return window.alert("O nível do pokemon deve estar entre 0-100")
    }
    const response = await fetch("http://localhost:8080/api/pokemon", {
        mode: "cors",
        credentials: "same-origin",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "u-token": window.localStorage.getItem("u-token")
        },
        body: JSON.stringify(obj)
    }).then(async response => {
        if (!response.ok) {
            console.error('Não foi possível realizar a ação desejada')
            return window.alert("Ocorreu algum erro interno no servidor, tente novamente mais tarde.");
        }
        return window.location.href="./main.html"

    })
}

document.getElementById('tipoPokemonSelect1').value = 'GRASS';
document.getElementById('tipoPokemonSelect2').value = 'POISON';