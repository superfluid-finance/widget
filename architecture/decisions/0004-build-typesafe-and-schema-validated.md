```markdown
# Building Type-Safe and Schema-Validated

Date: 2023-04-21

## Status
Proposed

## Context
The tools and products we build are to be used by other builders and stay maintainable for long periods of time. 

The subject matter of payments, checkouts, merchants and consumers is very serious. Any sort of mistakes can result in financial losses and miserable users. 

JavaScript apps and Web3 wallet RPC interactions are notoriously error-prone.

## Decision

We will use **TypeScript** and **Zod** to build type-safe and schema-validated payments and checkout flows.

TypeScript is a superset of JavaScript that provides static type checking at compile time. This catches many errors before they manifest at runtime.

Zod is a TypeScript-first schema validation library that allows us to define and validate structured data.

By using TypeScript and Zod together, we can ensure type safety and schema validation throughout the entire development process, from compile time to runtime, resulting in code that is more reliable and maintainable.

## Consequences

Using TypeScript and Zod will require us to invest time and resources upfront in creating and maintaining schemas, and in ensuring that all relevant code is type-safe. However, this will pay dividends in reduced development time and increased reliability over the long term. Additionally, developers will need to be trained on TypeScript and Zod, or will need to learn these tools as they work on the project.
```