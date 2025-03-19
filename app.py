from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

# Inicializa a aplicação Flask
app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

# Variáveis globais para saldo e preços
saldo = 0
precos = {"A": 6, "B": 7, "C": 8}

@app.route('/')
def home():
    return render_template('index2.html')  # Renderiza o jogo corretamente

@app.route('/saldo', methods=['GET'])
def get_saldo():
    global saldo
    return jsonify({"saldo": saldo})

@app.route('/inserir_dinheiro', methods=['POST'])
def inserir_dinheiro():
    global saldo
    data = request.json
    valor = data.get("valor", 0)
    if valor in [1, 2, 5]:
        saldo += valor
        return jsonify({"saldo": saldo})
    return jsonify({"erro": "Nota inválida!"}), 400

@app.route('/comprar', methods=['POST'])
def comprar():
    global saldo
    data = request.json
    doce = data.get("doce", "")

    if doce in precos and saldo >= precos[doce]:
        saldo -= precos[doce]
        return jsonify({"mensagem": f"Você comprou o Doce {doce}!", "saldo": saldo})
    return jsonify({"erro": "Saldo insuficiente!", "saldo": saldo}), 400

@app.route('/resgatar_troco', methods=['POST'])
def resgatar_troco():
    global saldo
    troco = saldo
    saldo = 0
    return jsonify({"mensagem": f"Você pegou R$ {troco} de troco!", "saldo": saldo})

if __name__ == '__main__':
    print("🚀 Servidor Flask rodando em http://127.0.0.1:5002")
    app.run(debug=True, host='0.0.0.0', port=5002)