const BASE_URL = "http://localhost:3000";

async function criarProduto(nome, preco, estoque) {
    const url = `${BASE_URL}/produtos`;
    const headers = {
        "Content-Type": "application/json"
    };
    const payload = {
        nome: nome,
        preco: preco,
        estoque: estoque
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log(`Produto '${nome}' criado com sucesso! ID: ${data.id}`);
        return data;
    } catch (error) {
        console.error(`Erro ao criar produto '${nome}': ${error.message}`);
        return null;
    }
}

async function main() {
    console.log("Iniciando criação de produtos...");

    const produtosParaCriar = [
        { nome: "Coca Cola 2L", preco: 9.99, estoque: 5 },
        { nome: "Café São Brás 250G", preco: 21.50, estoque: 13 },
        { nome: "Arroz Parbolizado 1KG", preco: 7.99, estoque: 8 },
        { nome: "Feijão Carioca 1KG", preco: 8.99, estoque: 7 },
        { nome: "Cuscuz São Brás 500G", preco: 3.99, estoque: 20 },
        { nome: "Carne de Sol 1KG", preco: 48.99, estoque: 15 },
        { nome: "Macarrão Ninho 500G", preco: 5.99, estoque: 11 },
        { nome: "Açucar Cristal 1KG", preco: 6.49, estoque: 9 },
        { nome: "Sal 1KG", preco: 2.49, estoque: 17 }
    ];

    for (const produto of produtosParaCriar) {
        await criarProduto(produto.nome, produto.preco, produto.estoque);
    }

    console.log("\nCriação de produtos finalizada.");
    console.log("Você pode acessar http://localhost:3000/produtos para ver a lista de produtos.");
}

// Executar a função principal
main();