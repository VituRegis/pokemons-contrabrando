async function listPokemons() {
    return await fetch("http://localhost:8080/api/pokemon", {
        mode: "cors",
        credentials: "same-origin",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "u-token": window.localStorage.getItem("u-token")
        }
    }).then(async response => {
        if (!response.ok) {
            console.error('Não foi possível realizar a ação desejada')
            window.location.href="login.html"
        }
        return response.json();  
    }).then(data => {
        if (!data || data.length == 0) {
            return criarDisplayVazio();
        }
        for(const pokemon of data) {
            appendPokemonToList(pokemon);
        }
    })
}


function criarDisplayVazio() {
    const contentDiv = [...document.querySelectorAll('.content')][0]
    var pokemonDiv=document.createElement("div");
    let mensagem = document.createElement("h3");
    mensagem.textContent="Puxa, ninguém cadastrou um pokemon...";
    pokemonDiv.appendChild(mensagem);
    contentDiv.appendChild(pokemonDiv)
}


function appendPokemonToList(pokemonModel) {
    const contentDiv = [...document.querySelectorAll('.content')][0]
    var pokemonDiv=document.createElement("div");
    pokemonDiv.className="box";
    pokemonDiv.id=`poke-${pokemonModel.pokeid}`
    var pokemonImage=document.createElement("img");
    pokemonImage.src=b64ImagesByPokemon.get(pokemonModel.pokename.toLowerCase());
    var pokemonTable=document.createElement("table")
    var pokemonHeaderInfo = document.createElement("tr")
    var pokemonInfos = ["Nome", "Primeiro tipo", "Segundo Tipo", "Nivel", "Preço (R$)"];
    var pokemonHeaderOptions = pokemonInfos.map(info => {
        var th = document.createElement("th");
        th.textContent=info
        return th
    })
    pokemonHeaderOptions.forEach(el => pokemonHeaderInfo.appendChild(el));
    var pokemonContentInfo = document.createElement("tbody");
    var pokemonContent = [pokemonModel.pokename, 
        pokemonModel.types[0]??"", 
        pokemonModel.types[1] == ""?"Não possui": pokemonModel.types[1], 
        pokemonModel.level,
        pokemonModel.price.toFixed(2)].map(attr => {
        var td = document.createElement("td")
        td.textContent=attr
        return td
    })
    pokemonContent.forEach(el => pokemonContentInfo.appendChild(el));
    pokemonTable.appendChild(pokemonHeaderInfo);
    pokemonTable.appendChild(pokemonContentInfo);
    pokemonDiv.appendChild(pokemonImage);
    pokemonDiv.appendChild(pokemonTable);
    var linkContainer = document.createElement("div")
    linkContainer.className="pokemon_nome"
    var linkCompra = document.createElement("a");
    linkCompra.textContent=pokemonModel.pokename
    linkCompra.className="linkComprar"
    linkContainer.appendChild(linkCompra)
    linkCompra.addEventListener("click", evt => {
        window.alert(`Para comprar o ${pokemonModel.pokename}, pague R$${pokemonModel.price.toFixed(2)} na seguinte chave pix\n
            ${pokemonModel.pixKey??"5UU4qfkE7LwnTmhHPFUGkjmp4GU9u3Md"}
        `)
    })

    pokemonDiv.appendChild(pokemonTable);
    pokemonDiv.appendChild(linkContainer);
    contentDiv.appendChild(pokemonDiv);

}

listPokemons();