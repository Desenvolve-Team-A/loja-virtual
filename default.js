// usar somente quando necessário limpar a memoria, para utilizar a aplicação normalmente, deixar comentado a linha abaixo;
//localStorage.clear(); // responsavel por apagar a memoria local do navegador assim que a aplicação é iniciada 
class Produto {
    tamanhoSelecionado;
    constructor({ id, titulo, descricao, tamanho, preco, categoria, composicao, estampa, tecido, cor, quantidade, url }) {
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
        this.quantidade = quantidade;
        this.url = url;
        this.tamanhoSelecionado;
    }
    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {
        const { id, titulo, descricao, tamanho, preco, categoria, composicao, estampa, tecido, cor, quantidade, url } = JSON.parse(json);
        return new Produto({ id, titulo, descricao, tamanho, preco, categoria, composicao, estampa, tecido, cor, quantidade, url });
    }
}

let sacolaUsuario;

if (localStorage.getItem("sacolaUsuario")) {
    let sacolaUsuarioString = localStorage.getItem("sacolaUsuario");
    sacolaUsuario = JSON.parse(sacolaUsuarioString).map(produto => new Produto(produto));
} else {
    sacolaUsuario = [];
}

// Funcoes de navegação
function navegarParaHome() {
    window.location.href = "index.html";
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
        window.onload = function () {
            carregarProduto();
        };
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
    adicionarProdutoNaSacola();
    // window.location.href = "compra.html";
    // verificar o pq não renderiza a sacola quando navega;

}

function navegarParaFormulario() {
    window.location.href = "formulario.html";
}


//Funções para tela Produto

function retornaProdutoSelecionadoComoObjetoProduto() {
    let produtoSelecionadoString = localStorage.getItem("produtoSelecionadoString");
    let produto = Produto.fromJson(produtoSelecionadoString);
    return produto;
}

function carregarProduto() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    let nome = document.getElementById("nome");
    let titulo = document.getElementById("tituloDoProdutoSelecionado");
    nome.textContent = produto.titulo;
    titulo.textContent = produto.titulo;
    let desc = document.getElementById("desc");
    desc.textContent = produto.descricao;
    let preco = document.getElementById("precoProduto");
    let precoString = produto.preco.toString().replace(".", ",");
    preco.textContent = precoString;
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
    let imagemProduto = document.getElementById("imagemProdutoSelecionado");
    imagemProduto.src = produto.url;

}

function reduzUmaUnidadeNoProduto() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    if (produto.quantidade > 1) {
        produto.quantidade -= 1;
        let quantidade = document.getElementById("quantidadeProduto");
        quantidade.textContent = produto.quantidade;
        let produtoJSON = produto.toJson();
        localStorage.setItem("produtoSelecionadoString", produtoJSON);
    } else {
        alert("A quantidade minima para compra é de 1 unidade");
    }
}
function aumentaUmaUnidadeNoProduto() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();

    produto.quantidade += 1;
    let quantidade = document.getElementById("quantidadeProduto");
    quantidade.textContent = produto.quantidade;

    let produtoJSON = produto.toJson();
    localStorage.setItem("produtoSelecionadoString", produtoJSON);

    //Descomentar o IF abaixo caso seja implementado o estoque dentro de cada produto no JSON/Class produto

    // if(produto.quantidade <= produto.qtdEmEstoque){
    //     produto.quantidade += 1;
    //     let quantidade = document.getElementById("quantidadeProduto");
    //     quantidade.textContent = produto.quantidade;
    // }else {
    //     alert("Quantidade maxima em estoque atingida!");
    // }
}

function renderizaSacola() {
    let telaSacola = document.getElementById("sacolaDeProdutos");
    if (telaSacola != null) {
        telaSacola.innerHTML = "";
    }

    for (let index = 0; index < sacolaUsuario.length; index++) {
        if (sacolaUsuario[index].titulo == undefined) {
            sacolaUsuario.splice(index, 1);
        }
    }

    for (let index = 0; index < sacolaUsuario.length; index++) {

        let miniaturaSacola = document.createElement("div");
        miniaturaSacola.className = "miniaturaSacola";
        miniaturaSacola.id = `item${index + 1}`;

        let imagemDoProduto = document.createElement("img");
        imagemDoProduto.src = sacolaUsuario[index].url;
        imagemDoProduto.alt = "imagemProduto";

        let nomeProduto = document.createElement("p");
        nomeProduto.id = "nomeProduto";
        nomeProduto.textContent = sacolaUsuario[index].titulo;

        let botaoLixeira = document.createElement("button");
        botaoLixeira.onclick = excluirItemDaSacola();

        let imagemLixeiraSvg = document.createElement("svg");
        imagemLixeiraSvg.xmlns = "http://www.w3.org/2000/svg";
        imagemLixeiraSvg.height = "25px";
        imagemLixeiraSvg.viewBox = "0 -960 960 960";
        imagemLixeiraSvg.width = "25px";
        imagemLixeiraSvg.fill = "#22100c";

        let pathLixeira = document.createElement("path");
        pathLixeira.d = "M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z";

        let tamanhoProduto = document.createElement("p");
        tamanhoProduto.id = "tamanhoProduto";
        tamanhoProduto.textContent = sacolaUsuario[index].tamanhoSelecionado;

        let valorProduto = document.createElement("p");
        valorProduto.id = "valorProduto";
        valorProduto.textContent = sacolaUsuario[index].preco;

        imagemLixeiraSvg.appendChild(pathLixeira);
        botaoLixeira.append(imagemLixeiraSvg);
        miniaturaSacola.appendChild(imagemDoProduto);
        miniaturaSacola.appendChild(nomeProduto);
        miniaturaSacola.appendChild(botaoLixeira);
        miniaturaSacola.appendChild(tamanhoProduto);
        miniaturaSacola.appendChild(valorProduto);
        telaSacola.appendChild(miniaturaSacola);
    }
}

function excluirItemDaSacola() {

}

function adicionarProdutoNaSacola() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    if (produto.titulo != undefined) {
        produto.tamanhoSelecionado = "M";
        sacolaUsuario.push(produto);
        localStorage.removeItem("sacolaUsuario");
        renderizaSacola();
        for (let index = 0; index < sacolaUsuario.length; index++) {
            sacolaUsuario[index] = sacolaUsuario[index].toJson();
        }
        localStorage.setItem("sacolaUsuario", JSON.stringify(sacolaUsuario));
    }
}