# Maintain Software Architecture Diagrams

Date: 2023-04-23

## Status
Accepted

## Context
Software architecture diagrams are a helpful communication tool in software development. They improve communication and on-boarding procedures by making it easier for developers to visually understand the project's architecture and how everything is connected. This is especially important for on-boarding new team members later in the development process.

However, the diagrams come with maintenance costs. As the system evolves, the diagrams must be updated to reflect those changes. Failure to update the diagrams can lead to confusion and miscommunication among team members, which can result in errors and delays in development.

## Decision
We will use the diagrams-as-code approach to maintain our software architecture diagrams. All diagrams will be defined using code, which will be version controlled alongside the rest of the codebase.

## Consequences
The diagrams-as-code approach has several benefits:

- **Consistency:** Diagrams can be version controlled alongside the codebase, ensuring that they are always consistent with the current state of the system.

- **Efficiency:** Diagrams can be generated automatically from code, saving time and reducing the risk of errors.

- **Collaboration:** As diagrams are stored in code, they can be easily shared and collaborated on by the development team.

- **Accessibility:** The text-based syntax used to define diagrams is easy to learn and can be used by all members of the development team, regardless of their level of experience with graphical diagramming tools.

However, there are also some potential drawbacks to this approach:

- **Learning curve:** Developers may need to spend some time learning the syntax used to define diagrams in code.

- **Limited expressiveness:** Some types of diagrams may be more difficult to define using code, compared to a graphical diagramming tool.

Overall, we believe that the benefits of the diagrams-as-code approach outweigh the potential drawbacks, and we will use this approach to maintain our software architecture diagrams.