var currentURL = window.location.href;
var params = new URLSearchParams(currentURL.split('?')[1]);
var getLogin = params.get('ehLogin');

if(getLogin){
    telaLogin();
}else{
    telaRegistrar();
}

function telaLogin(){
    document.getElementById('botao_entrar').style.display = 'flex'
    document.getElementById('botao_cadastrar').style.display = 'none'
    document.getElementById('campos_registrar').style.display = 'none'
}

function telaRegistrar(){
    document.getElementById('botao_entrar').style.display = 'none'
    document.getElementById('botao_cadastrar').style.display = 'flex'
    document.getElementById('campos_registrar').style.display = 'flex';
    
}

function getTiposPokemon(){
    var pokemon = document.getElementById('pokemonSelect').value;

    switch (pokemon) {
        case 'Pikachu':
            document.getElementById('tipoPokemonSelect1').value = 'ELECTRIC';
            document.getElementById('tipoPokemonSelect2').value = 'null';
          break;
        case 'Bulbasaur':
        case 'Ivysaur':
        case 'Venusaur':
            document.getElementById('tipoPokemonSelect1').value = 'GRASS';
            document.getElementById('tipoPokemonSelect2').value = 'POISON';
            break;
        case 'Charmander':
        case 'Charmeleon':
        case 'Charizard':
            document.getElementById('tipoPokemonSelect1').value = 'FIRE';
            document.getElementById('tipoPokemonSelect2').value = 'FLYING';
            break;
        case 'Squirtle':
        case 'Wartortle':
        case 'Blastoise':
            document.getElementById('tipoPokemonSelect1').value = 'WATER';
            document.getElementById('tipoPokemonSelect2').value = 'null';
            break;
        case 'Caterpie':
        case 'Metapod':
            document.getElementById('tipoPokemonSelect1').value = 'BUG';
            document.getElementById('tipoPokemonSelect2').value = 'null';
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