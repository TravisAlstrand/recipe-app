const express = require('express');
const morgan = require('morgan');
const cors = require('cors)');
const { Sequelize } = require('sequelize');
const userRouter = require('./routes/users');
const recipeRouter = require('./routes/recipes');
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/users', userRouter);
app.use('/recipes', recipeRouter);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'recipe-app.db'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to database was successful!')
  }).catch((err) => {
    console.error('Connection to database was unsuccessful!', err);
  });


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

sequelize.sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  }).catch(err => {
    console.error('Model synchronization was unsuccessful!', err);
  });

app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});