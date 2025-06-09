// criarVendas.js

const BASE_URL = "http://localhost:3000";

async function fetchData(endpoint) {
    try {
        const url = `${BASE_URL}/${endpoint}`;
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar dados de ${endpoint}: ${error.message}`);
        return null;
    }
}

async function criarVenda(clienteId, produtoId, quantidade) {
    const url = `${BASE_URL}/vendas`;
    const headers = {
        "Content-Type": "application/json"
    };
    const payload = {
        cliente_id: clienteId,
        produto_id: produtoId,
        quantidade: quantidade
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({ message: response.statusText }));

        if (!response.ok) {
            // Lidar com erros específicos da API
            if (response.status === 400 && data.message && data.message.includes('Estoque insuficiente')) {
                console.warn(`Venda FALHOU (Estoque Insuficiente): Cliente ID ${clienteId}, Produto ID ${produtoId}, Qtd ${quantidade}. Mensagem: ${data.message}`);
            } else if (response.status === 404 && data.message && (data.message.includes('Produto com ID') || data.message.includes('Cliente com ID'))) {
                 console.warn(`Venda FALHOU (Cliente/Produto não Encontrado): Cliente ID ${clienteId}, Produto ID ${produtoId}, Qtd ${quantidade}. Mensagem: ${data.message}`);
            }
            else {
                console.error(`Erro HTTP ao criar venda (Status: ${response.status}): Cliente ID ${clienteId}, Produto ID ${produtoId}, Qtd ${quantidade}. Erro: ${data.message || response.statusText}`);
            }
            return null;
        }

        console.log(`Venda ${data.id} criada para Cliente ID ${clienteId}, Produto ID ${produtoId}, Qtd ${quantidade}.`);
        return data;
    } catch (error) {
        console.error(`Erro de rede/outros ao criar venda: ${error.message}`);
        return null;
    }
}

async function main() {
    console.log("Iniciando criação de vendas aleatórias...\n");

    // 1. Buscar clientes e produtos existentes na API
    const clientes = await fetchData("clientes");
    const produtos = await fetchData("produtos");

    if (!clientes || clientes.length === 0) {
        console.error("Não há clientes disponíveis no banco de dados. Execute 'node criarClientes.js' primeiro.");
        return;
    }
    if (!produtos || produtos.length === 0) {
        console.error("Não há produtos disponíveis no banco de dados. Execute 'node criarProdutos.js' primeiro.");
        return;
    }

    const numVendasParaGerar = 5;
    console.log(`Serão geradas ${numVendasParaGerar} tentativas de vendas aleatórias.`);

    for (let i = 0; i < numVendasParaGerar; i++) {
        // 2. Randomizar cliente e produto
        const clienteAleatorio = clientes[Math.floor(Math.random() * clientes.length)];
        const produtoAleatorio = produtos[Math.floor(Math.random() * produtos.length)];

        // 3. Randomizar a quantidade entre 1 e 10
        const quantidadeAleatoria = Math.floor(Math.random() * 3) + 1;

        console.log(`\n--- Tentativa de Venda ${i + 1}/${numVendasParaGerar} ---`);
        console.log(`  Cliente: ${clienteAleatorio.nome} (ID: ${clienteAleatorio.id})`);
        console.log(`  Produto: ${produtoAleatorio.nome} (ID: ${produtoAleatorio.id}) - Estoque atual: ${produtoAleatorio.estoque}`);
        console.log(`  Quantidade solicitada: ${quantidadeAleatoria}`);

        // 4. Criar a venda
        await criarVenda(
            clienteAleatorio.id,
            produtoAleatorio.id,
            quantidadeAleatoria
        );

        // Pequeno atraso para não sobrecarregar a API ou o console (opcional)
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("\nCriação de vendas aleatórias finalizada.");
    console.log("Você pode acessar http://localhost:3000/vendas para ver as vendas registradas.");
}

// Executar a função principal
main();