const BASE_URL = "http://localhost:3000";

async function criarCliente(nomeCliente) {
    const url = `${BASE_URL}/clientes`;
    const headers = {
        "Content-Type": "application/json"
    };
    const payload = {
        nome: nomeCliente
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
        console.log(`Cliente '${nomeCliente}' criado com sucesso! ID: ${data.id}`);
        return data;
    } catch (error) {
        console.error(`Erro ao criar cliente '${nomeCliente}': ${error.message}`);
        return null;
    }
}

async function main() {
    console.log("Iniciando criação de clientes...");

    const clientesParaCriar = [
        "Fernando Pessoa",
        "Clarice Lispector",
        "Machado de Assis",
        "Cecília Meireles",
        "Jorge Amado"
    ];

    for (const nome of clientesParaCriar) {
        await criarCliente(nome);
    }

    console.log("\nCriação de clientes finalizada.");
    console.log("Você pode acessar http://localhost:3000/clientes para ver a lista de clientes.");
}

// Executar a função principal
main();