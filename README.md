# Hexagonal Architecture

# What is Hexagonal Architecture?

Hexagonal Architecture, also referred to as Ports and Adapters Architecture or Ports and Adapters Pattern, is an approach to software development that isolates the central business logic of an application from its external interfaces and infrastructure components. The main objective of Hexagonal Architecture is to design a system that is not reliant on any particular technology, framework, or infrastructure, which facilitates the modification or replacement of these components without impacting the core business logic. This architecture focuses on creating a versatile and scalable system that can develop over time.

# Why Hexagonal Architecture?

Hexagonal Architecture is a great choice for applications that are expected to evolve over time. It is also a good choice for applications that are expected to have multiple interfaces or infrastructure components. This architecture is also a good choice for applications that are expected to have multiple interfaces or infrastructure components. This architecture is also a good choice for applications that are expected to have multiple interfaces or infrastructure components. This architecture is also a good choice for applications that are expected to have multiple interfaces or infrastructure components. This architecture is also a good choice for applications that are expected to have multiple interfaces or infrastructure components. This architecture is also a good choice for applications that are expected to have multiple interfaces or infrastructure components. This architecture is also a good choice for applications that are expected to have multiple interfaces or infrastructure components. This architecture is also a good choice for applications that are expected to have multiple interfaces or infrastructure components. This architecture is also a good choice for applications that are expected to have multiple interfaces or infrastructure components. This architecture is also a good choice for applications that are expected to have multiple interfaces or infrastructure components. This architecture is also a good choice for applications that are expected to have multiple interfaces or infrastructure components.

# Components of Hexagonal Architecture

Hexagonal Architecture is composed of three main components

- Core Domain: This is the innermost layer of the architecture and contains the core business logic of the application. It is isolated from the external interfaces and infrastructure components and can be tested independently. This layer defines the application's business rules and processes, which are specific to the problem domain.
- Ports: These are the interfaces that enable the core domain to communicate with the external world. They specify the operations that can be performed on the system and the data that can be exchanged. Ports can be implemented in various ways, such as REST APIs, messaging systems, or command-line interfaces. The ports define the boundaries of the system and help to decouple the core domain from the external interfaces.
- Adapters: These are the components that bridge the gap between the core domain and the external interfaces and infrastructure components. Adapters convert the data and operations of the ports into the specific format required by the underlying technology. Adapters can be implemented for databases, file systems, web frameworks, or any other technology that the system needs to interact with.

The use of these three components - Core Domain, Ports, and Adapters - helps to create a modular and maintainable system that can evolve over time, by separating concerns and dependencies, and by focusing on the core business logic of the application.
For example:
![Hexagonal Architecture Components](https://miro.medium.com/v2/resize:fit:1400/1*LF3qzk0dgk9kfnplYYKv4Q.png)
