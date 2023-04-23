# Creating a Checkout Builder Interface

Date: 2023-04-21

## Status
Proposed

## Context
To easily use the Checkout Widget, we want to create a Checkout Builder interface that allows users to easily create and customize their own checkout forms for accepting payments in Superfluid streams. This Checkout Builder interface will be used to generate a **JSON structure** that can be consumed by the Superfluid Checkout Widget. The Checkout Builder interface should be easy to use and work with Superfluid Token List.

We will use existing patterns from Superfluid Dashboard and Superfluid Console to speed up development. The technologies chosen are aligned with other Superfluid products.

## Decision
We will create a Checkout Builder interface using Next.js, React, MUI, TypeScript, react-hook-form, and Zod. The interface will allow users to easily create and customize their own checkout forms for accepting payments in Superfluid streams. The Checkout Builder interface will generate a JSON structure that can be consumed by the Superfluid Checkout Widget. 

Next.js will be used as the framework for the Checkout Builder interface due to its server-side rendering capabilities and ease of deployment. React will be used for the frontend of the interface as it is widely used and has a large community. MUI will be used for styling as it has good theming options, is suitable for fast prototyping and is good for building back-office apps with good usability. 

TypeScript will be used for its strong typing and better developer experience. react-hook-form will be used for form management patterns and Zod for runtime type-checking of user input and the generated JSON structure.

The interface is supposed to be user-friendly and easy to use. The interface will allow users to customize the fields and properties of their checkout form, including the receiver address, product information, networks, tokens and flow rate. We will also consider adding validation and error handling to make the interface more robust.

We haven't decided on storage options yet. For user testing and schema testing purposes, it can stay ephemeral. Later on, we will add storage options such as IPFS for decentralized persistence and self-hosted storage for full-blown merchant set-ups.

## Consequences
We'll have an interface built in swift time to validate the UX viablity and the Checkout Widget schema.

Later on, when we have a more clear merchant product-suite offering, the process of setting up products should work in bulk and be automatable. We'll not deal with this use-case yet. 