#!/usr/bin/env node

import mongoose from 'mongoose';
import http from 'http';
import app from '#src/app.js';
import logger from '#src/components/logger/logger.js';
import config from '#src/config.js';

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  logger.debug(`Listening on ${bind}`);
}

/**
 * Get port from environment and store in Express.
 */

app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
mongoose.connect(config.database.url).then(() => {
  logger.info('Database connected!');
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}).catch((err) => {
  logger.error('Database connection failed!');
  logger.error(err);
  process.exit(1);
});
