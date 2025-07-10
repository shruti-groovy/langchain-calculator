import { Injectable } from "@nestjs/common";
import { runCalculator } from "../langchain/calculator-agent";
import { CalculateDto } from "./dto/calculate.dto";

@Injectable()
export class CalculatorService {
  async calculate(dto: CalculateDto): Promise<string | any> {
    return await runCalculator(dto.query);
  }
}
