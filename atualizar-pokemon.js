function atualizarFormulario() {
    document.getElementById('level').value=updatingObject.level
    document.getElementById('valor').value=updatingObject.price
    document.getElementById('pokemonSelect').value=updatingObject.pokename
    document.getElementById('pix').value=updatingObject.pixKey
    let changeEvt = new Event('change')
    document.getElementById('pokemonSelect').dispatchEvent(changeEvt)
}


if (!window.localStorage.getItem('updatingObject')) {
    window.location.href="./main.html"
}
var updatingObject = JSON.parse(window.localStorage.getItem('updatingObject'));
window.localStorage.removeItem('updatingObject')

atualizarFormulario()


async function atualizarPokemon() {
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
    const response = await fetch(`http://localhost:8080/api/pokemon/${updatingObject.pokeid}`, {
        mode: "cors",
        credentials: "same-origin",
        method: "PUT",
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
        return window.location.href="./meus-pokemons.html"

    })
} 

