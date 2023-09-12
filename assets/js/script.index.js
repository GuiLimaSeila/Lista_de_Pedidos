console.log("test");

class Pedido{
    constructor(cliente, mesa, descricao){
        this.cliente = cliente;
        this.mesa = mesa;
        this.descricao = descricao;
        this.id = this.gerarId();
    }
    gerarId(){
        return Math.floor(Math.random() * 1000);
    }
}

class PedidoLista{
    constructor(){
        this.pedidos = [];
    }
    
    addPedido(pedido){
        if(getInputs() == false){
sendMSG('Preencha todos os campos', 'error');
    } else{
        this.pedidos.push(pedido);
        clearInputs();
        console.log(pedido);
    }
    }
    removePedido(id){
        this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
    }
    updatePedido(id, pedido){
        this.pedidos = this.pedidos.map(pedido => {
            if(pedido.id === id){
                return pedido;
            }
            return pedido;
        });
    }
}

function clearInputs(){
    const cliente = document.getElementById('client').value = '';
    const mesa = document.getElementById('table').value = '';
    const descricao = document.getElementById('description').value = '';
}

function getInputs(){
    const cliente = document.getElementById('client').value;
    const mesa = document.getElementById('table').value;
    const descricao = document.getElementById('description').value;
    if(cliente == "" || mesa == "" || descricao == ""){
        return false;
    }else{
        return true
    }
}

const pedidoLista = new PedidoLista();

function criarPedido(){
    const cliente = document.getElementById('client').value;
    const mesa = document.getElementById('table').value;
    const descricao = document.getElementById('description').value;
    const pedido = new Pedido(cliente, mesa, descricao);

    pedidoLista.addPedido(pedido);

    console.log(pedidoLista.pedidos);
}

function sendMSG(msg, type){
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