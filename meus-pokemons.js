async function listarPokemons() {
    return await fetch("http://localhost:8080/api/pokemon/user", {
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
            montarLinhaLista(pokemon);
        }
    })
} 


function criarDisplayVazio() {
    const contentDiv = [...document.querySelectorAll('.content')][0]
    var pokemonDiv=document.createElement("div");
    let mensagem = document.createElement("h3");
    mensagem.textContent="Puxa, você não cadastrou nenhum pokemon...";
    pokemonDiv.appendChild(mensagem);
    contentDiv.appendChild(pokemonDiv)
}

function montarLinhaLista(pokemonModel) {
    const contentDiv = [...document.querySelectorAll('.content')][0]
    var pokemonDiv=document.createElement("div");
    pokemonDiv.className="box";
    pokemonDiv.id=`poke-${pokemonModel.pokeid}`
    var pokemonImage=document.createElement("img");
    pokemonImage.src=b64ImagesByPokemon.get(pokemonModel.pokename.toLowerCase());
    var pokemonTable=document.createElement("table")
    var pokemonHeaderInfo = document.createElement("tr")
    var pokemonInfos = ["Nome", "Primeiro tipo", "Segundo Tipo", "Nivel", "Preço (R$)", "Ações"];
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
    pokemonDiv.appendChild(pokemonTable);
    contentDiv.appendChild(pokemonDiv);

    let deleteButton = document.createElement("a");
    deleteButton.style.padding="10px";
    deleteButton.style.color="white";
    deleteButton.style.backgroundColor="red";
    deleteButton.style.borderRadius="10px";
    deleteButton.style.textDecoration="none";
    deleteButton.textContent="Deletar";
    deleteButton.addEventListener("click", () => {
        deletarPokemonPeloId(pokemonModel.pokeid);
        pokemonDiv.style.display="none"
    })

    let updateButton = document.createElement("a");
    updateButton.style.padding="10px";
    updateButton.style.color="white";
    updateButton.style.backgroundColor="blue";
    updateButton.style.borderRadius="10px";
    updateButton.style.textDecoration="none";
    updateButton.textContent="Atualizar";
    updateButton.addEventListener("click", () => {
        window.localStorage.setItem("updatingObject", JSON.stringify(pokemonModel));
        window.location.href="./atualizar-pokemon.html"
        
    })
    let actionsRow = document.createElement("td");
    actionsRow.style.display="flex";
    actionsRow.style.flexDirection="column";
    actionsRow.appendChild(updateButton);
    actionsRow.appendChild(deleteButton)
    pokemonContentInfo.appendChild(actionsRow);
}


async function deletarPokemonPeloId(id) {
    return await fetch(`http://localhost:8080/api/pokemon/${id}`, {
        mode: "cors",
        credentials: "same-origin",
        method: "DELETE",
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
        let numeroDeElementosDispostos = [...document.querySelectorAll('.box')].filter(el => {
            el.style.display != "none"
        }).length;
        if (numeroDeElementosDispostos == 0) return criarDisplayVazio();
    })
}

listarPokemons();