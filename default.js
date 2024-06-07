// usar somente quando necessário limpar a memoria, para utilizar a aplicação normalmente, deixar comentado a linha abaixo;
//localStorage.clear(); // responsavel por apagar a memoria local do navegador assim que a aplicação é iniciada 
class Produto {
    constructor({ id, titulo, descricao, tamanho, preco, categoria, composicao, estampa, tecido, cor, quantidade, url, tamanhoSelecionado }) {
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
        this.tamanhoSelecionado = tamanhoSelecionado;
    }
    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {
        const { id, titulo, descricao, tamanho, preco, categoria, composicao, estampa, tecido, cor, quantidade, url, tamanhoSelecionado } = JSON.parse(json);
        return new Produto({ id, titulo, descricao, tamanho, preco, categoria, composicao, estampa, tecido, cor, quantidade, url, tamanhoSelecionado });
    }
}

let sacolaUsuario = [];

function inicializaSacola() {
    if (localStorage.getItem("sacolaUsuario")) {
        let sacolaUsuarioString = localStorage.getItem("sacolaUsuario");
        let sacolaUsuarioJSON = JSON.parse(sacolaUsuarioString);
        for (let index = 0; index < sacolaUsuarioJSON.length; index++) {
            let produtoNaSacola = Produto.fromJson(sacolaUsuarioJSON[index]);
            sacolaUsuario.push(produtoNaSacola);
        }
    }
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
    window.location.href = "compra.html"
}

function navegarParaFormulario() {
    window.location.href = "formulario.html";
}

function navegarParaCamisas() {
    window.location.href = "camisa.html";
}

function navegarParaMoletons() {
    window.location.href = "moletom.html";
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

    let botoesDeTamanho = document.getElementById("botoesDeTamanhoProdutoSelecionado");
    for (let index = 0; index < produto.tamanho.length; index++) {
        let botaotamanho = document.createElement("button");
        botaotamanho.textContent = produto.tamanho[index];
        botaotamanho.id = `botaoTamanhoId${index + 1}`;
        if (produto.tamanho[index] == "P") {
            botaotamanho.onclick = determinaTamanhoSelecionadoP;
        } else if (produto.tamanho[index] == "M") {
            botaotamanho.onclick = determinaTamanhoSelecionadoM;
        } else if (produto.tamanho[index] == "G") {
            botaotamanho.onclick = determinaTamanhoSelecionadoG;
        } else if (produto.tamanho[index] == "GG") {
            botaotamanho.onclick = determinaTamanhoSelecionadoGG;
        } else if (produto.tamanho[index] == "38") {
            botaotamanho.onclick = determinaTamanhoSelecionado38;
        } else if (produto.tamanho[index] == "40") {
            botaotamanho.onclick = determinaTamanhoSelecionado40;
        } else if (produto.tamanho[index] == "42") {
            botaotamanho.onclick = determinaTamanhoSelecionado42;
        } else if (produto.tamanho[index] == "44") {
            botaotamanho.onclick = determinaTamanhoSelecionado44;
        }

        botoesDeTamanho.appendChild(botaotamanho);
    }

}

function determinaTamanhoSelecionadoP() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    // alterar estilo do botao para deixar com hover ativo após clicar
    produto.tamanhoSelecionado = "P";
    let produtoJSON = produto.toJson();
    localStorage.setItem("produtoSelecionadoString", produtoJSON);
}

function determinaTamanhoSelecionadoM() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    // alterar estilo do botao para deixar com hover ativo após clicar
    produto.tamanhoSelecionado = "M";
    let produtoJSON = produto.toJson();
    localStorage.setItem("produtoSelecionadoString", produtoJSON);
}
function determinaTamanhoSelecionadoG() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    // alterar estilo do botao para deixar com hover ativo após clicar
    produto.tamanhoSelecionado = "G";
    let produtoJSON = produto.toJson();
    localStorage.setItem("produtoSelecionadoString", produtoJSON);
}
function determinaTamanhoSelecionadoGG() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    // alterar estilo do botao para deixar com hover ativo após clicar
    produto.tamanhoSelecionado = "GG";
    let produtoJSON = produto.toJson();
    localStorage.setItem("produtoSelecionadoString", produtoJSON);
}
function determinaTamanhoSelecionado38() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    // alterar estilo do botao para deixar com hover ativo após clicar
    produto.tamanhoSelecionado = "38";
    let produtoJSON = produto.toJson();
    localStorage.setItem("produtoSelecionadoString", produtoJSON);
}
function determinaTamanhoSelecionado40() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    // alterar estilo do botao para deixar com hover ativo após clicar
    produto.tamanhoSelecionado = "40";
    let produtoJSON = produto.toJson();
    localStorage.setItem("produtoSelecionadoString", produtoJSON);
}
function determinaTamanhoSelecionado42() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    // alterar estilo do botao para deixar com hover ativo após clicar
    produto.tamanhoSelecionado = "42";
    let produtoJSON = produto.toJson();
    localStorage.setItem("produtoSelecionadoString", produtoJSON);
}
function determinaTamanhoSelecionado44() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    // alterar estilo do botao para deixar com hover ativo após clicar
    produto.tamanhoSelecionado = "44";
    let produtoJSON = produto.toJson();
    localStorage.setItem("produtoSelecionadoString", produtoJSON);
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
        botaoLixeira.onclick = excluirItemDaSacola;

        let imagemLixeiraSacola = document.createElement("img");
        imagemLixeiraSacola.id = "iconeLixeiraDentroDaSacola"
        imagemLixeiraSacola.src = "imagensLoja/lixeiraSacola.png";

        let tamanhoProduto = document.createElement("p");
        tamanhoProduto.id = "tamanhoProduto";
        tamanhoProduto.textContent = sacolaUsuario[index].tamanhoSelecionado;

        let valorProduto = document.createElement("p");
        valorProduto.id = "valorProduto";
        valorProduto.textContent = sacolaUsuario[index].preco;

        botaoLixeira.appendChild(imagemLixeiraSacola);
        miniaturaSacola.appendChild(imagemDoProduto);
        miniaturaSacola.appendChild(nomeProduto);
        miniaturaSacola.appendChild(botaoLixeira);
        miniaturaSacola.appendChild(tamanhoProduto);
        miniaturaSacola.appendChild(valorProduto);
        telaSacola.appendChild(miniaturaSacola);
    }
}

function clickAdicionaProdutoNaSacola() {
    adicionarProdutoNaSacola();
    inicializaSacola()
    renderizaSacola();
}

function renderizaListaDaTelaSacola() {

    let telaListaDaPageSacola = document.getElementById("listaDaPageSacola");

    for (let index = 0; index < sacolaUsuario.length; index++) {
        if (sacolaUsuario[index].titulo == undefined) {
            sacolaUsuario.splice(index, 1);
        }
    }

    for (let index = 0; index < sacolaUsuario.length; index++) {

        let miniaturaCard = document.createElement("div");
        miniaturaCard.className = "miniaturaCard";
        miniaturaCard.id = `item${index + 1}`;

        let imagemDoProduto = document.createElement("img");
        imagemDoProduto.src = sacolaUsuario[index].url;
        imagemDoProduto.alt = "imagemProduto";

        let nomeProduto = document.createElement("p");
        nomeProduto.id = "nomeProduto";
        nomeProduto.textContent = sacolaUsuario[index].titulo;

        let botaoLixeira = document.createElement("button");
        botaoLixeira.className = "excluir";
        botaoLixeira.id = "iconeLixeiraDentroDaSacola";
        botaoLixeira.onclick = excluirItemDaSacola;

        let imagemLixeiraSacola = document.createElement("img");
        imagemLixeiraSacola.id = "iconeLixeiraDentroDaSacola"
        imagemLixeiraSacola.src = "imagensLoja/lixeiraSacola.png";

        let tamanhoProduto = document.createElement("p");
        tamanhoProduto.className = "tamanho";
        tamanhoProduto.id = "tamanhoProduto";
        tamanhoProduto.textContent = sacolaUsuario[index].tamanhoSelecionado;

        let valorProduto = document.createElement("p");
        valorProduto.id = "valorProduto";
        valorProduto.className = "valor";
        valorProduto.textContent = sacolaUsuario[index].preco;

        let quantidadeproduto = document.createElement("div");
        quantidadeproduto.className = "quantidade";

        let botaoAdicionarQuantidade = document.createElement("button");
        botaoAdicionarQuantidade.textContent = "+";
        botaoAdicionarQuantidade.onclick = aumentaUmaUnidadeNoProduto;

        let botaoRemoverQuantidade = document.createElement("button");
        botaoRemoverQuantidade.textContent = "-";
        botaoRemoverQuantidade.onclick = reduzUmaUnidadeNoProduto;

        let visorDeQuantidadeDoProduto = document.createElement("span");
        visorDeQuantidadeDoProduto.id = "quantidadeProduto";

        quantidadeproduto.appendChild(botaoRemoverQuantidade);
        quantidadeproduto.appendChild(visorDeQuantidadeDoProduto);
        quantidadeproduto.appendChild(botaoAdicionarQuantidade);

        miniaturaCard.appendChild(imagemDoProduto);
        miniaturaCard.appendChild(nomeProduto);
        miniaturaCard.appendChild(botaoLixeira);
        miniaturaCard.appendChild(tamanhoProduto);
        miniaturaCard.appendChild(valorProduto);
        miniaturaCard.appendChild(quantidadeproduto);
        telaListaDaPageSacola.appendChild(miniaturaCard);
    }
}

function excluirItemDaSacola() {

}

function adicionarProdutoNaSacola() {
    let produto = retornaProdutoSelecionadoComoObjetoProduto();
    if (produto) {
        sacolaUsuario.push(produto);
        localStorage.removeItem("sacolaUsuario");
        for (let index = 0; index < sacolaUsuario.length; index++) {
            sacolaUsuario[index] = sacolaUsuario[index].toJson();
        }
        localStorage.setItem("sacolaUsuario", JSON.stringify(sacolaUsuario));
    }
}