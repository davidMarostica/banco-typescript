import { Conta } from "../model/Conta";
import { Transacao } from "../model/Transacao";

export class BancoService {
  private transacoes: Transacao[] = [];

  public registrarTransacao(
    tipo: string,
    valor: number,
    descricao: string,
    numeroConta: number
  ): void {
    const transacao = new Transacao(tipo, valor, descricao, numeroConta);
    this.transacoes.push(transacao);
  }

  public obterExtrato(numeroConta: number): Transacao[] {
    return this.transacoes
      .filter((t) => t.numeroConta === numeroConta)
      .sort((a, b) => b.data.getTime() - a.data.getTime());
  }

  public calcularSaldoTotal(contas: Conta[]): number {
    return contas.reduce((total, conta) => total + conta.saldo, 0);
  }

  public obterEstatisticas(contas: Conta[]): any {
    const totalContas = contas.length;
    const contasCorrente = contas.filter((c) => c.tipo === 1).length;
    const contasPoupanca = contas.filter((c) => c.tipo === 2).length;
    const saldoTotal = this.calcularSaldoTotal(contas);

    return {
      totalContas,
      contasCorrente,
      contasPoupanca,
      saldoTotal,
      mediaSaldos: saldoTotal / totalContas || 0,
    };
  }
}
