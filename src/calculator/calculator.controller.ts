import { Controller, Post, Body } from "@nestjs/common";
import { CalculatorService } from "./calculator.service";
import { CalculateDto } from "./dto/calculate.dto";

@Controller("calculator")
export class CalculatorController {
  constructor(private readonly calcService: CalculatorService) {}

  /**
   * API endpoint
   * @param body
   * @returns
   */
  @Post()
  async calculate(@Body() body: CalculateDto) {
    const result = await this.calcService.calculate(body);
    return { result };
  }
}
