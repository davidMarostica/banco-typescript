import { Conta } from "../model/Conta";
import { colors } from "../util/Colors";

export class ContaController {
  private contas: Conta[] = [];
  private ultimoNumero: number = 0;

  // GERA NÚMERO DA CONTA
  public gerarNumero(): number {
    return ++this.ultimoNumero;
  }

  // BUSCAR CONTA POR NÚMERO
  public procurarPorNumero(numero: number): Conta | null {
    for (let conta of this.contas) {
      if (conta.numero === numero) {
        return conta;
      }
    }
    return null;
  }

  // CADASTRAR CONTA
  public cadastrar(conta: Conta): void {
    this.contas.push(conta);
    console.log(
      colors.fg.greenstrong,
      "\nA Conta foi Criada com Sucesso!",
      colors.reset
    );
  }

  // LISTAR TODAS AS CONTAS
  public listarTodas(): Conta[] {
    return this.contas;
  }

  // ATUALIZAR CONTA
  public atualizar(contaAtualizada: Conta): void {
    let index = this.contas.findIndex(
      (c) => c.numero === contaAtualizada.numero
    );

    if (index !== -1) {
      this.contas[index] = contaAtualizada;
      console.log(
        colors.fg.greenstrong,
        "\nA Conta foi Atualizada com Sucesso!",
        colors.reset
      );
    } else {
      console.log(colors.fg.redstrong, "\nConta não Encontrada!", colors.reset);
    }
  }

  // DELETAR CONTA
  public deletar(numero: number): void {
    let index = this.contas.findIndex((c) => c.numero === numero);

    if (index !== -1) {
      this.contas.splice(index, 1);
      console.log(
        colors.fg.greenstrong,
        "\nA Conta foi Deletada com Sucesso!",
        colors.reset
      );
    } else {
      console.log(colors.fg.redstrong, "\nConta não Encontrada!", colors.reset);
    }
  }

  // SACAR
  public sacar(numero: number, valor: number): void {
    let conta = this.procurarPorNumero(numero);

    if (conta !== null) {
      if (conta.sacar(valor)) {
        console.log(
          colors.fg.greenstrong,
          "\nSaque Realizado com Sucesso!",
          colors.reset
        );
      }
    } else {
      console.log(colors.fg.redstrong, "\nConta não Encontrada!", colors.reset);
    }
  }

  // DEPOSITAR
  public depositar(numero: number, valor: number): void {
    let conta = this.procurarPorNumero(numero);

    if (conta !== null) {
      conta.depositar(valor);
    } else {
      console.log(colors.fg.redstrong, "\nConta não Encontrada!", colors.reset);
    }
  }

  // TRANSFERIR
  public transferir(
    numeroOrigem: number,
    numeroDestino: number,
    valor: number
  ): void {
    let contaOrigem = this.procurarPorNumero(numeroOrigem);
    let contaDestino = this.procurarPorNumero(numeroDestino);

    if (contaOrigem !== null && contaDestino !== null) {
      if (contaOrigem.sacar(valor)) {
        contaDestino.depositar(valor);
        console.log(
          colors.fg.greenstrong,
          "\nTransferência Realizada com Sucesso!",
          colors.reset
        );
      }
    } else {
      console.log(
        colors.fg.redstrong,
        "\nUma das contas não foi Encontrada!",
        colors.reset
      );
    }
  }
}
