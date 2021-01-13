const express = require('express');
const { logger, contextMiddleware } = require('./logger.js');
const db = require('./db.js');

const PORT = process.env.PORT || 3000;

const app = express();

// Attach a unique request ID to every log line
app.use(contextMiddleware);

app.get('/users/:id', async (req, res) => {
  let userId = req.params.id;

  if (isNaN(userId)) {
    logger.warn({ userId }, 'Invalid user ID');
    return res.status(400).send('Invalid user ID');
  } else {
    userId = Number(userId);
  }

  try {
    logger.info({ userId }, 'Fetching user from DB');
    const user = await db.getUser({ userId });

    if (!user) {
      logger.warn({ userId }, 'User not found');
      return res.status(404).send('User not found');
    }

    logger.debug({ user }, 'User found, sending to client');
    return res.status(200).json(user);
  } catch (error) {
    logger.error(error, 'Failed to fetch user from DB');
    return res.status(500).send('An error occurred while fetching user');
  }
});

app.listen(PORT, () => {
  logger.info(`Server listening at http://localhost:${PORT}`);
});
