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