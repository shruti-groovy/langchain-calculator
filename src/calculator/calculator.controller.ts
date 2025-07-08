import { Controller, Post, Body } from "@nestjs/common";
import { CalculatorService } from "./calculator.service";

@Controller("calculator")
export class CalculatorController {
  constructor(private readonly calcService: CalculatorService) {}

  @Post()
  async calculate(@Body() body: { query: string }) {
    const result = await this.calcService.calculate(body.query);
    return { result };
  }
}
