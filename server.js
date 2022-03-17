const express = require('express');
const cors = require('cors');
var bodyParse =  require('body-parser')
const app = express();
var porta = 750;

const classeApi = require("./api.js");
const ibgeApi = require("./cidadesApi.js");


const XLSX = require("xlsx"); // Lib para extrair dados de quase todas as planilhas.
const dataBase = XLSX.readFile("./SISU2022.xlsx");
var dados = [];

// Convertendo XLSX para JSON
for (var nomefolha of dataBase.SheetNames) {
    
    if (nomefolha == "inscricao_2022_1") {
      dados = XLSX.utils.sheet_to_json(dataBase.Sheets[nomefolha]);
    }
    
}

const API = new classeApi(dados);

app.use(cors());

//app.use(bodyParse.urlencoded({extended: true}));

app.use(express.urlencoded({extended: false})); 
app.use(express.json());
/*Altera o formato da requisição recebida via post*/


app.get("/cursos", function (req, res) {
    var pega = API.getAllCurses();
    pega = JSON.stringify(pega);
    res.send(pega)
});

app.get("/cidades", function (req, res) {
    var pega = JSON.stringify(ibgeApi["dadosIBGE"]);
    res.send(pega)
});


/*Tem que enviar os dados por post */
app.post("/modalidade", function (req, res) {
    var requisicao = req.body;
    var curso = requisicao.curso;
    var estado = requisicao.estado;
    var cidade = requisicao.cidade;

    var arrayModalidades = API.getModalidade(curso, estado, cidade);
    
    /*Ao enviar uma resposta para o cliente, o conteúdo é transformado em um JSOM. Por isso a necessidade de colocar o array de modalidade dentro de um objeto, assim será possível de obter os dados no cliente através de uma conversão de JSOM para Objeto. */

    var obj = new Object()
    obj.array = arrayModalidades;
     
    res.send(obj);

    /*
    
    console.log(req.body);
    var requisicao = JSON.parse(JSON.stringify(req.body));
    var bodyReq;

    //console.log(requisicao);

    for (prop in requisicao) {
        bodyReq = prop;
    }

    var objetoBody  = JSON.parse(bodyReq);
    var curso = objetoBody.curso;
    var estado = objetoBody.estado;
    var cidade = objetoBody.cidade;

    console.log(curso, estado, cidade);

    var arrayModalidades = API.getModalidade(curso, estado, cidade);
     
    console.log(arrayModalidades);
    res.send(JSOM.stringify(arrayModalidades));
    */
     
});

app.post("/notasCortes", function (req, res) {
    var requisicao = req.body;
    var curso = requisicao.curso;
    var estado = requisicao.estado;
    var cidade = requisicao.cidade;
    var modalidade = requisicao.modalidade;
    var nota = requisicao.nota;
    
    console.log(curso,estado,cidade, modalidade, nota);
    
    var arrayNotasCortes = [];
    //Buscar generelizada (Busca nacional)
    if (cidade == estado && cidade == "nao") {
        arrayNotasCortes =  API.buscaGeral(curso, nota, modalidade);
     //Busca mais especifica (Busca por cidade)
     }else if (estado != "nao" && cidade != "nao") {
        arrayNotasCortes =  API.buscarPorCidade(cidade, curso, nota, modalidade);
     //Busca intermediária (Busca por estado)    
     }else {
        arrayNotasCortes =  API.buscaPorEstado(estado, curso, nota, modalidade)
     }

    /*Ordenando por nota de corte */
    arrayNotasCortes.sort(function comparar(a, b) {
        if (a.corte < b.corte) {
        return -1;
        }
        if (a.corte > b.corte) {
        return 1;
        }
        // a deve ser igual a b
        return 0;
    })

    var obj = new Object()
    obj.array = arrayNotasCortes;
     
    res.send(obj);
});

app.listen(porta, function () {
    console.log(`Sevidor escutando na porta ${porta}`);
});
