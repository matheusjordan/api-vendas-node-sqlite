import database from '../src/database.js';

function resetarTabela(nomeTabela) {
    try {
        const query = `DELETE FROM ${nomeTabela};`;
        const result = database.exec(query);
        console.log(`Tabela '${nomeTabela}' limpa.`);
    } catch (error) {
        console.error(`Erro ao limpar a tabela '${nomeTabela}': ${error.message}`);
    }
}

function excluirTabela(nomeTabela) {
    try {
        const query = `DROP TABLE ${nomeTabela};`;
        const result = database.exec(query);
        console.log(`Tabela '${nomeTabela}' excluída.`);
    } catch (error) {
        console.error(`Erro ao excluir a tabela '${nomeTabela}': ${error.message}`);
    }
}

function resetarTabelasSequencia() {
    console.log("Iniciando o reset do banco de dados...");
    ['Venda', 'Produtos', 'Clientes'].forEach(t => excluirTabela(t))
    console.log("Reset do banco de dados concluído.");
}

resetarTabelasSequencia();

database.close();
console.log("Conexão com o banco de dados fechada.");