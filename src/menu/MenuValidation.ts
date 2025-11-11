export class MenuValidation {
  public static validarNumeroConta(numero: number): boolean {
    return numero > 0;
  }

  public static validarValor(valor: number): boolean {
    return valor > 0;
  }

  public static validarAgencia(agencia: number): boolean {
    return agencia > 0 && agencia <= 9999;
  }

  public static validarTitular(titular: string): boolean {
    return titular.trim().length >= 3;
  }
}
