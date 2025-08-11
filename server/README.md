# Schedule API - TypeScript

API REST para gerenciamento de agendamentos médicos construída com **TypeScript**, **Express.js** e **Orientação a Objetos**.

## Características

- **TypeScript** com tipagem forte
- **Orientação a Objetos** (Classes, Services, Controllers)
- **Arquitetura em camadas** (Controller → Service → Repository)
- **Injeção de dependências** manual
- **Validação de dados** robusta
- **Tratamento de erros** centralizado
- **Paginação, filtros e ordenação**

## Instalação e Execução

### Pré-requisitos

- Node.js >= 16.0.0
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd schedule-api-ts

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute em desenvolvimento
npm run dev

# Ou execute em produção
npm run build
npm start
```

### Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento com hot reload
npm run build        # Build para produção
npm start           # Executar versão buildada
npm run lint        # Verificar código com ESLint
npm run lint:fix    # Corrigir problemas do ESLint
npm test           # Executar testes
```

## Endpoints da API

### Agendamentos

```bash
GET    /api/schedules           # Listar com filtros/paginação/ordenação
GET    /api/schedules/:id       # Buscar por ID
POST   /api/schedules           # Criar novo
PUT    /api/schedules/:id       # Atualizar
DELETE /api/schedules/:id       # Deletar
```

## Exemplos de Uso

### Listar agendamentos com filtros

```bash
GET /api/schedules?medico=Silva&paciente=Ana&page=2&limit=5&sortBy=dataAgendamento&sortOrder=asc
```

### Criar agendamento

```bash
POST /api/schedules
Content-Type: application/json

{
  "medico": {
    "nome": "Dr. João Silva",
    "especialidade": "Cardiologia",
    "crm": "12345"
  },
  "paciente": {
    "nome": "Maria Santos",
    "dataNascimento": "1990-05-15",
    "telefone": "(11) 99999-9999",
    "email": "maria@email.com"
  },
  "dataAgendamento": "2025-08-30T14:00:00Z",
  "observacoes": "Consulta de rotina"
}
```

### Resposta padrão

```json
{
  "success": true,
  "data": [...],
  "message": "Operação realizada com sucesso",
  "pagination": {
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalPages": 5,
    "totalItems": 50,
    "hasNextPage": true,
    "hasPrevPage": false,
    "nextPageUrl": "/api/schedules?page=2",
    "prevPageUrl": null
  }
}
```

## Filtros Disponíveis

- **medico**: Nome do médico (busca parcial)
- **paciente**: Nome do paciente (busca parcial)
- **dataCriacao**: Data de criação (YYYY-MM-DD)
- **status**: Status do agendamento (`agendado`, `confirmado`, `cancelado`)
- **especialidade**: Especialidade médica (busca parcial)

## Ordenação Disponível

- **dataCriacao**: Data de criação
- **dataAgendamento**: Data do agendamento
- **medico**: Nome do médico
- **paciente**: Nome do paciente
- **status**: Status do agendamento

Ordem: `asc` (crescente) ou `desc` (decrescente)

## Configurações

### Variáveis de Ambiente

```bash
PORT=3001                    
NODE_ENV=development         
CORS_ORIGIN=*          
```

### Validações Implementadas

- **Médico**: Nome (min 2 chars), CRM (min 4 chars)
- **Paciente**: Nome (min 2 chars), email válido, data nascimento
- **Agendamento**: Data não pode ser no passado
- **Paginação**: Página ≥ 1, limite 1-100
- **Ordenação**: Campos válidos, ordem asc/desc

## Segurança

- **CORS**: Configurável por origem
- **Validação de entrada**: Sanitização de dados

## Arquitetura

### Padrão em Camadas

```
Request → Controller → Service → Repository → Data
```

### Injeção de Dependências

```typescript
Repository → Service → Controller → Route
```

### Tratamento de Erros

```typescript
try/catch → ErrorHandler → JSON Response
```
