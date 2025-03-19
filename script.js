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
            });
    }

    atualizarSaldo();

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
                message.textContent = `✅ Você inseriu R$${valor}!`;
                atualizarSaldo();
            });
        });
    });

    document.querySelectorAll(".candy").forEach(button => {
        button.addEventListener("click", () => {
            const doce = button.getAttribute("data-doce");

            fetch("/comprar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ doce: doce })
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensagem) {
                    message.textContent = `🎉 ${data.mensagem}`;
                    atualizarSaldo();
                    animarSaidaDoce(doce);
                    adicionarAoHistorico(doce);
                } else {
                    message.textContent = "⚠️ Saldo insuficiente!";
                }
            });
        });
    });

    function animarSaidaDoce(doce) {
        const emoji = doce === "A" ? "🍬" : doce === "B" ? "🍭" : "🍫";
        const candyElement = document.createElement("div");
        candyElement.textContent = emoji;
        candyElement.classList.add("candy-drop");
        candyExit.appendChild(candyElement);

        setTimeout(() => {
            candyElement.remove();
        }, 1000);
    }

    function adicionarAoHistorico(doce) {
        const nomeDoce = doce === "A" ? "Doce A 🍬" : doce === "B" ? "Doce B 🍭" : "Doce C 🍫";
        const li = document.createElement("li");
        li.textContent = nomeDoce;
        li.classList.add("history-item");
        historyList.prepend(li);
    }

    document.getElementById("troco").addEventListener("click", () => {
        fetch("/resgatar_troco", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data => {
            message.textContent = `💰 ${data.mensagem}`;
            atualizarSaldo();
        });
    });
});