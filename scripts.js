var LOGIN;
const login = document.getElementById('login') 
const registrar = document.getElementById('registrar') 

// login.addEventListener('click',telaLogin())
// registrar.addEventListener('click',telaRegistrar())

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


async function cadastrar() {

    var obj = {
        username: null,
        secret: null,
        email: null,
        birthDate: null
    }

    obj.username = document.getElementById('usuario').value;
    obj.email = document.getElementById('email').value;
    obj.secret = document.getElementById('senha').value;
    obj.birthDate = document.getElementById('nascimento').value;

    const response = await fetch("http://localhost:8080/api/person/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    
    if (response.status != 201) {
        console.error('Não foi possível realizar a ação desejada')
    }

    
}

/*
const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

*/