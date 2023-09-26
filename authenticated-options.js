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
      var addPokemon= document.createElement("a");
      addPokemon.textContent="Adicionar novo pokemon";
      addPokemon.style.backgroundColor="green";
      addPokemon.style.padding="15px";
      addPokemon.style.borderRadius="10px";
      addPokemon.style.textDecoration="none";
      addPokemon.style.color="white";
      addPokemon.href="./anunciar.html";
      var listPokemons= document.createElement("a");
      listPokemons.textContent="Pokemons a venda";
      listPokemons.style.backgroundColor="blue";
      listPokemons.style.padding="15px";
      listPokemons.style.borderRadius="10px";
      listPokemons.style.textDecoration="none";
      listPokemons.style.color="white";
      listPokemons.href="./main.html";
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
      document.getElementsByClassName('header').item(0).append(addPokemon)
      document.getElementsByClassName('header').item(0).append(listPokemons)
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
hideButtons();

addHeader();