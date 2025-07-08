import { ToolNode } from "@langchain/langgraph/prebuilt";
import { config } from "dotenv";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { mathTools } from "./math.tools";

config();

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-pro",
});

// Augment the LLM with tools
const llmWithTools = llm.bindTools(mathTools);

async function llmCall(state) {
  // LLM decides whether to call a tool or not
  const result = await llmWithTools.invoke([
    {
      role: "system",
      content:
        "You are a helpful assistant tasked with performing arithmetic on a set of inputs.",
    },
    ...state.messages,
  ]);

  return {
    messages: [result],
  };
}

// Conditional edge function to route to the tool node or end
function shouldContinue(state) {
  const messages = state.messages;
  const lastMessage = messages.at(-1);

  // If the LLM makes a tool call, then perform an action
  if (lastMessage?.tool_calls?.length) {
    return "Action";
  }
  // Otherwise, we stop (reply to the user)
  return "__end__";
}

// Build workflow
const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", new ToolNode(mathTools))
  // Add edges to connect nodes
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, {
    // Name returned by shouldContinue : Name of next node to visit
    Action: "tools",
    __end__: "__end__",
  })
  .addEdge("tools", "llmCall")
  .compile();

// Invoke
export const runCalculator = async (query: string) => {
  const messages = [{ role: "user", content: query }];

  const result = await agentBuilder.invoke({ messages });
  return result.messages.at(-1)?.content ?? "No result";
};
