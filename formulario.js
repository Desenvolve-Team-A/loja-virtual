function radioSelecionado(radio) {

    let selectedValue = radio.value;

    const contents = document.querySelectorAll('.pagamento');

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
