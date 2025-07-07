searchBtn.addEventListener('click', searchAlunos);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchAlunos();
});

document.getElementById('cep').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        consultarCEP();
    }
});

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    salvarDados();
});

document.getElementById("listar").addEventListener("click", function() {
    listarDadosSalvos();
});

function salvarDados() {
    const nome = document.getElementById("nome").value.trim();
    if (!nome) {
        alert("Por favor, digite seu nome!");
        return;
    }

    const dados = {
        nome: nome,
        email: document.getElementById("email").value,
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("logradouro").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        UF: document.getElementById("UF").value,
        data: new Date().toLocaleString()
    };

    // Obter dados existentes ou criar um novo array
    let dadosSalvos = JSON.parse(localStorage.getItem("dadosEnderecos")) || [];
    
    // Adicionar novos dados
    dadosSalvos.push(dados);
    
    // Salvar no localStorage
    localStorage.setItem("dadosEnderecos", JSON.stringify(dadosSalvos));

    alert("Dados salvos com sucesso!");
    limparCampos();
}

function listarDadosSalvos() {
    const listaDados = document.getElementById("lista-dados");
    listaDados.innerHTML = ""; // Limpar lista antes de exibir
    
    const dadosSalvos = JSON.parse(localStorage.getItem("dadosEnderecos")) || [];
    
    if (dadosSalvos.length === 0) {
        listaDados.innerHTML = "<p>Nenhum dado salvo ainda.</p>";
        return;
    }
    
    dadosSalvos.forEach((dado, index) => {
        const divDado = document.createElement("div");
        divDado.className = "dado-salvo";
        divDado.innerHTML = `
            <h3>${dado.nome}</h3>
            <p><strong>CEP:</strong> ${dado.cep}</p>
            <p><strong>Email:</strong> ${dado.email}</p>
            <p><strong>Logradouro:</strong> ${dado.logradouro}</p>
            <p><strong>Bairro:</strong> ${dado.bairro}</p>
            <p><strong>Cidade:</strong> ${dado.cidade}</p>
            <p><strong>Estado:</strong> ${dado.estado}</p>
            <p><strong>Data:</strong> ${dado.data}</p>
            <button onclick="removerDado(${index})">Remover</button>
            <hr>
        `;
        listaDados.appendChild(divDado);
    });
}

function removerDado(index) {
    let dadosSalvos = JSON.parse(localStorage.getItem("dadosEnderecos")) || [];
    dadosSalvos.splice(index, 1);
    localStorage.setItem("dadosEnderecos", JSON.stringify(dadosSalvos));
    listarDadosSalvos(); // Atualiza a lista após remoção
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("logradouro").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("UF").value = "";
 } 

function consultarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');


    if (cep.length !== 8) {
        alert("CEP inválido. Por favor, digite um CEP válido.");
        return;
    }
 
 
    const url = `https://viacep.com.br/ws/${cep}/json/`;
 
 
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
                limparCamposEndereco();
            } else {
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('UF').value = data.uf || '';
            }
        })
        .catch(error => {
            alert('Ocorreu um erro ao consultar o CEP.');
            console.error(error);
            limparCamposEndereco();
        });
 }
 

 function limparCamposEndereco() {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('UF').value = '';
 }
 
 async function searchAlunos() {
    const query = searchInput.value.trim();
    
    resultsDiv.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-light" role="status"><span class="visually-hidden">Carregando...</span></div></div>';
    
    if (!query) {
        resultsDiv.innerHTML = '<div class="col-12 text-center"><p class="text-warning">Digite o nome de um aluno para buscar.</p></div>';
        return;
    }

    try {
                
        if (data.results.length === 0) {
            resultsDiv.innerHTML = '<div class="col-12 text-center"><p class="text-light">Nenhum Aluno encontrado. Tente outro.</p></div>';
            return;
        }
        
        displayMovies(data.results);
    } catch (error) {
        resultsDiv.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Ocorreu um erro na busca. Tente novamente mais tarde.</p></div>';
        console.error('Erro:', error);
    }
}