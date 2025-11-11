import { colors } from "../util/Colors";
import { Conta } from "./Conta";

export class ContaCorrente extends Conta {
  private _limite: number;

  constructor(
    numero: number,
    agencia: number,
    tipo: number,
    titular: string,
    saldo: number,
    limite: number
  ) {
    super(numero, agencia, tipo, titular, saldo);
    this._limite = limite;
  }

  public get limite(): number {
    return this._limite;
  }

  public set limite(value: number) {
    this._limite = value;
  }

  public sacar(valor: number): boolean {
    if (valor > this.saldo + this._limite) {
      console.log(
        colors.fg.redstrong,
        "\nSaldo + Limite Insuficientes!",
        colors.reset
      );
      return false;
    }

    this.saldo = this.saldo - valor;
    console.log(
      colors.fg.greenstrong,
      `\nSaque de R$ ${valor.toFixed(2)} realizado com sucesso!`,
      colors.reset
    );
    return true;
  }

  public visualizar(): void {
    super.visualizar();
    console.log(`Limite de crédito: R$ ${this._limite.toFixed(2)}`);
    console.log(`Saldo + Limite: R$ ${(this.saldo + this._limite).toFixed(2)}`);
    console.log(
      "*****************************************************",
      colors.reset
    );
  }
}
