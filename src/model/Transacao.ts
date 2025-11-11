export class Transacao {
  private _id: number;
  private _tipo: string; // "SAQUE", "DEPOSITO", "TRANSFERENCIA"
  private _valor: number;
  private _data: Date;
  private _descricao: string;
  private _numeroConta: number;

  constructor(
    tipo: string,
    valor: number,
    descricao: string,
    numeroConta: number
  ) {
    this._id = Date.now();
    this._tipo = tipo;
    this._valor = valor;
    this._data = new Date();
    this._descricao = descricao;
    this._numeroConta = numeroConta;
  }

  // Getters
  public get id(): number {
    return this._id;
  }
  public get tipo(): string {
    return this._tipo;
  }
  public get valor(): number {
    return this._valor;
  }
  public get data(): Date {
    return this._data;
  }
  public get descricao(): string {
    return this._descricao;
  }
  public get numeroConta(): number {
    return this._numeroConta;
  }
}
