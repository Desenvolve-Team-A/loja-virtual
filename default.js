let menu = document.getElementById("menu");
let sacola = document.getElementById("sacola");
let container = document.getElementById("container");
let footer = document.getElementById("footer");
let statusMenu = false;
let stautsSacola = false;
let carrinho = [];

class Produto {
    quantidade;
    constructor({ id, titulo, descricao, tamanho, preco, categoria, composicao, estampa, tecido, cor }) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tamanho = tamanho;
        this.preco = preco;
        this.categoria = categoria;
        this.composicao = composicao;
        this.estampa = estampa;
        this.tecido = tecido;
        this.cor = cor;
        this.quantidade = 1;
    }
}

function toggleMenu() {
    statusMenu = !statusMenu;
    if ((statusMenu) && (stautsSacola)) {
        sacola.style.left = "100%";
        stautsSacola = !stautsSacola;
        menu.style.left = "0";
        footer.style.filter = "contrast(50%) blur(2px)";
        container.style.filter = "contrast(50%) blur(2px)";
    } else if (statusMenu) {
        menu.style.left = "0";
        footer.style.filter = "contrast(50%) blur(2px)";
        container.style.filter = "contrast(50%) blur(2px)";
    } else {
        menu.style.left = "-20%";
        footer.style.filter = "none";
        container.style.filter = "none";
    }
}

function toggleSacola() {
    stautsSacola = !stautsSacola;
    if ((statusMenu) && (stautsSacola)) {
        menu.style.left = "-20%";
        statusMenu = !statusMenu;
        sacola.style.left = "70%";
        footer.style.filter = "contrast(50%) blur(2px)";
        container.style.filter = "ccontrast(50%) blur(2px)";
    } else if (stautsSacola) {
        sacola.style.left = "70%";
        footer.style.filter = "contrast(50%) blur(2px)";
        container.style.filter = "contrast(50%) blur(2px)";
    } else {
        sacola.style.left = "100%";
        footer.style.filter = "none";
        container.style.filter = "none";
    }
}

// Funcoes de navegação
function navegarParaHome() {

}

function navegarParaProduto(idProduto, categoria) {
    let produtoSelecionado;
    if (categoria == "camisetas") {
        let camisetasString = localStorage.getItem("listaDeCamisetasJSON");
        let camisetas = JSON.parse(camisetasString);
        for (let index = 0; index < camisetas.length; index++) {
            if (camisetas[index].id == idProduto) {
                produtoSelecionado = camisetas[index];
            }
        }
        let produtoSelecionadoString = JSON.stringify(produtoSelecionado);
        localStorage.setItem("produtoSelecionadoString", produtoSelecionadoString);
        window.location.href = "produto.html";
    } else if (categoria == "calcas") {
        let calcasString = localStorage.getItem("listaDeCalcasJSON");
        let calcas = JSON.parse(calcasString);
        for (let index = 0; index < calcas.length; index++) {
            if (calcas[index].id == idProduto) {
                produtoSelecionado = calcas[index];
            }
        }
        let produtoSelecionadoString = JSON.stringify(produtoSelecionado);
        localStorage.setItem("produtoSelecionadoString", produtoSelecionadoString);
        window.location.href = "produto.html";
    } else if (categoria == "moletons") {
        let moletonsString = localStorage.getItem("listaDeMoletonsJSON");
        let moletons = JSON.parse(moletonsString);
        for (let index = 0; index < moletons.length; index++) {
            if (moletons[index].id == idProduto) {
                produtoSelecionado = moletons[index];
            }
        }
        let produtoSelecionadoString = JSON.stringify(produtoSelecionado);
        localStorage.setItem("produtoSelecionadoString", produtoSelecionadoString);
        window.location.href = "produto.html";
    } else {
        alert("categoria com erro na page index.html");
    }
}

function navegarParaCompra() {
    window.location.href = "compra.html";
}

function navegarParaFormulario() {
    window.location.href = "formulario.html";
}

function carregarProduto() {
    let produtoSelecionadoString = localStorage.getItem("produtoSelecionadoString");
    let produtoSelecionado = JSON.parse(produtoSelecionadoString);
    let produto = new Produto(produtoSelecionado);
    localStorage.removeItem("produtoSelecionadoString");

    let nome = document.getElementById("nome");
    nome.textContent = produto.titulo;
    let desc = document.getElementById("desc");
    desc.textContent = produto.descricao;
    let preco = document.getElementById("precoProduto");
    preco.textContent = produto.preco;
    let quantidade = document.getElementById("quantidadeProduto");
    quantidade.textContent = produto.quantidade;
    let composicao = document.getElementById("composicaoProduto");
    composicao.textContent = produto.composicao;
    let estampa = document.getElementById("estampaProduto");
    estampa.textContent = produto.estampa;
    let tecido = document.getElementById("tecidoProduto");
    tecido.textContent = produto.tecido;
    let cor = document.getElementById("corProduto");
    cor.textContent = produto.cor;
}