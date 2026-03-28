# backend-univalleshop-auth
hemos implementado el feature de autenticación como un vertical slice dentro de la arquitectura Clean Architecture + SOLID. Aunque el proyecto está diseñado para microservicios, comenzamos con una estructura modular que facilita la separación futura.

src/
├── app.module.ts                 # Módulo raíz de NestJS, importa AuthModule
├── main.ts                       # Entrada de la app, arranca Nest + validaciones globales
├── features/
│   └── auth/
│       ├── auth.module.ts        # Módulo de la feature Auth (importa CqrsModule, controllers, handlers, providers)
│       ├── domain/               # Dominio puro (reglas de negocio)
│       │   ├── entities/         # Entidades: User, con lógica de dominio/invariants
│       │   ├── value-objects/    # VO inmutables: Email, Password
│       │   ├── interfaces/       # Puertos primarios: IUserRepository (DIP)
│       │   └── services/         # Servicios de dominio (si necesitas lógica compleja)
│       ├── application/          # Casos de uso + CQRS
│       │   ├── commands/         # Comandos write: RegisterUserCommand, LoginUserCommand
│       │   ├── handlers/         # CommandHandlers que implementan caso de uso
│       │   ├── queries/          # (futuro) queries read
│       │   └── dtos/             # DTO de entrada/validación para controlador
│       ├── infrastructure/       # Implementación del repositorio / adaptadores externos
│       │   ├── adapters/         # InMemoryUserRepository, futura DB (TypeORM/Prisma)
│       │   └── config/           # Config infra (env, DB, keys)
│       └── presentation/         # Controladores/DTOs HTTP
│           ├── controllers/      # AuthController expone /auth/register, /auth/login
│           └── dtos/             # DTO/vo de transporte HTTP
└── shared/
    ├── kernel/
    │   ├── i-repository.ts      # Interfaz genérica de repositorio
    │   ├── base-entity.ts       # BaseEntity común
    │   └── exceptions.ts        # DomainException/ApplicationException
    └── infrastructure/          # Utilidades compartidas entre microservicios
