# Simulador-Sisu 
O Simulador Sisu é uma aplicação feita para simular as chances de aprovação no Sistema de Seleção Unificada (SISU). Como forma de validação, o sistema utiliza os dados mais recentes (Sisu 2022) disponibilizados pelo próprio MEC. 

## Funcionamento
Através das notas do ENEM fornecidas pelo usuário, o sistema retorna todas as notas de corte que forem menores do que a nota fornecida para o cenário especificado na busca.

O sistema de filtragem adotado é bem amplo, tornando-se possível uma filtragem de âmbito nacional (selecionando todos os estado), estadual (selecionando um estado) ou municipal (selecionando um estado e um município). Além disso, também é possível filtrar a partir de uma modalidade de cota especifica.

[Projeto Simulador Sisu](https://github.com/fredpereirajr/Simulador-Sisu/blob/master/estatico/gif-projeto.gif)

## Implementação

Para implementação desta aplicação, foi utilizado na parte do front-end tecnologias como HTML, CSS, Bootstrap e Javascrip. Para o back-end, foi construído um servidor para tratar e recuperar os dados de forma mais otimizada, utilizando para isso Node.js e Express.
