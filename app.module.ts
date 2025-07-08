import { Module } from "@nestjs/common";
import { CalculatorModule } from "./src/calculator/calculator.module";

@Module({
  imports: [CalculatorModule],
})
export class AppModule {}
