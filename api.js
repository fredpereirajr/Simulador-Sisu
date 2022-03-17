class Api {
    
   
    constructor (dados) {
        this.dados = dados;
    }

    //Por cidade
    buscarPorCidade (cidade, nomeCurso, nota, cota) {
        var arrayNotasCortes = [];
        var indexNotasCortes = 0;

        for (let index = 0; index < this.dados.length; index++) {

            if (cota == "nao") {
                if ((cidade == this.dados[index].NO_MUNICIPIO_CAMPUS) && (nomeCurso == this.dados[index].NO_CURSO)) {
                    
                    if (this.dados[index].NU_NOTACORTE != 0 && nota > this.dados[index].NU_NOTACORTE ) {
                        
                        arrayNotasCortes[indexNotasCortes] = {};
                        arrayNotasCortes[indexNotasCortes].corte = this.dados[index].NU_NOTACORTE;
                        arrayNotasCortes[indexNotasCortes].instituicao = this.dados[index].NO_IES;
                        arrayNotasCortes[indexNotasCortes].campus = this.dados[index].NO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].cidade = this.dados[index].NO_MUNICIPIO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].estado = this.dados[index].SG_UF_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].grau = this.dados[index].DS_GRAU;
                        arrayNotasCortes[indexNotasCortes].cota = this.dados[index].DS_MOD_CONCORRENCIA;
                        arrayNotasCortes[indexNotasCortes].bonus = this.dados[index].NU_PERCENTUAL_BONUS;
                        arrayNotasCortes[indexNotasCortes].turno = this.dados[index].DS_TURNO;
                        indexNotasCortes++;
                    }
                } 
    
            }else {
                if ((cidade == this.dados[index].NO_MUNICIPIO_CAMPUS) && (nomeCurso == this.dados[index].NO_CURSO) && (cota == this.dados[index].DS_MOD_CONCORRENCIA)) {
                
                    if (this.dados[index].NU_NOTACORTE != 0 && nota > this.dados[index].NU_NOTACORTE ) {
                        arrayNotasCortes[indexNotasCortes] = {};
                        arrayNotasCortes[indexNotasCortes].corte = this.dados[index].NU_NOTACORTE;
                        arrayNotasCortes[indexNotasCortes].instituicao = this.dados[index].NO_IES;
                        arrayNotasCortes[indexNotasCortes].campus = this.dados[index].NO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].cidade = this.dados[index].NO_MUNICIPIO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].estado = this.dados[index].SG_UF_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].grau = this.dados[index].DS_GRAU;
                        arrayNotasCortes[indexNotasCortes].cota = this.dados[index].DS_MOD_CONCORRENCIA;
                        arrayNotasCortes[indexNotasCortes].bonus = this.dados[index].NU_PERCENTUAL_BONUS;
                        arrayNotasCortes[indexNotasCortes].turno = this.dados[index].DS_TURNO;
                        indexNotasCortes++;
                    }
                } 

            }
        }

        return arrayNotasCortes;
    }

    //Por estado
    buscaPorEstado (estado, nomeCurso, nota, cota) {
        var arrayNotasCortes = [];
        var indexNotasCortes = 0;

        if (cota == "nao") {

            for (let index = 0; index < this.dados.length; index++) {
        
                if ((estado == this.dados[index].SG_UF_CAMPUS) && (nomeCurso == this.dados[index].NO_CURSO)) {
                    
                    if (this.dados[index].NU_NOTACORTE != 0 && nota > this.dados[index].NU_NOTACORTE ) {
                        arrayNotasCortes[indexNotasCortes] = {};
                        arrayNotasCortes[indexNotasCortes].corte = this.dados[index].NU_NOTACORTE;
                        arrayNotasCortes[indexNotasCortes].instituicao = this.dados[index].NO_IES;
                        arrayNotasCortes[indexNotasCortes].campus = this.dados[index].NO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].cidade = this.dados[index].NO_MUNICIPIO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].estado = this.dados[index].SG_UF_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].grau = this.dados[index].DS_GRAU;
                        arrayNotasCortes[indexNotasCortes].cota = this.dados[index].DS_MOD_CONCORRENCIA;
                        arrayNotasCortes[indexNotasCortes].bonus = this.dados[index].NU_PERCENTUAL_BONUS;
                        arrayNotasCortes[indexNotasCortes].turno = this.dados[index].DS_TURNO;
                        indexNotasCortes++;
                    }
                } 
            }
        }else {

            for (let index = 0; index < this.dados.length; index++) {
        
                if ((estado == this.dados[index].SG_UF_CAMPUS) && (nomeCurso == this.dados[index].NO_CURSO) && (cota == this.dados[index].DS_MOD_CONCORRENCIA)) {
                    
                    if (this.dados[index].NU_NOTACORTE != 0 && nota > this.dados[index].NU_NOTACORTE ) {
                        arrayNotasCortes[indexNotasCortes] = {};
                        arrayNotasCortes[indexNotasCortes].corte = this.dados[index].NU_NOTACORTE;
                        arrayNotasCortes[indexNotasCortes].instituicao = this.dados[index].NO_IES;
                        arrayNotasCortes[indexNotasCortes].campus = this.dados[index].NO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].cidade = this.dados[index].NO_MUNICIPIO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].estado = this.dados[index].SG_UF_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].grau = this.dados[index].DS_GRAU;
                        arrayNotasCortes[indexNotasCortes].cota = this.dados[index].DS_MOD_CONCORRENCIA;
                        arrayNotasCortes[indexNotasCortes].bonus = this.dados[index].NU_PERCENTUAL_BONUS;
                        arrayNotasCortes[indexNotasCortes].turno = this.dados[index].DS_TURNO;
                        indexNotasCortes++;
                    }
                }  
            }
        }
        return arrayNotasCortes;
    }

    //Busca generelizada/Busca nacional
    buscaGeral (nomeCurso, nota, cota) {
        var arrayNotasCortes = [];
        var indexNotasCortes = 0;

        if (cota == "nao") {
            for (let index = 0; index < this.dados.length; index++) {
        
                if (nomeCurso == this.dados[index].NO_CURSO) {
                    
                    if (this.dados[index].NU_NOTACORTE != 0 && nota > this.dados[index].NU_NOTACORTE ) {
                        arrayNotasCortes[indexNotasCortes] = {};
                        arrayNotasCortes[indexNotasCortes].corte = this.dados[index].NU_NOTACORTE;
                        arrayNotasCortes[indexNotasCortes].instituicao = this.dados[index].NO_IES;
                        arrayNotasCortes[indexNotasCortes].campus = this.dados[index].NO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].cidade = this.dados[index].NO_MUNICIPIO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].estado = this.dados[index].SG_UF_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].grau = this.dados[index].DS_GRAU;
                        arrayNotasCortes[indexNotasCortes].cota = this.dados[index].DS_MOD_CONCORRENCIA;
                        arrayNotasCortes[indexNotasCortes].bonus = this.dados[index].NU_PERCENTUAL_BONUS;
                        arrayNotasCortes[indexNotasCortes].turno = this.dados[index].DS_TURNO;
                        indexNotasCortes++;
                    }
                }
            }
        }else {
            for (let index = 0; index < this.dados.length; index++) {
        
                if (nomeCurso == this.dados[index].NO_CURSO && cota == this.dados[index].DS_MOD_CONCORRENCIA) {
                    
                    if (this.dados[index].NU_NOTACORTE != 0 && nota > this.dados[index].NU_NOTACORTE ) {
                        arrayNotasCortes[indexNotasCortes] = {};
                        arrayNotasCortes[indexNotasCortes].corte = this.dados[index].NU_NOTACORTE;
                        arrayNotasCortes[indexNotasCortes].instituicao = this.dados[index].NO_IES;
                        arrayNotasCortes[indexNotasCortes].campus = this.dados[index].NO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].cidade = this.dados[index].NO_MUNICIPIO_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].estado = this.dados[index].SG_UF_CAMPUS;
                        arrayNotasCortes[indexNotasCortes].grau = this.dados[index].DS_GRAU;
                        arrayNotasCortes[indexNotasCortes].cota = this.dados[index].DS_MOD_CONCORRENCIA;
                        arrayNotasCortes[indexNotasCortes].bonus = this.dados[index].NU_PERCENTUAL_BONUS;
                        arrayNotasCortes[indexNotasCortes].turno = this.dados[index].DS_TURNO;
                        indexNotasCortes++;
                    }
                }
            }
        }
        return arrayNotasCortes;
    }

    getAllCurses() {

        var allCurses = new Array ();

        for (let index = 0; index < this.dados.length; index++) {
            var getCurso = this.dados[index].NO_CURSO;
            for (let j = 0; j <= allCurses.length; j++) {
               if (getCurso == allCurses[j]) {
                   break;
               }else if(j == allCurses.length) {  
                    allCurses[j] = getCurso;
                    break;
               }
                
            }
    
        }
    
        allCurses.sort();

        return allCurses;
            
    }

    getModalidade(cursoEscolhido, estadoEscolhido,cidadeEscolhida) {

        var getModal = new Array ();
        
        /*Modalidade filtrada sem especificar estado nem cidade*/
        if ((estadoEscolhido == cidadeEscolhida) && (estadoEscolhido == "nao")) {
    
            for (let index = 0; index < this.dados.length; index++) {
           
                if (cursoEscolhido == this.dados[index].NO_CURSO) {
        
                    var modal = this.dados[index].DS_MOD_CONCORRENCIA;
        
                    for (let j = 0; j <= getModal.length; j++) {
                        if (modal == getModal[j]) {
                            break;
                        }else if(j == getModal.length) {
                            getModal[j] = modal;
                            break;
                        }
                         
                     }
             
                }
               
            }
        
        /*Modalidade filtrada a partir de um estado e de uma cidade*/
        }else if (estadoEscolhido != "nao" && cidadeEscolhida != "nao") {
    
            for (let index = 0; index < this.dados.length; index++) {
           
                if ((cursoEscolhido == this.dados[index].NO_CURSO) && (this.dados[index].NO_MUNICIPIO_CAMPUS == cidadeEscolhida) && this.dados[index].SG_UF_CAMPUS == estadoEscolhido) {
        
                    var modal = this.dados[index].DS_MOD_CONCORRENCIA;
        
                    for (let j = 0; j <= getModal.length; j++) {
                        if (modal == getModal[j]) {
                            break;
                        }else if(j == getModal.length) {
                            getModal[j] = modal;
                            break;
                        }
                         
                     }
             
                }
               
            }
    
        /*Modalidade filtrada a partir de somente um estado*/
        }else {
    
            for (let index = 0; index < this.dados.length; index++) {
           
                if (cursoEscolhido == this.dados[index].NO_CURSO && this.dados[index].SG_UF_CAMPUS == estadoEscolhido) {
        
                    var modal = this.dados[index].DS_MOD_CONCORRENCIA;
        
                    for (let j = 0; j <= getModal.length; j++) {
                        if (modal == getModal[j]) {
                            break;
                        }else if(j == getModal.length) {
                            getModal[j] = modal;
                            break;
                        }
                         
                     }
             
                }
               
            }
        
        
        }
    
        getModal.sort();

        return getModal;
        
    }
}

module.exports = Api;