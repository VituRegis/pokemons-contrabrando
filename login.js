if (window.localStorage.getItem("u-token")) {
    window.localStorage.removeItem("u-token");
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
        mode: "cors",
        credentials: "same-origin",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(obj)
    })
    
    if (response.status != 201) {
        console.error('Não foi possível realizar a ação desejada')
        window.alert("Não foi possível cadastrar! Verifique os dados e tente novamente!");
        return;
    }

    document.getElementById('login').click();
    
}

async function entrar() {
    var obj = {
      email: null,
      secret: null
    }
    obj.email = document.getElementById('email').value;
    obj.secret = document.getElementById('senha').value;

    const response = await fetch("http://localhost:8080/api/auth/login", {
        mode: "cors",
        credentials: "same-origin",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(obj)
    }).then(async response => {
        if (!response.ok) {
            console.error('Não foi possível realizar a ação desejada')
            window.alert("Usuario ou senha incorretos!");
            throw Error();
        }
        return response.json();
        
    }).then(data => {
        window.localStorage.setItem("u-token", data.token);
        window.location.href="main.html"
    })
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

document.getElementById('login').click();