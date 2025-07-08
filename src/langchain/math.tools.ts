import { StructuredTool } from "@langchain/core/tools";
import { JsonSchema7ObjectType } from "@langchain/core/utils/json_schema";

type MathOperation = (a: number, b: number) => number;

function createMathTool(
  name: string,
  description: string,
  operation: MathOperation
): StructuredTool {
  return new (class extends StructuredTool {
    name = name;
    description = description;
    schema: JsonSchema7ObjectType = {
      type: "object",
      properties: {
        a: { type: "number", description: "First number" },
        b: { type: "number", description: "Second number" },
      },
      required: ["a", "b"],
    };

    async _call({ a, b }: { a: number; b: number }) {
      if (name === "divide" && b === 0) {
        throw new Error("Cannot divide by zero");
      } else if (name === "modulo" && b === 0) {
        throw new Error("Cannot modulo by zero");
      }
      return operation(a, b).toString();
    }
  })();
}

export const mathTools = [
  createMathTool("add", "Add two numbers", (a, b) => a + b),
  createMathTool("subtract", "Subtract two numbers", (a, b) => a - b),
  createMathTool("multiply", "Multiply two numbers", (a, b) => a * b),
  createMathTool("divide", "Divide two numbers", (a, b) => a / b),
  createMathTool(
    "modulo",
    "Calculate the remainder of a divided by b",
    (a, b) => a % b
  ),
];
