function radioSelecionado(radio){

    let selectedValue = radio.value;

    const contents = document.querySelectorAll('.pagamento');

    if(selectedValue == "pix"){
        contents[0].classList.remove('hidden');
        contents[1].classList.add('hidden');
        contents[2].classList.add('hidden');
       

    } else if (selectedValue == "cartao"){
        contents[0].classList.add('hidden');
        contents[1].classList.remove('hidden');
        contents[2].classList.add('hidden');
        

    } else if (selectedValue == "boleto"){
        contents[0].classList.add('hidden');
        contents[1].classList.add('hidden');
        contents[2].classList.remove('hidden');
      
        
    } else if (selectedValue == "parcelas"){
        contents[0].classList.add('hidden');
        contents[1].classList.add('hidden');
        contents[2].classList.add('hidden');
        
    } else if (selectedValue == ''){
        console.log('a');
    }
};

//validação dos inputs
document.addEventListener('DOMContentLoaded', function() {
    const nomeCompleto = document.getElementById('nome');
    const email = document.getElementById('email');
    const cpf = document.getElementById('cpf');
    const telefone = document.getElementById('telefone');
    const cep = document.getElementById('cep');
    const endereco = document.getElementById('endereço');
    const numero = document.getElementById('numero');
    const numeroCartao = document.getElementById('numero-cartao');
    const cvv = document.getElementById('codigo-seguranca');
    const data = document.getElementById('validade-cartao');

    // Adiciona eventlistener para quando os inputs perderem o foco
    nomeCompleto.addEventListener('blur', function(){validarEntrada(nomeCompleto, validarNomeCompleto); });
    email.addEventListener('blur', function(){validarEntrada(email, validarEmail); });
    cpf.addEventListener('blur', function(){validarEntrada(cpf, validarCPF); });
    telefone.addEventListener('blur', function(){validarEntrada(telefone, validarTelefone); });
    cep.addEventListener('blur', function(){validarEntrada(cep, validarCEP); });
    endereco.addEventListener('blur', function(){validarEntrada(endereco, validarEndereco); });
    numero.addEventListener('blur', function(){validarEntrada(numero, validarNumero); });
    data.addEventListener('blur', function(){validarEntrada(data, validarData()); });
    cvv.addEventListener('blur', function(){validarEntrada(cvv, validarCVV()); });
    numeroCartao.addEventListener('blur', function(){validarEntrada(numeroCartao, validarCartao()); });

    function validarEntrada(input, funcao) {
        const error = document.getElementById(`error-${input.id}`);
        if (!funcao(input.value.trim())) {
            error.style.display = 'block';
        } else {
            error.style.display = 'none';
        }
    };
    //funções de validação
    function validarNomeCompleto(nomeCompleto) {
        const re = /^[a-zA-Z\s]{4,}$/;
        return re.test(nomeCompleto);
    };

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    function validarCPF(cpf) {
        const re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        return re.test(cpf);
    };

    function validarTelefone(telefone) {
        const re = /^\(\d{2}\) ?\d{5}\-?\d{4}$/;
        return re.test(telefone);
    };

    function validarCEP(cep) {
        const re = /^\d{5}\-?\d{3}$/;
        return re.test(cep);
    };
    function validarEndereco(endereco) {
        const re = /^[a-zA-ZÀ-ú0-9\s.,-:;]{3,}$/;
        return re.test(endereco);
    };
    function validarNumero(numero) {
        const re = /^(?=.*\d)[a-zA-Z0-9\s]+$/;
        return re.test(numero);
    };
    
    function validarCartao(numeroCartao) {
        const re = /^\d{16}$/;
        return re.test(numeroCartao);
    };
    function validarCVV(cvv) {
        const re = /^\d{3,4}$/;
        return re.test(cvv);
    };
    function validarData(data) {
        const re = /^\d{2}$/;
        return re.test(data);
    };
    
});


