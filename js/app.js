let amigos = [];

function adicionar() {
    let amigo = document.getElementById("nome-amigo");
    if (amigo.value.trim() === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    // 🔠 Capitaliza a primeira letra do nome digitado
    let nomeFormatado = amigo.value.trim().charAt(0).toUpperCase() + amigo.value.trim().slice(1);

    if (amigos.includes(nomeFormatado)) {
        alert("Amigo já adicionado.");
        amigo.value = "";
        return;
    }

    let lista = document.getElementById("lista-amigos");
    amigos.push(nomeFormatado);
    if (lista.textContent == "") {
        lista.textContent = nomeFormatado;
    } else {
        lista.textContent = lista.textContent + ", " + nomeFormatado;
    }
    amigo.value = "";
}

function sortear() {
    if (amigos.length < 4) {
        alert("Adicione pelo menos 4 amigos para realizar o sorteio.");
        return;
    }

    embaralha(amigos);
    let sorteio = document.getElementById("lista-sorteio");

    // 🧹 Limpa o conteúdo anterior
    sorteio.innerHTML = "";

    for (let i = 0; i < amigos.length; i++) {
        if (i == amigos.length - 1) {
            sorteio.innerHTML += amigos[i] + ' --> ' + amigos[0] + '<br>';
        } else {
            sorteio.innerHTML += amigos[i] + ' --> ' + amigos[i + 1] + '<br>';
        }
    }
}

function embaralha(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);

        // atribuição via destructuring
        [lista[indice - 1], lista[indiceAleatorio]] =
            [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function reiniciar() {
    amigos = [];
    document.getElementById("lista-amigos").innerHTML = "";
    document.getElementById("lista-sorteio").innerHTML = "";
}

// ⌨️ Enter ativa a função adicionar
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionar();
    }
});

// 🧼 Função para remover nome com confirmação e capitalização
function remover() {
    let confirmar = confirm("Tem certeza que deseja remover um nome da lista?");
    if (!confirmar) return;

    let nomeParaRemover = prompt("Digite o nome que deseja remover:");
    if (!nomeParaRemover) return;

    // 🔠 Capitaliza a primeira letra do nome digitado
    let nomeFormatado = nomeParaRemover.trim().charAt(0).toUpperCase() + nomeParaRemover.trim().slice(1);

    let index = amigos.indexOf(nomeFormatado);
    if (index === -1) {
        alert("Nome não encontrado na lista.");
        return;
    }

    amigos.splice(index, 1); // Remove do array

    // Atualiza visualmente a lista
    let lista = document.getElementById("lista-amigos");
    lista.textContent = amigos.join(", ");

    alert(`O nome "${nomeFormatado}" foi removido com sucesso.`);
}
