async function addHeader() {
      return await fetch("http://localhost:8080/api/person/current", {
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
        var userInfoBox=document.createElement("div");
        userInfoBox.className="user-info";
        userInfoBox.textContent=`Logado como: ${data.username}`;
        var logoffButton= document.createElement("a");
        logoffButton.textContent="Deslogar";
        logoffButton.style.backgroundColor="red";
        logoffButton.style.padding="15px";
        logoffButton.style.borderRadius="10px";
        logoffButton.style.textDecoration="none";
        logoffButton.style.color="white";
        logoffButton.addEventListener("click", evt => {
            window.localStorage.removeItem("u-token")
            window.location.href="login.html"
        });
        document.getElementsByClassName('header').item(0).append(userInfoBox)
        document.getElementsByClassName('header').item(0).append(logoffButton)
      })
}


function hideButtons() {
    var buttons = [...document.querySelectorAll('.botao_login')]
    buttons.forEach(btn => btn.style.display="none")
}

if (!window.localStorage.getItem("u-token") || window.localStorage.getItem("u-token") == "") {
    window.location.href="login.html"
}


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
        for(const pokemon of data) {
            appendPokemonToList(pokemon);
        }
    })
}
function appendPokemonToList(pokemonModel) {
    const contentDiv = [...document.querySelectorAll('.content')][0]
    var pokemonDiv=document.createElement("div");
    pokemonDiv.className="box";
    pokemonDiv.id=`poke-${pokemonModel.pokeid}`

    /*
    <table>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Nível</th>
                    </tr>
                    <tbody> <!-- INCLUIR PELO JS --> 
                        <td>Charizard</td>
                        <td>Fogo</td>
                        <td>36</td>
                    </tbody>
                </table>
    */
    var pokemonTable=document.createElement("table")
    var pokemonHeaderInfo = document.createElement("tr")
    var pokemonInfos = ["Nome", "Primeiro tipo", "Segundo Tipo", "Nivel", "Preço"];
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
        pokemonModel.price].map(attr => {
        var td = document.createElement("td")
        td.textContent=attr
        return td
    })
    pokemonContent.forEach(el => pokemonContentInfo.appendChild(el));
    pokemonTable.appendChild(pokemonHeaderInfo);
    pokemonTable.appendChild(pokemonContentInfo)
    pokemonDiv.appendChild(pokemonTable);
    var linkContainer = document.createElement("div")
    linkContainer.className="pokemon_nome"
    var linkCompra = document.createElement("a");
    linkCompra.textContent=pokemonModel.pokename
    linkCompra.className="linkComprar"
    linkContainer.appendChild(linkCompra)
    linkCompra.addEventListener("click", evt => {
        window.alert(`Para comprar o ${pokemonModel.pokename}, pague R$${pokemonModel.price} na seguinte chave pix\n
            5UU4qfkE7LwnTmhHPFUGkjmp4GU9u3Md
        `)
    })

    pokemonDiv.appendChild(pokemonTable);
    pokemonDiv.appendChild(linkContainer);
    contentDiv.appendChild(pokemonDiv);

}

hideButtons();

addHeader();

listPokemons();