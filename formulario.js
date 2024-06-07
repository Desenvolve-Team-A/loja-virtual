let nomeValidado = false;
let emailValidado = false;
let cpfValidado = false;
let telefoneValidado = false;
let cepValidado = false;
let enderecoValidado = false;
let numeroValidado = false;
let complementoValidado = false;
let dataValidada = false;
let cvvValidado = false;
let numeroCartaoValidado = false;
let contents;
let selectedValue;

function radioSelecionado(radio) {
    selectedValue = radio.value;

    contents = document.querySelectorAll('.pagamento');

    if (selectedValue == "pix") {
        contents[0].classList.remove('hidden');
        contents[1].classList.add('hidden');
        contents[2].classList.add('hidden');
    } else if (selectedValue == "cartao") {
        contents[0].classList.add('hidden');
        contents[1].classList.remove('hidden');
        contents[2].classList.add('hidden');
    } else if (selectedValue == "boleto") {
        contents[0].classList.add('hidden');
        contents[1].classList.add('hidden');
        contents[2].classList.remove('hidden');
    }
}

//validação dos inputs
document.addEventListener('DOMContentLoaded', function validandoDadosEntrega() {
    const nomeCompleto = document.getElementById('nome');
    const email = document.getElementById('email');
    const cpf = document.getElementById('cpf');
    const telefone = document.getElementById('telefone');
    const cep = document.getElementById('cep');
    const endereco = document.getElementById('endereço');
    const numero = document.getElementById('numero');


    // Adiciona eventlistener para quando os inputs perderem o foco
    nomeCompleto.addEventListener('blur', function () { validarEntrada(nomeCompleto, validarNomeCompleto); });
    email.addEventListener('blur', function () { validarEntrada(email, validarEmail); });
    cpf.addEventListener('blur', function () { validarEntrada(cpf, validarCPF); });
    telefone.addEventListener('blur', function () { validarEntrada(telefone, validarTelefone); });
    cep.addEventListener('blur', function () { validarEntrada(cep, validarCEP); });
    endereco.addEventListener('blur', function () { validarEntrada(endereco, validarEndereco); });
    numero.addEventListener('blur', function () { validarEntrada(numero, validarNumero); });

    //funções de validação
    function validarNomeCompleto(nomeCompleto) {
        const re = /^[a-zA-Z\s]{4,}$/;
        nomeValidado = re.test(nomeCompleto);
        return re.test(nomeCompleto);
    };

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailValidado = re.test(email);
        return re.test(email);
    };

    function validarCPF(cpf) {
        const re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        cpfValidado = re.test(cpf);
        return re.test(cpf);
    };

    function validarTelefone(telefone) {
        const re = /^\(\d{2}\) ?\d{5}\-?\d{4}$/;
        telefoneValidado = re.test(telefone);
        return re.test(telefone);
    };

    function validarCEP(cep) {
        const re = /^\d{5}\-?\d{3}$/;
        cepValidado = re.test(cep);
        return re.test(cep);
    };
    function validarEndereco(endereco) {
        const re = /^[a-zA-ZÀ-ú0-9\s.,-:;]{3,}$/;
        enderecoValidado = re.test(endereco);
        return re.test(endereco);
    };
    function validarNumero(numero) {
        const re = /^(?=.*\d)[a-zA-Z0-9\s]+$/;
        numeroValidado = re.test(numero);
        return re.test(numero);
    };
});

function validarCartao(numeroCartao) {
    const re = /^\d{16}$/;
    numeroCartaoValidado = true;
    return re.test(numeroCartao);
}

function validarCVV(cvv) {
    const re = /^\d{3}$/;
    cvvValidado = re.test(cvv);
    return re.test(cvv);
}

function validarData(data) {
    const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
    dataValidada = re.test(data);
    return re.test(data);
}

function finalizou() {
    let vetor = [nomeValidado, emailValidado, cpfValidado, telefoneValidado, cepValidado, enderecoValidado, numeroValidado];

    for (let i = 0; i < vetor.length; i++) {
        if (vetor[i] == false) {
            alert("Preencha corretamente!");
        }

    }

    if (selectedValue == "cartao") {
        validaCartao();


        let vetorCartao = [numeroCartaoValidado, cvvValidado, dataValidada];

        for (let i = 0; i < vetorCartao.length; i++) {
            if (vetorCartao[i] == false) {
                return alert("Preencha corretamente!");
            }
        }
    }
    alert("Compra efetuada com sucesso!");
}

function validaCartao() {
    const numeroCartao = document.getElementById('numero-cartao').value;
    const cvv = document.getElementById('codigo-seguranca').value;
    const data = document.getElementById('validade-cartao').value;

    validarData(data);
    validarCVV(cvv); 
    validarCartao(numeroCartao); 
}

function validarEntrada(input, funcao) {
    const error = document.getElementById(`error-${input.id}`);
    if (!funcao(input.value.trim())) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
}

function copyToCliptoboard(){
    let copiado = document.getElementById('numero-boleto')
    navigator.clipboard.writeText(copiado.innerText)
    alert('Código do boleto copiado para área de transferência!')
}
