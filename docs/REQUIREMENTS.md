📋 Requirements Documentation - Sistema Bancário
Visão Geral do Produto
Objetivo do Sistema

Desenvolver um sistema bancário completo em TypeScript que permita a gestão de contas bancárias e operações financeiras básicas, atendendo às necessidades de um banco digital moderno.
Público-Alvo

    Usuários finais: Clientes do banco

    Administradores: Funcionários do banco

    Desenvolvedores: Equipe de manutenção e evolução

Requisitos Funcionais
Módulo de Gestão de Contas (RF01-RF05)
RF01 - Cadastrar Conta Bancária

Descrição: O sistema deve permitir a criação de novos tipos de contas bancárias.
Atributo Tipo Obrigatório Validação
Número da conta number Sim Automático
Agência number Sim 1-9999
Tipo de conta number Sim 1-Corrente, 2-Poupança
Titular string Sim mínimo 3 caracteres
Saldo inicial number Sim ≥ 0
Limite (Corrente) number Condicional ≥ 0
Aniversário (Poupança) number Condicional 1-31

Fluxo:

    Usuário seleciona "Criar Conta"

    Sistema solicita dados básicos

    Usuário seleciona tipo de conta

    Sistema solicita dados específicos do tipo

    Conta é criada e número gerado automaticamente

RF02 - Listar Todas as Contas

Descrição: O sistema deve exibir todas as contas cadastradas.

Saída:
typescript

// Para cada conta
{
numero: number,
agencia: number,
tipo: string,
titular: string,
saldo: number,
limite?: number,
aniversario?: number
}

RF03 - Buscar Conta por Número

Descrição: O sistema deve permitir buscar uma conta específica pelo número.

Pré-condição: Conta deve existir
Pós-condição: Dados completos da conta exibidos
RF04 - Atualizar Dados da Conta

Descrição: O sistema deve permitir a atualização dos dados cadastrais.

Campos atualizáveis:

    Agência

    Titular

    Saldo

    Limite (Conta Corrente)

    Aniversário (Conta Poupança)

Restrições:

    Não pode alterar número da conta

    Não pode alterar tipo da conta

RF05 - Excluir Conta

Descrição: O sistema deve permitir a exclusão de contas.

Validações:

    Confirmação de exclusão

    Verificação de saldo zero

    Registro de auditoria

Módulo de Operações Bancárias (RF06-RF10)
RF06 - Realizar Saque

Descrição: O sistema deve permitir saques em contas.

Regras de Negócio:

    RN01: Valor deve ser positivo

    RN02: Saldo suficiente (considerando limite para corrente)

    RN03: Conta deve existir e estar ativa

Fluxo:
typescript

// Conta Corrente
saldoDisponivel = saldo + limite

// Conta Poupança
saldoDisponivel = saldo

RF07 - Realizar Depósito

Descrição: O sistema deve permitir depósitos em contas.

Regras:

    RN04: Valor deve ser positivo

    RN05: Conta deve existir

    RN06: Depósito aumenta saldo disponível

RF08 - Realizar Transferência

Descrição: O sistema deve permitir transferências entre contas.

Regras:

    RN07: Conta origem e destino devem existir

    RN08: Saldo suficiente na origem

    RN09: Valor deve ser positivo

    RN10: Operação atômica (ou tudo ou nada)

Fluxo:

    Validar conta origem

    Validar conta destino

    Verificar saldo origem

    Debitar origem

    Creditar destino

RF09 - Consultar Extrato

Descrição: O sistema deve exibir o extrato da conta.

Informações:

    Saldo atual

    Últimas transações

    Limites disponíveis

    Data e hora da consulta

RF10 - Exibir Dashboard

Descrição: O sistema deve mostrar estatísticas gerais do banco.

Métricas:

    Total de clientes

    Saldo total em contas

    Distribuição por tipo de conta

    Média de saldo por conta

Requisitos Não-Funcionais
Desempenho (RNF01-RNF03)
RNF01 - Tempo de Resposta

Descrição: O sistema deve responder rapidamente às operações.
Operação Tempo Máximo
Consultas (listar, buscar) ≤ 2 segundos
Operações (saque, depósito) ≤ 3 segundos
Transferências ≤ 5 segundos
RNF02 - Disponibilidade

Descrição: O sistema deve estar disponível durante o horário comercial.

Meta: 99.5% de disponibilidade
Horário: 06:00 - 22:00 GMT-3
RNF03 - Capacidade

Descrição: O sistema deve suportar múltiplos usuários simultâneos.

Usuários concorrentes: 50+
Contas cadastradas: 10.000+
Segurança (RNF04-RNF06)
RNF04 - Validação de Dados

Descrição: Todas as entradas devem ser validadas.

Validações:

    Tipos de dados

    Intervalos numéricos

    Formatação de strings

    Existência de registros

RNF05 - Integridade de Dados

Descrição: Operações devem manter a consistência dos dados.

Garantias:

    Transações atômicas

    Rollback em caso de erro

    Consistência referencial

RNF06 - Confidencialidade

Descrição: Dados sensíveis devem ser protegidos.

Proteções:

    Não expor informações internas

    Logs sem dados sensíveis

    Mensagens de erro genéricas

Usabilidade (RNF07-RNF09)
RNF07 - Interface Intuitiva

Descrição: A interface deve ser fácil de usar e entender.

Critérios:

    Menu claro e organizado

    Mensagens explicativas

    Fluxo linear de operações

    Feedback imediato de ações

RNF08 - Experiência do Usuário

Descrição: Interface agradável e profissional.

Elementos:

    Cores para destaque de informações

    Formatação consistente

    Navegação intuitiva

    Confirmações importantes

RNF09 - Acessibilidade

Descrição: Sistema utilizável por pessoas com diferentes habilidades.

Recursos:

    Texto claro e legível

    Contrastes adequados

    Mensagens autoexplicativas

Manutenibilidade (RNF10-RNF12)
RNF10 - Código Limpo

Descrição: Código deve ser legível e bem estruturado.

Padrões:

    Convenções de nomenclatura

    Funções pequenas e focadas

    Comentários onde necessário

    Documentação adequada

RNF11 - Testabilidade

Descrição: Código deve ser facilmente testável.

Características:

    Baixo acoplamento

    Injeção de dependências

    Funções puras quando possível

    Mock de dependências externas

RNF12 - Extensibilidade

Descrição: Sistema deve permitir fácil adição de funcionalidades.

Arquitetura:

    Design patterns apropriados

    Interfaces bem definidas

    Princípios SOLID aplicados

    Separação de concerns

Regras de Negócio Detalhadas
Regras de Contas
RN01 - Criação de Conta Corrente
typescript

interface ContaCorrente {
numero: number; // Gerado automaticamente
agencia: number; // 1-9999
titular: string; // min 3 caracteres
saldo: number; // ≥ 0
limite: number; // ≥ 0
}

RN02 - Criação de Conta Poupança
typescript

interface ContaPoupanca {
numero: number; // Gerado automaticamente
agencia: number; // 1-9999
titular: string; // min 3 caracteres
saldo: number; // ≥ 0
aniversario: number; // 1-31
}

RN03 - Número de Conta Único

Descrição: Cada conta deve ter um número único no sistema.

Implementação: Sequência automática incremental
Regras de Operações
RN04 - Validação de Saque
typescript

function validarSaque(conta: Conta, valor: number): boolean {
if (valor <= 0) return false;
if (conta instanceof ContaCorrente) {
return conta.saldo + conta.limite >= valor;
}
return conta.saldo >= valor;
}

RN05 - Validação de Depósito
typescript

function validarDeposito(valor: number): boolean {
return valor > 0;
}

RN06 - Validação de Transferência
typescript

function validarTransferencia(origem: Conta, destino: Conta, valor: number): boolean {
return origem !== destino &&
validarSaque(origem, valor) &&
destino !== null;
}

Requisitos de Interface
Console Interface Specifications
Menu Principal
text

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

---

Formatação de Dados

    Moeda: R$ 1.000,00

    Datas: DD/MM/AAAA

    Números: Formatação brasileira

Cores e Estilos

    Verde: Operações bem-sucedidas

    Vermelho: Erros e alertas

    Amarelo: Títulos e destaques

    Branco: Conteúdo normal

Critérios de Aceitação
Critérios Gerais

    Sistema compila sem erros TypeScript

    Todas as funcionalidades implementadas

    Interface funciona conforme especificado

    Tratamento de erros adequado

    Documentação completa

Critérios Específicos por RF

    RF01: Cria ambos os tipos de conta com dados válidos

    RF02: Lista todas as contas formatadas corretamente

    RF03: Encontra conta existente, trata conta inexistente

    RF06: Saque respeita saldo e limites

    RF08: Transferência mantém consistência dos dados

Matriz de Rastreabilidade
Requisito Classe Método Teste
RF01 ContaController cadastrar() testCriacaoConta
RF06 ContaController sacar() testSaqueValido
RF08 ContaController transferir() testTransferencia
RNF01 - - testPerformance
RN04 ContaCorrente sacar() testSaqueComLimite

Documentação Mantida por: David Aparecido da Silva
Status: Implementado
Versão: 1.0
Projeto: Multidisciplinar - Sistema Bancário TypeScript
