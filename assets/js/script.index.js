

class Pedido {
    constructor(cliente, mesa, descricao) {
        this.cliente = cliente;
        this.mesa = mesa;
        this.descricao = descricao;
        this.id = this.gerarId();
    }
    gerarId() {
        return Math.floor(Math.random() * 10000);
    }
}

class PedidoLista {
    constructor() {
        this.pedidos = [];
    }

    addPedido(pedido) {
        if (getInputs() == false) {
            sendMSG('Preencha todos os campos', 'error');
        } else {
            this.pedidos.push(pedido);
            sendMSG('Pedido adicionado com sucesso', 'success');
            document.getElementById('amount').innerHTML = pedidoLista.listarPedidos().length;
            clearInputs();
        }
    }
    listarPedidos() {
        return this.pedidos;
    }
    listarPedidosporId(id) {
        return this.pedidos.find(pedido => pedido.id === id);
    }
    deletarPedido(id) {
        return (this.pedidos = this.pedidos.filter(
            (pedido) => pedido.id != id
        ));
    }

    updatePedido(id, cliente, mesa, descricao) {
        const pedido = this.listarPedidosporId(id);
        pedido.cliente = cliente;
        pedido.mesa = mesa;
        pedido.descricao = descricao;

        return pedido;
    }
}
function clearInputs() {
    const cliente = document.getElementById('client').value = '';
    const mesa = document.getElementById('table').value = '';
    const descricao = document.getElementById('description').value = '';
}

function getInputs() {
    const cliente = document.getElementById('client').value;
    const mesa = document.getElementById('table').value;
    const descricao = document.getElementById('description').value;
    if (cliente == "" || mesa == "" || descricao == "") {
        return false;
    } else {
        return true
    }
}

const pedidoLista = new PedidoLista();

function criarPedido() {
    const cliente = document.getElementById('client').value;
    const mesa = document.getElementById('table').value;
    const descricao = document.getElementById('description').value;
    const pedido = new Pedido(cliente, mesa, descricao);

    pedidoLista.addPedido(pedido);
    listarPedidos()
}

function listarPedidos() {
    const pedidos = pedidoLista.listarPedidos();
    let listaPedidos = document.getElementById('request-area');
    listaPedidos.innerHTML = '';
    pedidos.forEach(pedido => {
        const pedidoDisplay = `
        <div class="card">
        <p>ID: ${pedido.id}</p>
           <p>Cliente: ${pedido.cliente}</p>
           <p>Mesa: ${pedido.mesa}</p>
           <p>Descrição: ${pedido.descricao}</p>
           <div class="btns">
           <button class="editBtn" onclick="atualizarPedido(${pedido.id})">Editar</button>
           <button class="deletBtn" onclick="deletarPedido(${pedido.id})">Excluir</button>
           </div>
        </div>
        `
        listaPedidos.innerHTML += pedidoDisplay;
    });
    contador()
}


function sendMSG(msg, type) {
    let msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = '';

    const msgDisplay = `
<p class="${type}">${msg}</p>
`
    msgDiv.innerHTML = msgDisplay;

    setTimeout(function () {
        msgDiv.innerHTML = '';
    }, 4000);
}

let aux = null;

function atualizarPedido(id) {
    const pedido = pedidoLista.listarPedidosporId(id);

    document.getElementById('client').value = pedido.cliente;
    document.getElementById('table').value = pedido.mesa;
    document.getElementById('description').value = pedido.descricao;

    document.getElementById('btnAtualizar').classList.remove('hidden');
    document.getElementById('btnCriar').classList.add('hidden');

    aux = id;
}

function editarPedido() {
    const cliente = document.getElementById('client').value;
    const mesa = document.getElementById('table').value;
    const descricao = document.getElementById('description').value;

    pedidoLista.updatePedido(aux, cliente, mesa, descricao);

    listarPedidos();
    clearInputs

    document.getElementById('btnAtualizar').classList.add('hidden');
    document.getElementById('btnCriar').classList.remove('hidden');
    sendMSG('Pedido atualizado com sucesso', 'success');
    contador()

}

function deletarPedido(id) {
    pedidoLista.deletarPedido(id);
    listarPedidos();
    clearInputs();
    sendMSG('Pedido deletado com sucesso', 'success');
    contador()
}
function contador() {
    document.getElementById('amount').innerHTML = pedidoLista.listarPedidos().length;
}