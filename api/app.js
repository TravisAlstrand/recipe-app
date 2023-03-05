const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const router = require('./routes/index');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'recipe-app.db'
});

app.use(express.json());
app.use('/api', router);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to database was successful!')
  }).catch((err) => {
    console.error('Connection to database was unsuccessful!', err);
  });

sequelize.sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  }).catch(err => {
    console.error('Model synchronization was unsuccessful!', err);
  });


app.listen(5000, () => {
  console.log("App is listening on port 5000 🦄")
});