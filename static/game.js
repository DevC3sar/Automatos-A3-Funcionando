document.addEventListener("DOMContentLoaded", () => {
    const message = document.getElementById("message");
    const saldoSpan = document.getElementById("saldo");
    const candyExit = document.getElementById("candy-exit");
    const historyList = document.getElementById("history-list");

    function atualizarSaldo() {
        fetch("/saldo")
            .then(response => response.json())
            .then(data => {
                saldoSpan.textContent = data.saldo;
            })
            .catch(error => console.error("Erro ao atualizar saldo:", error));
    }

    atualizarSaldo();

    // Inserir moedas
    document.querySelectorAll(".coin").forEach(button => {
        button.addEventListener("click", () => {
            const valor = parseInt(button.getAttribute("data-value"));

            fetch("/inserir_dinheiro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ valor: valor })
            })
            .then(response => response.json())
            .then(data => {
                if (data.saldo !== undefined) {
                    message.textContent = `✅ Você inseriu R$${valor}!`;
                    atualizarSaldo();
                } else {
                    message.textContent = "⚠️ Erro ao inserir moeda!";
                }
            })
            .catch(error => console.error("Erro ao inserir moeda:", error));
        });
    });

    // Comprar doces
    document.querySelectorAll(".candy").forEach(button => {
        button.addEventListener("click", () => {
            const doce = button.getAttribute("data-doce");

            fetch("/comprar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ doce: doce })
            })
            .then(response => {
                if (!response.ok) throw new Error("Erro na compra");
                return response.json();
            })
            .then(data => {
                if (data.mensagem) {
                    message.textContent = `🎉 ${data.mensagem}`;
                    atualizarSaldo();
                    animarSaidaDoce(doce);
                    adicionarAoHistorico(doce);
                } else {
                    message.textContent = "⚠️ Saldo insuficiente!";
                }
            })
            .catch(error => console.error("Erro ao comprar doce:", error));
        });
    });

    // Função para animar a saída do doce
    function animarSaidaDoce(doce) {
        const emoji = doce === "A" ? "🍬" : doce === "B" ? "🍭" : "🍫";
        const candyElement = document.createElement("div");
        candyElement.textContent = emoji;
        candyElement.classList.add("candy-drop");
        candyExit.appendChild(candyElement);

        // Pequeno delay para a animação começar
        setTimeout(() => {
            candyElement.classList.add("falling");
        }, 100);

        // Remover o doce após cair
        setTimeout(() => {
            candyElement.remove();
        }, 2000);
    }

    // Adicionar doces ao histórico
    function adicionarAoHistorico(doce) {
        const nomeDoce = doce === "A" ? "Doce A 🍬" : doce === "B" ? "Doce B 🍭" : "Doce C 🍫";
        const li = document.createElement("li");
        li.textContent = `🛒 ${nomeDoce}`;
        li.classList.add("history-item");
        historyList.prepend(li);
    }

    // Pegar troco
    document.getElementById("troco").addEventListener("click", () => {
        fetch("/resgatar_troco", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao pegar troco");
            return response.json();
        })
        .then(data => {
            message.textContent = `💰 ${data.mensagem}`;
            atualizarSaldo();
        })
        .catch(error => console.error("Erro ao pegar troco:", error));
    });
});