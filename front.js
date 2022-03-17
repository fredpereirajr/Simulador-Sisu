var inputNotas = document.querySelectorAll('input');
var listaCurso = document.getElementById('lista-curso');
var valueCurso;
var listaEstado = document.getElementById('lista-estado');
var valueEstado;
var listaCidade = document.getElementById('lista-cidade');
var valueCidade;
var listaModalidade = document.getElementById('lista-modal');
var valueModal;
var BotaoEnviar = document.getElementById('info-submit');
BotaoEnviar.addEventListener("click", sendInfo);

for (let index = 0; index < listaEstado.children.length; index++) {
    const element = listaEstado.children[index];
    element.addEventListener("click",getEstado)
}

async function getAllCurses() {
    var retorno = await fetch('http://localhost:750/cursos');
    var instancia = await retorno.json()

    for (let index = 0; index < instancia.length; index++) {

        var elementLi = document.createElement('li');
        var elementLink = document.createElement('a');
        elementLi.addEventListener("click", getCurso)
        elementLink.setAttribute("value", instancia[index]);
        elementLink.setAttribute("class", "dropdown-item");
        elementLink.setAttribute("href", "#");
        elementLink.textContent = instancia[index];
        elementLi.appendChild(elementLink);
        listaCurso.appendChild(elementLi);
        
    }
}

function getCurso() {
    valueCurso = this.textContent;
    var nomeInputCurso = document.getElementById('nome-input-curso');
    nomeInputCurso.textContent = valueCurso;
}

function getEstado() {
    valueEstado = this.firstChild.getAttribute("value");
    var nomeEstado = this.textContent;
    var nomeInputEstado = document.getElementById('nome-input-estado');
    nomeInputEstado.textContent = nomeEstado;
    getCities();
}

function getCidade() {
    valueCidade = this.firstChild.getAttribute("value");
    var nomeInputCidade = document.getElementById('nome-input-cidade');
    nomeInputCidade.textContent = this.textContent;
    getModalalidades();
}

function getModal() {
    valueModal = this.firstChild.getAttribute("value");
    var nomeInputModalidade = document.getElementById('nome-input-modal');
    nomeInputModalidade.textContent = this.textContent;
}

function sendInfo () {

    var url = "http://localhost:750/notasCortes";

    var notaFinal = 0;
    for (let index = 0; index < inputNotas.length; index++) {

        if (inputNotas[index].value == undefined || inputNotas[index].value == "") {

            alert("Preencha todas as notas")
            return;

        }

        notaFinal = notaFinal + parseFloat(inputNotas[index].value);
    }
    
    if (valueCurso == undefined) {
        alert("Selecione um Curso");
    }else if (valueEstado == undefined) {
        alert("Selecione um Estado");
    }else if(valueCidade == undefined) {
        alert("Selecione uma Cidade");
    }else if(valueModal == undefined) {
        alert("Seleciona uma Modalidade");
    }else {
        var tabela = document.getElementById('tabela-info');
        
        tabela.innerHTML = 
        `<tr>
            <th>COLOCAÇÃO</th>
            <th>NOTA CORTE</th>
            <th>INSTITUIÇÃO</th>
            <th>CAMPUS</th>
            <th>TURNO</th>
            <th>BÔNUS</th>
            <th class="cabecalho-modalidade" >MODALIDADE</th>
        </tr>`;

        var body = {
            curso:valueCurso,
            estado:valueEstado,
            cidade:valueCidade,
            modalidade:valueModal,
            nota:notaFinal/5
        }

        var request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");

        request.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
               
                var arrayNotasCortes = JSON.parse(this.responseText).array;
                
                for (let index = 0; index < arrayNotasCortes.length; index++) {
        
                        if (arrayNotasCortes[index].bonus != 0) {
                            var porcentagem = parseInt(arrayNotasCortes[index].bonus) + "%";
                            var inserirLinha = 
                            `<tr>
                                <td>${index+1}</td>
                                <td>${arrayNotasCortes[index].corte}</td>
                                <td>${arrayNotasCortes[index].instituicao}</td>
                                <td>${arrayNotasCortes[index].campus}</td>
                                <td>${arrayNotasCortes[index].turno}</td>
                                <td>${porcentagem}</td>
                                <td>${arrayNotasCortes[index].cota}</td>
                            </tr>`;
                        }else {
                            var inserirLinha = 
                            `<tr>
                                <td>${index+1}</td>
                                <td>${arrayNotasCortes[index].corte}</td>
                                <td>${arrayNotasCortes[index].instituicao}</td>
                                <td>${arrayNotasCortes[index].campus}</td>
                                <td>${arrayNotasCortes[index].turno}</td>
                                <td>NÃO</td>
                                <td>${arrayNotasCortes[index].cota}</td>
                            </tr>`;
                        }

                    tabela.innerHTML += inserirLinha;   
                }

                if (arrayNotasCortes.length == 0) {
                    alert("NENHUM RESULTADO ENCONTRADO");
                }
            }
        }

        var dados = JSON.stringify(body);
        console.log(dados);
        request.send(dados);

    }
}

async function getCities() {

    valueCidade = undefined;
    listaCidade.innerHTML = "";
    document.getElementById('nome-input-cidade').textContent = "Cidade";
    var elementLi = document.createElement('li');
    var elementLink = document.createElement('a');
    elementLi.addEventListener("click", getCidade);
    elementLink.setAttribute("value", "nao");
    elementLink.setAttribute("class", "dropdown-item");
    elementLink.setAttribute("href", "#");
    elementLink.textContent = "QUALQUER";
    elementLi.appendChild(elementLink);
    listaCidade.appendChild(elementLi);
    
    var estadoSelecionado = valueEstado;
    var retornoCidades = await fetch('http://localhost:750/cidades');
    var dadosIBGE = await retornoCidades.json();

    if (estadoSelecionado != "nao") {
        for (let x = 0; x < dadosIBGE.estados.length; x++) {  
            if (estadoSelecionado == dadosIBGE.estados[x].sigla) {
                for (let j = 0; j < dadosIBGE.estados[x].cidades.length; j++) {
            
                    var cidade = dadosIBGE.estados[x].cidades[j];
                    var elementLi = document.createElement('li');
                    var elementLink = document.createElement('a');
                    elementLi.addEventListener("click", getCidade);
                    elementLink.setAttribute("class", "dropdown-item");
                    elementLink.setAttribute("value", cidade);
                    elementLink.setAttribute("href", "#");
                    elementLink.textContent = cidade;
                    elementLi.appendChild(elementLink);
                    listaCidade.appendChild(elementLi);

                }
            }
        }
    }
}

function getModalalidades() {
    var url = "http://localhost:750/modalidade"

    valueModal = undefined;
    document.getElementById("lista-modal").innerHTML = "";
    document.getElementById("nome-input-modal").textContent = "Modalidade";
    var elementLi = document.createElement('li');
    var elementLink = document.createElement('a');
    elementLi.addEventListener("click", getModal);
    elementLink.setAttribute("class", "dropdown-item");
    elementLink.setAttribute("value", "nao");
    elementLink.setAttribute("href", "#");
    elementLink.textContent = "QUALQUER";
    elementLi.appendChild(elementLink);
    listaModalidade.appendChild(elementLi);

    var body = {
        curso:valueCurso,
        estado:valueEstado,
        cidade:valueCidade
    }

    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function() { 
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
           
            var arrayModalidades = JSON.parse(this.responseText).array;
            
            for (let index = 0; index < arrayModalidades.length; index++) {
                
                var modal = arrayModalidades[index];
                var elementLi = document.createElement('li');
                var elementLink = document.createElement('a');
                elementLi.addEventListener("click", getModal);
                elementLink.setAttribute("class", "dropdown-item");
                elementLink.setAttribute("value", modal);
                elementLink.setAttribute("href", "#");
                elementLink.textContent = modal;
                elementLi.appendChild(elementLink);
                listaModalidade.appendChild(elementLi);
                
            }
        }
    }

    var dados = JSON.stringify(body);
    request.send(dados);

}

getAllCurses();
