# Contextual Logging in Node.js

For a detailed explanation of the concepts used in this repository, read the accompanying article: [Logging with Pino and AsyncLocalStorage in Node.js](https://maximorlov.com/logging-with-pino-and-asynclocalstorage-in-nodejs/).

An example Node.js (Express) application that implements contextual logging by attaching a request ID to every log line. It uses [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage) together with [Pino](https://github.com/pinojs/pino).

## Getting started

1. Clone this repository:
```bash
git clone git@github.com:Maximization/contextual-logging-nodejs.git && cd contextual-logging-nodejs
```

2. Install NPM dependencies:
```bash
npm install
```

3. Start the Node.js application:
```bash
npm start
```

4. Visit `http://localhost:3000/users/1` in your browser and hit refresh a few times.
5. View the logs in your terminal. Each log line will have a unique request ID present.
```shell
{...,"requestId":"da672623-818b-4b18-89ca-7eb073accbfe","userId":1,"msg":"Fetching user from DB"}
{...,"requestId":"da672623-818b-4b18-89ca-7eb073accbfe","user":{...},"msg":"User found, sending to client"}
{...,"requestId":"01107c17-d3c8-4e20-b1ed-165e279a9f75","userId":1,"msg":"Fetching user from DB"}
{...,"requestId":"01107c17-d3c8-4e20-b1ed-165e279a9f75","user":{...},"msg":"User found, sending to client"}
```
