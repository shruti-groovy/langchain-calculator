# 🧠 LangChain Calculator Agent (NestJS + Gemini)

This is a simple arithmetic calculator API powered by LangChain, Gemini 2.5 Pro, and NestJS. This agent can perform basic arithmetic operations and demonstrates how to integrate LangGraph + structured tools with Gemini in a NestJS backend.

---

## 🚀 Features

- ✅ Add, Subtract, Multiply, Divide, Modulo
- 🤖 Tool-calling via LangChain's `StructuredTool`
- 🧩 Built using LangGraph for multi-step reasoning
- 🔐 Free-tier Gemini (`gemini-2.5-pro`) compatibility
- 💡 Modular tool setup for easy extension

---

## 🏗️ Project Structure

├── src/
│ ├── calculator/ # Calculator module
│ │ ├── calculator.controller.ts # API endpoint
│ │ ├── calculator.service.ts # Business logic
│ │ └── calculator.module.ts
│ ├── langchain/
│ │ ├── calculator-agent.ts # LangGraph agent implementation
│ │ └── math.tools.ts # Math tool definitions
│ └── main.ts # Entry point
├── .env # Environment variables
├── package.json # Dependencies
└── README.md # This file

## 📦 Setup

## 1. Installation

```bash
$ npm install
```

## 2. Create a .env file:

GOOGLE_API_KEY=your_gemini_api_key_here
⚠️ Use your Google AI Studio key: https://makersuite.google.com/app/apikey

## 3. Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

---

## 📡 API Endpoint

Example Request:

POST /calculator

Body: {
"query": "What is 17 modulo 5?"
}

Example Response:
{
"result": {
"success": true,
"question": "What is 17 modulo 5?",
"answer": "17 modulo 5 is 2.\n"
}
}
