# Hexagonal Architecture

## Table of Contents

- [What is Hexagonal Architecture?](#what-is-hexagonal-architecture)
- [Why Hexagonal Architecture?](#why-hexagonal-architecture)
- [Components of Hexagonal Architecture](#components-of-hexagonal-architecture)
- [Hexagonal Architecture in TypeScript](#hexagonal-architecture-in-typescript)
- [Stack used](#stack-used)
- [How to run the project](#how-to-run-the-project)
- [References](#references)
- [License](#license)

# What is Hexagonal Architecture?

Hexagonal Architecture, also referred to as Ports and Adapters Architecture or Ports and Adapters Pattern, is an approach to software development that isolates the central business logic of an application from its external interfaces and infrastructure components. The main objective of Hexagonal Architecture is to design a system that is not reliant on any particular technology, framework, or infrastructure, which facilitates the modification or replacement of these components without impacting the core business logic. This architecture focuses on creating a versatile and scalable system that can develop over time.

# Why Hexagonal Architecture?

Hexagonal Architecture is a great choice for applications that are expected to evolve over time. It is also a good choice for applications that are expected to have multiple interfaces or infrastructure components.

This pattern offers several advantages for software development, including flexibility and adaptability, testability, modularity and maintainability, and agility and time to market. This architectural approach separates the core business logic of an application from its external interfaces and infrastructure components, which enables developers to modify or replace these components without affecting the core business logic. This makes it easy to create a flexible and adaptable system that can evolve over time.

# Components of Hexagonal Architecture

Hexagonal Architecture is composed of three main components:

- _Core Domain_: This is the innermost layer of the architecture and contains the core business logic of the application. It is isolated from the external interfaces and infrastructure components and can be tested independently. This layer defines the application's business rules and processes, which are specific to the problem domain.
- _Ports_: These are the interfaces that enable the core domain to communicate with the external world. They specify the operations that can be performed on the system and the data that can be exchanged. Ports can be implemented in various ways, such as REST APIs, messaging systems, or command-line interfaces. The ports define the boundaries of the system and help to decouple the core domain from the external interfaces.
- _Adapters_: These are the components that bridge the gap between the core domain and the external interfaces and infrastructure components. Adapters convert the data and operations of the ports into the specific format required by the underlying technology. Adapters can be implemented for databases, file systems, web frameworks, or any other technology that the system needs to interact with.

The use of these three components - Core Domain, Ports, and Adapters - helps to create a modular and maintainable system that can evolve over time, by separating concerns and dependencies, and by focusing on the core business logic of the application.

- For example:

  ![Hexagonal Architecture Components](https://miro.medium.com/v2/resize:fit:1400/1*LF3qzk0dgk9kfnplYYKv4Q.png)

# Hexagonal Architecture in TypeScript

The current project aims to implement a simple Hexagonal Architecture in TypeScript. You can take a look at it in the 'src/services' folder, which is divided into three main folders:

- Dashboard API
- Control Plane
- Repository

Each of them represents a Hexagon of the architecture.

The Dashboard API is the entry point of the application and is responsible for exposing the necessary services, such as those exposed through a REST API.

The Control Plane is responsible for handling the authentication and authorization of the application. Here, various authentication strategies and patterns can be implemented, including JWT or a simple username and password approach.

The Repository is the adapter of the application and is responsible for communicating with the database. In this hexagon, it handles the business logic pertaining to the database, including the connection, queries, etc.

**_*Disclaimer: This project intends to be a simple example of how to implement a Hexagon in TypeScript. In many parts of the code, you will see 'Mocks' or simplifications regarding the actual implementation.*_**

Throught the project, I also wrote some unit tests to check the funcionality of the main components in the application.

In addition, I also coded the client side of the application, which is a simple React application that consumes the services exposed by the Dashboard API. You can take a look at it, however it is nothing spectacular, the idea is to show how to connect the server to client (in this specific case though tRPC) and consume or send data from both sides.

# Stack used

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [Vite](https://vitejs.dev/)
- [trpc](https://trpc.io/)
- [Vitest](https://vitest.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

# How to run the project

To run the project, you need to have Node.js installed on your machine. You can download it from [here](https://nodejs.org/en/download/).

Once you have Node.js installed, you can run the following commands:

- `yarn` - This will install all the dependencies of the project. You only need to run this command once (You can also use 'npm' or 'pnpm' instead)

- `yarn server` - This will start the server. You can access the server at http://localhost:4000/trpc

- `yarn dev` - This will start the client. You can access the client at http://localhost:5173

- `yarn test` - This will run the unit tests of the project

# References

- [Hexagonal Architecture, there are always two sides to every story](https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c)
- [Hexagonal Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>)
- [#HEXAGONAL #ARCHITECTURE , qué es y qué diferencias tiene contra #CLEAN #ARCHITECTURE ? - PT 1](https://www.youtube.com/watch?v=NOWU4K6piwo&list=PL42UNLc8e48TF9l07z_tLGHzmC_d-yfJJ&index=8&ab_channel=GentlemanProgramming) (This was the main inspiration, if you speak spanish I highly recommend to wacth the entire playlist)
- [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture: What You Need To Know - Simple Explanation](https://www.youtube.com/watch?v=bDWApqAUjEI&ab_channel=AlexHyett)
- [Hexagonal architecture: What is it and why should you use it?](https://cardoai.com/what-is-hexagonal-architecture-should-you-use-it/)

# Contributing

If you want to contribute to this project, feel free to open a PR. I will be happy to review it and merge it if it is relevant.
Otherwise, if you have any suggestions or comments, feel free to open an issue, I will be pleased to read it and discuss it with you. :rocket:
