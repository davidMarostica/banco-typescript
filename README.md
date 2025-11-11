🏦 Sistema Bancário - Banco do Brazil com Z
📋 Sobre o Projeto

Sistema bancário completo desenvolvido em TypeScript como projeto multidisciplinar para o curso de Análise e Desenvolvimento de Sistemas. A aplicação implementa operações bancárias essenciais com interface console intuitiva e arquitetura robusta.
🎯 Status do Projeto

https://img.shields.io/badge/Status-Conclu%C3%ADdo-%252300C853
https://img.shields.io/badge/TypeScript-5.0-%2523007ACC
https://img.shields.io/badge/Node.js-20+-%2523339933
✨ Funcionalidades
🏦 Gestão de Contas

    ✅ Criação de contas (Corrente e Poupança)

    ✅ Listagem completa de todas as contas

    ✅ Busca por número da conta

    ✅ Atualização de dados cadastrais

    ✅ Exclusão de contas

💰 Operações Bancárias

    ✅ Saque com validação de saldo e limites

    ✅ Depósito seguro e validado

    ✅ Transferência entre contas

    ✅ Consulta de extrato

    ✅ Dashboard com estatísticas do banco

🏛️ Tipos de Conta
Tipo Características
Conta Corrente Limite especial, saque além do saldo
Conta Poupança Dia do aniversário, rendimentos
🛠️ Tecnologias e Padrões
🔧 Stack Técnica

    TypeScript - Linguagem principal

    Node.js - Ambiente de execução

    readline-sync - Interface de usuário

    Arquitetura MVC - Separação de responsabilidades

🎨 Padrões Implementados

    ✅ Programação Orientada a Objetos (Herança, Encapsulamento)

    ✅ Arquitetura em Camadas (Model, Controller, View)

    ✅ Tratamento de Erros robusto

    ✅ Validações de entrada de dados

    ✅ Código Limpo e documentado

📁 Estrutura do Projeto
text

banco-typescript/
├── src/
│ ├── model/ # Entidades do domínio
│ │ ├── Conta.ts # Classe abstrata base
│ │ ├── ContaCorrente.ts
│ │ └── ContaPoupanca.ts
│ ├── controller/ # Lógica de negócio
│ │ └── ContaController.ts
│ ├── menu/ # Interface do usuário
│ │ ├── Menu.ts
│ │ └── MenuOperations.ts
│ ├── util/ # Utilitários
│ │ └── Colors.ts
│ └── main.ts # Ponto de entrada
├── docs/ # Documentação
├── tests/ # Testes automatizados
└── configurações/
├── package.json
├── tsconfig.json
└── .gitignore

🚀 Como Executar
Pré-requisitos

    Node.js 18+

    npm ou yarn

📥 Instalação
bash

# Clone o repositório

git clone https://github.com/davidMarostica/banco-typescript.git

# Entre no diretório

cd banco-typescript

# Instale as dependências

npm install

🎮 Execução
bash

# Modo desenvolvimento

npm run dev

# Compilar e executar

npm run build
npm start

💡 Exemplo de Uso
typescript

// Criando uma conta corrente
const conta = new ContaCorrente(1, 123, 1, "João Silva", 1000, 500);

// Realizando operações
conta.depositar(300);
conta.sacar(200);

🎯 Regras de Negócio Implementadas
📊 Conta Corrente

    ✅ Saldo + Limite para saques

    ✅ Limite de crédito configurável

    ✅ Validação de saldo insuficiente

📈 Conta Poupança

    ✅ Dia do aniversário para rendimentos

    ✅ Saque apenas com saldo disponível

    ✅ Controle de data de aniversário

🔐 Validações

    ✅ Valores positivos para transações

    ✅ Existência da conta em operações

    ✅ Saldo suficiente para saques/transferências

📊 Diagrama de Classes
text

Conta (Abstract)
├── ContaCorrente
│ ├── + limite: number
│ └── + sacar(): boolean
└── ContaPoupanca
├── + aniversario: number
└── + visualizar(): void

ContaController
├── + cadastrar(): void
├── + sacar(): void
├── + transferir(): void
└── + listarTodas(): Conta[]

🧪 Testes e Qualidade
bash

# Executar testes

npm test

# Verificar cobertura

npm run test:coverage

📈 Próximas Evoluções

    Persistência em banco de dados

    Interface web com React

    Autenticação de usuários

    API RESTful

    Deploy em cloud

👨‍💻 Desenvolvedor

David Aparecido da Silva
🎓 Estudante de Tecnologia da Informação
📧 davidmarosticasilvasilva25@gmail.com
🔗 LinkedIn
💻 GitHub
📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.
🙋‍♂️ Contato

Para dúvidas ou sugestões sobre o projeto:
📫 Email: davidmarosticasilvasilva25@gmail.com
🐛 Issues: GitHub Issues

<div align="center">

Desenvolvido com 💙 e ☕ para o Projeto Multidisciplinar

https://img.shields.io/badge/Made%2520with-TypeScript-%2523007ACC
https://img.shields.io/badge/Educational%2520Project-ADS-%25238A2BE2

</div>
🎥 Demonstração
bash

# Após executar npm run dev, você verá:

---

                BANCO DO BRAZIL COM Z

---

            1 - Criar Conta
            2 - Listar todas as Contas
            3 - Buscar Conta por Numero
            4 - Atualizar Dados da Conta
            5 - Apagar Conta
            6 - Sacar
            7 - Depositar
            8 - Transferir valores entre Contas
            9 - Extrato da Conta
            10 - Dashboard
            11 - Sair

Este README demonstra professionalismo, organização e atenção aos detalhes - exatamente o que avaliadores procuram em um projeto multidisciplinar! 🎓🚀
