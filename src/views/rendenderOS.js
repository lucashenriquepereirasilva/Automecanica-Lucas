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
   

// ==============================================================================================


// criar um vetor para manipulação dos dados da OS
let arrayOS = []

// captura dos IDs do form OS
let FrmOS = document.getElementById('frmOS')
let SearchOS = document.getElementById('inputSearchClient')
let NameOS = document.getElementById('inputNameClient')
let idOS = document.getElementById('inputIdClient')
let PhoneOS = document.getElementById('inputPhoneClient')
let CpfOS = document.getElementById('inputCPFClient')
let ConclusãoOS = document.getElementById('inputconclusãoClient')
let OrcamentosOS = document.getElementById('inputOrcamentoClient')
let ResponsavelOS = document.getElementById('inputResponsavel')
let pagOS = document.getElementById('inputpagamentoClient')
// captura da OS (CRUD Delete e Update)
let os = document.getElementById('inputOS')


//Evento associado ao botão submit (uso das validações do html)
frmOS.addEventListener('submit', async (event) => {
    //evitar o comportamento padrão do submit que é enviar os dados do formulário e reiniciar o documento html
    event.preventDefault()
    // validação do campo obrigatório 'idClient' (validação html não funciona via html para campos desativados)
    if (idClient.value === "") {
        api.validateClient()
    } else {
        // Teste importante (recebimento dos dados do formuláro - passo 1 do fluxo)
        console.log(os.value, idClient.value, SearchOS.value, NameOS.value, idOS.value, PhoneOS.value, CpfOS.value, ConclusãoOS.value, orcamentoOS.value, ResponsavelOS.value, pagOS.value )
        if (os.value === "") {
            //Gerar OS
            //Criar um objeto para armazenar os dados da OS antes de enviar ao main
            const os = {
                idClient_OS: idClient.value,
                stat_OS: SearchOS.value,
                computer_OS: NameOS.value,
                serial_OS: idOS.value,
                problem_OS: PhoneOS.value,
                specialist_OS: CpfOS.value,
                diagnosis_OS: ConclusãoOS.value,
                parts_OS: orcamentoOS.value,
                total_OS: ResponsavelOS.value,
                pagOS: pagOS.value
            }
            // Enviar ao main o objeto os - (Passo 2: fluxo)
            // uso do preload.js
            api.newOS(os)
        } else {
            //Editar OS

        }
    }
})


// == Buscar OS - CRUD Read ===================================

function findOS() {
    api.searchOS()
}

api.renderOS((event, dataOS) => {
    console.log(dataOS)
    const os = JSON.parse(dataOS)
    // preencher os campos com os dados da OS
    idOS.value = os._id
    // formatar data:
    const data = new Date(os.dataEntrada)
    const formatada = data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })
    dataOS.value = formatada
    idClient.value = os.idCliente
    statusOS.value = os.status
    computer.value = os.computador
    serial.value = os.serie
    problem.value = os.problema
    specialist.value = os.tecnico
    diagnosis.value = os.diagnostico
    parts.value = os.pecas
    total.value = os.valor
})

// == Fim - Buscar OS - CRUD Read =============================
// ============================================================




  // == fIM - BUSCAR - Busca avancada ==========================




  
  //====================== buscar os =========================

  function inputOS() {
    //console.log("teste do botão")
    api.searchOS()
      }

  
  
  api.resetF((args) => {
    //console.log("teste de recebimento")
   resetF()
  })
  

