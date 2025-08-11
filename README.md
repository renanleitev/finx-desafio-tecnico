# finx-surgical-schedules

Aplicativo para listagem e gerenciamento de consultas médicas.

## Tecnologias utilizadas

- Vue.js 3 - Framework principal com Composition API
- TypeScript - Tipagem estática e melhor DX
- Vite - Build tool moderna e rápida
- Vue Router - Roteamento SPA
- Tailwind CSS - Framework CSS utilitário
- Axios - Cliente HTTP para APIs
- ESLint + Prettier - Qualidade e formatação do código

## Funcionalidades

- Listagem de agendamentos com informações completas
- Dados de médicos e pacientes (nome, idade calculada)
- Data de criação formatada em pt-BR
- Filtros por médico ou paciente com busca em tempo real
- Botão de pesquisa e limpeza de filtros

## Configuração do Ambiente

### Back

Navegue até a pasta `server`:

```sh
cd server
```

Instale as dependências:

```sh
npm install
```

### Front

Volte para a pasta do front:

```sh
cd ..
```

Instale as dependências:

```sh
npm install
```

## Inciando a aplicação

Execute o comando abaixo para iniciar o back (irá rodar em ):

```sh
npm run server
```

Abra outro terminal e execute o comando abaixo para iniciar o front:

```sh
npm start
```
