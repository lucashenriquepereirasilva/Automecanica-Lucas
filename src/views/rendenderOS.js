//captura dos dados dos inputs do formulario (passo 1 do fluxo)
let frmOS = document.getElementById('frmOS')
let descricaoOS = document.getElementById('serviceDescription')
let dataOS = document.getElementById('inputconclusãoClient')
let orcamentoOS = document.getElementById('inputOrcamentoClient')
let pagamentoOS = document.getElementById('inputpagamentoClient')
let statusOS = document.getElementById('osStatus')

// =======================================================
// == CRUD Creat/Update ==================================

// Evento associado ao botão submit (uso das validações do html)
frmOS.addEventListener('submit', async (event) =>{
    //evitar o comportamento padrao do submit que é enviar os dados do formulario e reiniciar o documento html
    event.preventDefault()
    //Teste importante ( recebimento dos dados do formulario - passo 1 do fluxo)
    console.log(descricaoOS.value, dataOS.value, orcamentoOS.value, pagamentoOS.value, statusOS.value) 

    // Criar um objeto para armazenar os dados do cliente amtes de enviar ao main
    const os = {
        desOS: descricaoOS.value,
        datOS: dataOS.value,
        orcOS: orcamentoOS.value,
        pagOS: pagamentoOS.value,
        staOS: statusOS.value
    }
    // Enviar ao main o objeto client - (Passo 2: fluxo)
    // uso do preload.js
    api.newos(os);

}) 

// == fim CRUD Creat/Update ==============================
// =======================================================


// reset form
function resetF(){
    // limpa os campos e resetar o formulario com as configuracoes
    location.reload()
  }

  // ===========================================
  // busca avancada -  estilo google
  //capturar os ids referentes ao campos do nome

  const input = document.getElementById('inputSearchClient')
  // Capturar o id do ul da lista   de sugestões de clientes
const suggestionList = document.getElementById('viewListSuggestion')
//capturar os campos que vão ser preenchidos
let idClient = document.getElementById('inputIdClient')
let nameClient = document.getElementById('inputNameClient')
let telefoneClient = document.getElementById('inputTelefoneClient')

// vetor usado na manipulação (filtragem) dos dados
let arrayClients = []

// captura em tempo real do input ( digitacação de caracters na caixa de busca)
 input.addEventListener('input', ()=> {
    // Passo 1: capturar o que for digitado na caixa de busca e converter tudo para letras minusculas
    // converter tudo para letras minisculas ( auxilio ao filtro)
    const search = input.value
    console.log(search) // teste  de apoio a logica

    // Passo 2: Enviar ao main um pedido de busca de cliente pelo nome (via preload )
    api.searchClients()

    // recebimento dos clientes no banco de dados

    api.listClients((event, clients)=>{
        //console.log(clients)
    })
    // converter para json os dados do cliente
    const dataClients = JSON.parse(clients)
    //armazenar no vetos os dados dos clientes
    arrayClients = dataClients
    // passo 4 : Filtrarm os dados extraindo nome que tenham relaçao com os
    //  caracteres digitados na busca em tempo real

    const results = arrayClients.filter(c =>
        c.nomeCliente && c.nomeCliente.toLowerCase().includes(search)
    ).slice(0,10) // maximo 10 resultados
    //console.log(results) // IMPORTANTE para o entendimento

    // limpar a lista a cada caracteres digitado
    suggestionList.innerHTML = ""
    // para cada resultado gerar um iten da klistan <li>
    results.forEach(c => {
        const item  =  document.createElement('li')
        item.classList.add('list-group-item', 'list-group-item-action')

        // exibir o nome do cliente
        item.textContent = c.nomeCliente


         // adicionar  a lista ul
    suggestionList.appendChild(item)

    // adicionar um evento do clique no item  da lista para preencher os campos do formulario
        item.addEventListener('click', ()=> {
            idClient.value = c._id
            nameClient.value = c.nomeCliente
            telefoneClient.value = c.telefoneClient
            // limpar o input e recolher a lista
            input.value = ""
            suggestionList.innerHTML = ""
        })


    
})
    })
    // ocultar  a lista e clicar fora
    document.addEventListener('click', (event) => {
        if(!input.contains(event.target) && !suggestionList.contains(event.target)) {
            suggestionList.innerHTML = ""
        }
    })
   





  // == fIM - BUSCAR - Busca avancada ==========================

  //====================== buscar os =========================

  function inputOS() {
    console.log("teste do botão")
    api.searchOS()
      }

  
  
  api.resetF((args) => {
    console.log("teste de recebimento")
   resetF()
  })
  

