<h1 align="center">Gerenciador de Projetos</h1>

## 🎯 Sobre o Projeto

Este é um **projeto prático** desenvolvido com o objetivo principal de **demonstrar minha capacidade técnica**, **qualidade de código**, e **organização de estrutura**.

O foco não é a criação de um produto final completo, mas sim fornecer uma **visão clara da profundidade técnica** e das práticas de desenvolvimento que emprego em meus projetos.

---

## ✨ Requisitos e Funcionalidades do Front-end

O projeto implementa as seguintes funcionalidades essenciais para um gerenciador de tarefas simplificado:

* **Visualização Completa:** Exibir uma lista de **Projetos** (incluindo seu **progresso atual**) e uma lista de **Tarefas** (com seu respectivo **projeto vinculado** e nível de **dificuldade**).
* **Criação de Tarefa:** Permitir que o usuário crie novas tarefas, definindo obrigatoriamente um nível de **Dificuldade** (_Baixa, Média_ ou _Alta_).
* **Gestão de Progresso:** Marcar tarefas como **Concluídas**.
    * O progresso do projeto vinculado deve ser **automaticamente recalculado** e atualizado na interface em tempo real.

---

## 🛠️ Tecnologias Utilizadas

O desenvolvimento foi construído sobre uma **stack moderna** e performática:

* **React:** Biblioteca líder para a construção de interfaces de usuário reativas e componentizadas.
* **Vite:** Ferramenta de build de nova geração que otimiza drasticamente a experiência de desenvolvimento:
    * Substitui ferramentas mais antigas como o Create React App (CRA).
    * Oferece **inicialização quase instantânea** e **Recarga Rápida (Hot Module Replacement - HMR)** superior.
    * Utiliza o **ESBuild** para um processo de build super otimizado e ágil.

---

## ⚙️ Como Executar o Projeto

Para colocar o projeto em funcionamento de forma rápida e isolada, foi utilizado um container Docker:

1.  **Inicie o Container:**
    ```bash
    docker compose up -d
    ```

2.  **Acesse o Projeto:**
    * Após o container ser iniciado, acesse a aplicação em seu navegador através da URL:
        **[http://localhost:3000](http://localhost:3000)**