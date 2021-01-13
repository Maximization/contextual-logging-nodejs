const pino = require('pino');
const uuid = require('uuid');
const context = require('./async-context.js');

// Create a logging instance
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});

// Proxify logger instance to use child logger from context if it exists
module.exports.logger = new Proxy(logger, {
  get(target, property, receiver) {
    target = context.getStore()?.get('logger') || target;
    return Reflect.get(target, property, receiver);
  },
});

// Generate a unique ID for each incoming request and store a child logger in context
// to always log the request ID
module.exports.contextMiddleware = (req, res, next) => {
  const child = logger.child({ requestId: uuid.v4() });
  const store = new Map();
  store.set('logger', child);

  return context.run(store, next);
};
