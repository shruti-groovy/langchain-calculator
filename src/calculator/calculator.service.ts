import { Injectable } from "@nestjs/common";
import { runCalculator } from "../langchain/calculator-agent";

@Injectable()
export class CalculatorService {
  async calculate(input: string): Promise<string | any> {
    return await runCalculator(input);
  }
}
