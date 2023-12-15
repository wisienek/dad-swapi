# Devanddeliver

This project is built as monorepo using NX framework. It consists of:

Apps:
- `devanddeliver` - main api

Libs:
- `backend/config` - library for reading configs
- `backend/redis` - library for managing redis connection (caching)
- `shared` - library for shared resources that can be used both in backend and other apps

## Project Setup

### Node.js environment

Recommended node version for this project is `node@20`!

Install all dependencies needed to run the project
Remember to install all dependencies after pulling from master - this will prevent any linting errors.

```shell
yarn install
```

It's probably good idea to have ts-node and NX installed globally. Check instructions at [nx.dev](https://nx.dev).

### Generating local env variables

To set up your local environment variables for the project, follow these steps:

1. Copy the example secrets file: Begin by creating a copy of the `.env.example` file and name it `.env`.
   You can do this in the terminal with the following command:

```shell
cp .env.example .env
```

2. Fill in the values: The `.env` file contains a list of key-value pairs which are your environment variables.
   You'll need to replace the placeholder values with your actual data.

### Containers

This project uses redis server (caching). To install locally just run:

```
yarn docker:compose up -d
```

## Running the applications locally

Here's how you can run our application on your local machine

### Running a single application

If you want to run application in dev mode, you can use the nx run command like this:

(nx installed globally)
```shell
nx run devanddevelop:serve
```

(nx from node-modules)
```shell
yarn nx run devanddevelop:serve
```

### Dockerize applications

In some cases, you need to build containers locally to simulate a production environment.

To build and run the container follow these steps:

(nx installed globally with docker and currently in root directory, redis container running)
```shell
docker build -t api -f dockerize/Dockerfile .
docker-compose -f ./docker-compose-apps.yml up api
```

