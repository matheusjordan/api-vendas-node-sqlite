import database from '../src/Database.js';

function resetarTabela(nomeTabela) {
    try {
        const query = `DELETE FROM ${nomeTabela};`;
        const result = database.exec(query);
        console.log(`Tabela '${nomeTabela}' limpa.`);
    } catch (error) {
        console.error(`Erro ao limpar a tabela '${nomeTabela}': ${error.message}`);
    }
}

function resetarTabelasSequencia() {
    console.log("Iniciando o reset do banco de dados...");
    resetarTabela('Venda');
    resetarTabela('Produtos');
    resetarTabela('Clientes');
    console.log("Reset do banco de dados concluído.");
}

resetarTabelasSequencia();

database.close();
console.log("Conexão com o banco de dados fechada.");