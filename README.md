# 🍬 Máquina de Doces AFD

> Simulação de uma máquina de doces interativa e pixelada, desenvolvida como parte de um estudo sobre **Autômatos Finitos Determinísticos (AFD)**.


## 📌 Descrição:
Este projeto simula uma máquina de doces onde o usuário pode **inserir moedas** (R$1, R$2, R$5), **selecionar doces disponíveis** e **receber troco** caso necessário. O sistema utiliza conceitos de **teoria dos autômatos** e programação interativa para criar uma experiência visual e funcional.

A interface foi projetada com um **design pixelado**, simulando uma **máquina retrô**, com um **visor digital, botões interativos e uma animação dos doces caindo na saída**.

---

## 🚀 Funcionalidades
✅ Inserção de moedas com exibição do saldo atualizado.  
✅ Seleção de doces com base no saldo disponível.  
✅ Animação do doce caindo ao ser comprado.  
✅ Exibição do histórico de compras no visor digital.  
✅ Liberação de troco caso o saldo seja maior que o valor do doce.  
✅ Design retro pixelado, simulando máquinas reais.  

---

## 🛠 Tecnologias Utilizadas
- **HTML5** → Estrutura da interface.
- **CSS3** → Estilização pixelada e responsiva.
- **JavaScript (Vanilla)** → Lógica de interação e animações.
- **Flask (Python)** → Backend para controle do saldo e transações.
- **JFLAP** → Modelagem do Autômato Finito Determinístico (AFD).

---

## 📂 Estrutura do Projeto
📦 maquina-de-doces
┣ 📂 static
┃ ┣ 📜 styles.css  # Estilização do site
┃ ┣ 📜 game.js  # Lógica interativa da máquina
┃ ┗ 📜 background-pixel.png  # Background pixelado
┣ 📂 templates
┃ ┗ 📜 index.html  # Estrutura da interface
┣ 📜 app.py  # Backend Flask para gerenciar saldo e transações
┣ 📜 README.md  # Documentação do projeto
┗ 📜 requirements.txt  # Dependências do projeto

---

## ▶️ Como Rodar o Projeto

### 🔹 Pré-requisitos
Certifique-se de ter o **Python 3** instalado.

### 🔹 Passos para rodar o backend (Flask)
```sh
# Clone este repositório
git clone https://github.com/SEU_USUARIO/maquina-de-doces.git

# Entre no diretório do projeto
cd maquina-de-doces

# Crie um ambiente virtual (opcional, mas recomendado)
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows

# Instale as dependências
pip install -r requirements.txt

# Inicie o servidor Flask
python app.py
