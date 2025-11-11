Architecture Documentation - Sistema Bancário
Visão Geral da Arquitetura

O sistema foi desenvolvido seguindo os princípios de Arquitetura em Camadas e Programação Orientada a Objetos, proporcionando alta coesão, baixo acoplamento e excelente manutenibilidade.
Princípios Arquiteturais
SOLID Applications

    ✅ Single Responsibility - Cada classe tem uma única responsabilidade

    ✅ Open/Closed - Extensível para novos tipos de conta

    ✅ Liskov Substitution - Contas derivadas substituem a classe base

    ✅ Interface Segregation - Interfaces específicas por contexto

    ✅ Dependency Inversion - Dependências abstraídas

Design Patterns Implementados

    Controller Pattern - Separação entre UI e lógica de negócio

    Template Method - Comportamento comum na classe base Conta

    Strategy Pattern - Diferentes comportamentos para tipos de conta

Diagrama de Arquitetura
┌─────────────────────────────────────────────────────────────┐
│ APRESENTAÇÃO (VIEW) │
├─────────────────────────────────────────────────────────────┤
│ Menu.ts ──────── MenuOperations.ts │
│ (Interface Console) (Operações de UI) │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ CONTROLLER (LÓGICA) │
├─────────────────────────────────────────────────────────────┤
│ ContaController.ts │
│ • Orquestração de operações │
│ • Validações de negócio │
│ • Gestão do ciclo de vida │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ MODEL (DOMÍNIO) │
├─────────────────────────────────────────────────────────────┤
│ Conta (Abstract) ◄─── ContaCorrente │
│ • Estado do sistema • Limite especial │
│ • Regras de negócio • Saque com limite │
│ │ │
│ ContaPoupanca │
│ • Dia aniversário │
│ • Rendimentos │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ INFRAESTRUTURA │
├─────────────────────────────────────────────────────────────┤
│ Colors.ts ────────── Future: Database │
│ (Utilitários) (Persistência) │
└─────────────────────────────────────────────────────────────┘

Detalhamento das Camadas
Camada de Apresentação (View)

Responsabilidade: Interface com o usuário e formatação de dados
Componentes:

    Menu.ts - Menu principal e navegação

    MenuOperations.ts - Operações específicas de UI

    Colors.ts - Formatação e cores do console

    // Exemplo de fluxo

User Input → Menu.ts → MenuOperations.ts → ContaController
Camada Controller (Lógica de Aplicação)

Responsabilidade: Orquestração e coordenação das operações
ContaController.ts
class ContaController {
// Gestão do ciclo de vida + cadastrar(conta: Conta): void + atualizar(conta: Conta): void + deletar(numero: number): void

    // Operações bancárias
    + sacar(numero: number, valor: number): void
    + depositar(numero: number, valor: number): void
    + transferir(origem: number, destino: number, valor: number): void

    // Consultas
    + listarTodas(): Conta[]
    + procurarPorNumero(numero: number): Conta | null

}
Camada de Domínio (Model)

Responsabilidade: Lógica de negócio e regras do domínio bancário
Hierarquia de Classes
Conta (Abstract)
├── # numero: number
├── # agencia: number
├── # tipo: number
├── # titular: string
├── # saldo: number
├── + sacar(valor: number): boolean
├── + depositar(valor: number): void
└── + visualizar(): void
│
├── ContaCorrente
│ ├── # limite: number
│ └── + sacar(valor: number): boolean (override)
│
└── ContaPoupanca
├── # aniversario: number
└── + visualizar(): void (override)
Regras de Negócio Implementadas

    RN01: Saldo insuficiente impede saque

    RN02: Conta corrente permite saque até (saldo + limite)

    RN03: Valores devem ser positivos em transações

    RN04: Transferência requer contas origem e destino válidas

Fluxo de Dados

Fluxo de Saque

1. Usuário seleciona "Sacar"
2. MenuOperations solicita número e valor
3. ContaController valida existência da conta
4. ContaCorrente/ContaPoupanca valida regras específicas
5. Conta base executa operação se válida
6. Resultado retornado para usuário

Fluxo de Transferência

1. Usuário informa origem, destino e valor
2. Controller valida ambas as contas
3. Conta origem executa saque validado
4. Conta destino executa depósito
5. Transação atomicamente commitada

Tratamento de Erros

Estratégia de Exceções

// Exemplo de tratamento hierárquico
try {
controller.sacar(numeroConta, valor);
} catch (error) {
if (error instanceof SaldoInsuficienteError) {
// Tratamento específico
} else if (error instanceof ContaNaoEncontradaError) {
// Tratamento específico
} else {
// Tratamento genérico
}
}

Tipos de Erro Tratados

    ✅ Valores inválidos (negativos, zero)

    ✅ Conta não encontrada

    ✅ Saldo insuficiente

    ✅ Limite excedido

    ✅ Dados de entrada inválidos

Estratégia de Persistência

Estado Atual (Memória)

// Dados armazenados em array em memória
private contas: Conta[] = [];

Evolução Futura

// Interface para diferentes persistências
interface ContaRepository {
salvar(conta: Conta): Promise<void>;
buscarPorNumero(numero: number): Promise<Conta | null>;
listarTodas(): Promise<Conta[]>;
}

// Implementações possíveis
class MemoryContaRepository implements ContaRepository {}
class DatabaseContaRepository implements ContaRepository {}
class FileContaRepository implements ContaRepository {}

Configuração e Dependências

config/
├── tsconfig.json # Configuração TypeScript
├── package.json # Dependências e scripts
└── .gitignore # Controle de versionamento

Dependências Principais

    TypeScript - Tipagem estática e modern JS features

    readline-sync - Interface de usuário síncrona

    @types/* - Definições de tipo para TypeScript

Estratégia de Build e Deploy

Scripts de Desenvolvimento
{
"dev": "ts-node src/main.ts",
"build": "tsc",
"start": "node dist/main.js"
}

Processo de Build
src/ → TypeScript Compiler → dist/ → Node.js Runtime
// Classes são facilmente testáveis devido à injeção de dependências
class ContaController {
constructor(private repository: ContaRepository) {}

    // Métodos puros e testáveis
    validarSaque(conta: Conta, valor: number): boolean {
        return conta.saldo + (conta.limite || 0) >= valor;
    }

}

Cobertura de Testes Sugerida

     Testes unitários para modelos de domínio

     Testes de integração para controllers

     Testes e2e para fluxos completos

🔮 Roadmap de Evolução Arquitetural
Fase 1 - MVP (Atual)

     Arquitetura em camadas

     Domínio rico com POO

     Interface console

Fase 2 - Persistência

     Repository Pattern

     Banco de dados SQL/NoSQL

     Migrations e seeds

Fase 3 - APIs e Web

      API RESTful

      Interface Web (React/Angular)

       Autenticação e autorização

Fase 4 - Enterprise

      Microserviços

      Message Queues

      Monitoramento e logs

Decisões Arquiteturais
Decisões Tomadas

    TypeScript over JavaScript - Segurança de tipos e melhor tooling

    POO over Functional - Melhor modelagem do domínio bancário

    Layered Architecture - Separação clara de responsabilidades

    Console Interface - Foco na lógica de negócio inicial

Decisões Pendentes

    Persistência - Banco relacional vs documento

    API Design - REST vs GraphQL

    Authentication - JWT vs Session-based

Documentação Mantida por: David Aparecido da Silva
Última Atualização: Novembro 2024
Versão da Arquitetura: 1.0
