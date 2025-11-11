import * as fs from "fs";
import * as path from "path";
import { Conta } from "../model/Conta";
import { ContaCorrente } from "../model/ContaCorrente";
import { ContaPoupanca } from "../model/ContaPoupanca";

export class ContaRepository {
  private static readonly DATA_DIR = path.join(__dirname, "../../data");
  private static readonly FILE_PATH = path.join(this.DATA_DIR, "contas.json");

  public static salvarContas(contas: Conta[]): void {
    try {
      // Criar diretório se não existir
      if (!fs.existsSync(this.DATA_DIR)) {
        fs.mkdirSync(this.DATA_DIR, { recursive: true });
      }

      const dados = contas.map((conta) => {
        if (conta instanceof ContaCorrente) {
          return {
            tipo: "ContaCorrente",
            numero: conta.numero,
            agencia: conta.agencia,
            tipoNumero: conta.tipo,
            titular: conta.titular,
            saldo: conta.saldo,
            limite: (conta as ContaCorrente).limite,
          };
        } else if (conta instanceof ContaPoupanca) {
          return {
            tipo: "ContaPoupanca",
            numero: conta.numero,
            agencia: conta.agencia,
            tipoNumero: conta.tipo,
            titular: conta.titular,
            saldo: conta.saldo,
            aniversario: (conta as ContaPoupanca).aniversario,
          };
        }
      });

      fs.writeFileSync(this.FILE_PATH, JSON.stringify(dados, null, 2), "utf8");
    } catch (error) {
      console.error("Erro ao salvar contas:", error);
    }
  }

  public static carregarContas(): Conta[] {
    try {
      if (!fs.existsSync(this.FILE_PATH)) {
        return [];
      }

      const dados = fs.readFileSync(this.FILE_PATH, "utf8");
      const contasData = JSON.parse(dados);
      const contas: Conta[] = [];

      contasData.forEach((data: any) => {
        if (data.tipo === "ContaCorrente") {
          contas.push(
            new ContaCorrente(
              data.numero,
              data.agencia,
              data.tipoNumero,
              data.titular,
              data.saldo,
              data.limite
            )
          );
        } else if (data.tipo === "ContaPoupanca") {
          contas.push(
            new ContaPoupanca(
              data.numero,
              data.agencia,
              data.tipoNumero,
              data.titular,
              data.saldo,
              data.aniversario
            )
          );
        }
      });

      return contas;
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
      return [];
    }
  }
}
