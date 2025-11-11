import * as readline from "readline-sync";
import { ContaController } from "../controller/ContaController";
import { ContaCorrente } from "../model/ContaCorrente";
import { ContaPoupanca } from "../model/ContaPoupanca";
import { colors } from "../util/Colors";

export class MenuOperations {
  public static criarConta(controller: ContaController): void {
    console.log(colors.fg.whitestrong, "\n\nCriar Conta\n\n", colors.reset);

    const agencia = readline.questionInt("Digite o Numero da agencia: ");
    const titular = readline.question("Digite o Nome do Titular da conta: ");
    const saldo = readline.questionFloat(
      "Digite o Saldo inicial da conta (R$): "
    );

    console.log("Selecione o Tipo da Conta: ");
    const tiposContas = ["Conta Corrente", "Conta Poupança"];
    const tipo = readline.keyInSelect(tiposContas, "", { cancel: false }) + 1;

    try {
      if (tipo === 1) {
        const limite = readline.questionFloat(
          "Digite o Limite da Conta (R$): "
        );
        const conta = new ContaCorrente(
          controller.gerarNumero(),
          agencia,
          tipo,
          titular,
          saldo,
          limite
        );
        controller.cadastrar(conta);
      } else {
        const aniversario = readline.questionInt(
          "Digite o dia do Aniversario da Conta: "
        );
        const conta = new ContaPoupanca(
          controller.gerarNumero(),
          agencia,
          tipo,
          titular,
          saldo,
          aniversario
        );
        controller.cadastrar(conta);
      }
      console.log(colors.fg.green, "Conta criada com sucesso!", colors.reset);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.log(colors.fg.red, `Erro: ${errorMessage}`, colors.reset);
    }
  }

  public static listarContas(controller: ContaController): void {
    console.log(
      colors.fg.whitestrong,
      "\n\nListar todas as Contas\n\n",
      colors.reset
    );
    const contas = controller.listarTodas();

    if (contas.length === 0) {
      console.log("\nNenhuma conta cadastrada.");
    } else {
      console.log("\n\n=== LISTA DE TODAS AS CONTAS ===");
      contas.forEach((conta) => {
        conta.visualizar();
        console.log("");
      });
      console.log("=== FIM DA LISTA ===\n");
    }
  }

  public static buscarConta(controller: ContaController): void {
    console.log(
      colors.fg.whitestrong,
      "\n\nConsultar dados da Conta\n\n",
      colors.reset
    );
    const numeroBusca = readline.questionInt("Digite o número da conta: ");
    const conta = controller.procurarPorNumero(numeroBusca);

    if (conta) {
      console.log("\n=== CONTA ENCONTRADA ===");
      conta.visualizar();
      console.log("=========================\n");
    } else {
      console.log("\nConta não encontrada.");
    }
  }

  public static atualizarConta(controller: ContaController): void {
    console.log(
      colors.fg.whitestrong,
      "\n\nAtualizar dados da Conta\n\n",
      colors.reset
    );
    const numeroAtualizar = readline.questionInt("Digite o número da conta: ");
    const contaExistente = controller.procurarPorNumero(numeroAtualizar);

    if (contaExistente) {
      console.log("Digite o Numero da Agencia: ");
      const agencia = readline.questionInt("");

      console.log("Digite o Nome do Titular: ");
      const titular = readline.question("");

      console.log("Digite o Saldo da Conta (R$): ");
      const saldo = readline.questionFloat("");

      try {
        if (contaExistente.tipo === 1) {
          console.log("Digite o Limite de Credito (R$): ");
          const limite = readline.questionFloat("");

          const contaAtualizada = new ContaCorrente(
            numeroAtualizar,
            agencia,
            contaExistente.tipo,
            titular,
            saldo,
            limite
          );
          controller.atualizar(contaAtualizada);
        } else if (contaExistente.tipo === 2) {
          console.log("Digite o dia do Aniversario da Conta: ");
          const aniversario = readline.questionInt("");

          const contaAtualizada = new ContaPoupanca(
            numeroAtualizar,
            agencia,
            contaExistente.tipo,
            titular,
            saldo,
            aniversario
          );
          controller.atualizar(contaAtualizada);
        }
        console.log(
          colors.fg.green,
          "Conta atualizada com sucesso!",
          colors.reset
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erro desconhecido";
        console.log(colors.fg.red, `Erro: ${errorMessage}`, colors.reset);
      }
    } else {
      console.log("Conta não encontrada.");
    }
  }

  public static apagarConta(controller: ContaController): void {
    console.log(colors.fg.whitestrong, "\n\nApagar Conta\n\n", colors.reset);
    const numeroDeletar = readline.questionInt("Digite o número da conta: ");

    try {
      controller.deletar(numeroDeletar);
      console.log(colors.fg.green, "Conta apagada com sucesso!", colors.reset);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.log(colors.fg.red, `Erro: ${errorMessage}`, colors.reset);
    }
  }

  public static sacar(controller: ContaController): void {
    console.log(colors.fg.whitestrong, "\n\nSaque\n\n", colors.reset);
    const numero = readline.questionInt("Número da conta: ");
    const valor = readline.questionFloat("Valor do saque (R$): ");

    try {
      if (valor <= 0) {
        throw new Error("Valor do saque deve ser positivo");
      }

      controller.sacar(numero, valor);
      console.log(
        colors.fg.green,
        "Saque realizado com sucesso!",
        colors.reset
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.log(colors.fg.red, `Erro: ${errorMessage}`, colors.reset);
    }
  }

  public static depositar(controller: ContaController): void {
    console.log(colors.fg.whitestrong, "\n\nDeposito\n\n", colors.reset);
    const numero = readline.questionInt("Número da conta: ");
    const valor = readline.questionFloat("Valor do depósito (R$): ");

    try {
      if (valor <= 0) {
        throw new Error("Valor do depósito deve ser positivo");
      }

      controller.depositar(numero, valor);
      console.log(
        colors.fg.green,
        "Depósito realizado com sucesso!",
        colors.reset
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.log(colors.fg.red, `Erro: ${errorMessage}`, colors.reset);
    }
  }

  public static transferir(controller: ContaController): void {
    console.log(
      colors.fg.whitestrong,
      "\n\nTransferência entre Contas\n\n",
      colors.reset
    );
    const numeroOrigem = readline.questionInt("Número da conta de origem: ");
    const numeroDestino = readline.questionInt("Número da conta de destino: ");
    const valor = readline.questionFloat("Valor da transferência (R$): ");

    try {
      if (valor <= 0) {
        throw new Error("Valor da transferência deve ser positivo");
      }

      controller.transferir(numeroOrigem, numeroDestino, valor);
      console.log(
        colors.fg.green,
        "Transferência realizada com sucesso!",
        colors.reset
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.log(colors.fg.red, `Erro: ${errorMessage}`, colors.reset);
    }
  }

  public static gerarExtrato(controller: ContaController): void {
    console.log(
      colors.fg.whitestrong,
      "\n\nExtrato da Conta\n\n",
      colors.reset
    );
    const numero = readline.questionInt("Número da conta: ");
    const conta = controller.procurarPorNumero(numero);

    if (conta) {
      console.log("\n=== EXTRATO DA CONTA ===");
      console.log(`Conta: ${numero} - Titular: ${conta.titular}`);
      console.log(`Saldo atual: R$ ${conta.saldo.toFixed(2)}`);
      console.log("=== FIM DO EXTRATO ===\n");
      console.log("Funcionalidade completa de extrato em desenvolvimento...");
    } else {
      console.log("Conta não encontrada.");
    }
  }

  public static exibirDashboard(controller: ContaController): void {
    console.log(
      colors.fg.whitestrong,
      "\n\nDashboard do Banco\n\n",
      colors.reset
    );
    const contas = controller.listarTodas();

    const totalClientes = contas.length;
    const saldoTotal = contas.reduce((sum, conta) => sum + conta.saldo, 0);
    const contasCorrente = contas.filter((c) => c.tipo === 1).length;
    const contasPoupanca = contas.filter((c) => c.tipo === 2).length;

    console.log("=== ESTATÍSTICAS DO BANCO ===");
    console.log(`Total de Clientes: ${totalClientes}`);
    console.log(`Saldo Total em Contas: R$ ${saldoTotal.toFixed(2)}`);
    console.log(`Contas Corrente: ${contasCorrente}`);
    console.log(`Contas Poupança: ${contasPoupanca}`);
    console.log("==============================\n");
  }
}
