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