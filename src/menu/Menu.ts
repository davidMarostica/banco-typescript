import * as readline from "readline-sync";
import { ContaController } from "../controller/ContaController";
import { MenuOperations } from "./MenuOperations";
import { colors } from "../util/Colors";

export class Menu {
  private static controller: ContaController = new ContaController();

  public static iniciar(): void {
    this.exibirMenuPrincipal();
  }

  private static exibirMenuPrincipal(): void {
    while (true) {
      console.log(
        colors.bg.black,
        colors.fg.yellow,
        "*****************************************************"
      );
      console.log("                                                     ");
      console.log("                BANCO DO BRAZIL COM Z                ");
      console.log("                                                     ");
      console.log("*****************************************************");
      console.log("                                                     ");
      console.log("            1 - Criar Conta                          ");
      console.log("            2 - Listar todas as Contas               ");
      console.log("            3 - Buscar Conta por Numero              ");
      console.log("            4 - Atualizar Dados da Conta             ");
      console.log("            5 - Apagar Conta                         ");
      console.log("            6 - Sacar                                ");
      console.log("            7 - Depositar                            ");
      console.log("            8 - Transferir valores entre Contas      ");
      console.log("            9 - Extrato da Conta                     ");
      console.log("            10 - Dashboard                           ");
      console.log("            11 - Sair                                ");
      console.log("                                                     ");
      console.log("*****************************************************");
      console.log(
        "                                                     ",
        colors.reset
      );

      const opcao: number = readline.questionInt(
        "Entre com a opcao desejada: "
      );
      this.processarOpcao(opcao);
    }
  }

  private static processarOpcao(opcao: number): void {
    switch (opcao) {
      case 1:
        MenuOperations.criarConta(this.controller);
        break;
      case 2:
        MenuOperations.listarContas(this.controller);
        break;
      case 3:
        MenuOperations.buscarConta(this.controller);
        break;
      case 4:
        MenuOperations.atualizarConta(this.controller);
        break;
      case 5:
        MenuOperations.apagarConta(this.controller);
        break;
      case 6:
        MenuOperations.sacar(this.controller);
        break;
      case 7:
        MenuOperations.depositar(this.controller);
        break;
      case 8:
        MenuOperations.transferir(this.controller);
        break;
      case 9:
        MenuOperations.gerarExtrato(this.controller);
        break;
      case 10:
        MenuOperations.exibirDashboard(this.controller);
        break;
      case 11:
        this.sair();
        break;
      default:
        console.log(colors.fg.redstrong, "\nOpção Inválida!\n", colors.reset);
    }
    this.keyPress();
  }

  private static sair(): void {
    console.log(
      colors.fg.greenstrong,
      "\n\nBanco do Brazil com Z - O seu Futuro começa aqui!"
    );
    this.sobre();
    console.log(colors.reset, "");
    process.exit(0);
  }

  private static sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: David Aparecido da Silva");
    console.log("Email: davidmarosticasilvasilva25@gmail.com");
    console.log("GitHub: github.com/davidMarostica");
    console.log("*****************************************************");
  }

  private static keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readline.question("");
  }
}
