'use strict';

const bcryptjs = require('bcryptjs');
const Context = require('./context');

class Database {
  constructor(seedData, enableLogging) {
    this.recipes = seedData.recipes;
    this.users = seedData.users;
    this.enableLogging = enableLogging;
    this.context = new Context('recipe-app.db', enableLogging);
  }

  log(message) {
    if (this.enableLogging) {
      console.info(message);
    }
  }

  tableExists(tableName) {
    this.log(`Checking if the ${tableName} table exists...`);

    return this.context
      .retrieveValue(`
        SELECT EXISTS (
          SELECT 1 
          FROM sqlite_master 
          WHERE type = 'table' AND name = ?
        );
      `, tableName);
  }

  createUser(user) {
    return this.context
      .execute(`
        INSERT INTO Users
          (username, password)
        VALUES
          (?, ?);
      `,
        user.username,
        user.password);
  }

  createRecipe(recipe) {
    return this.context
      .execute(`
        INSERT INTO Recipes
          (userId, recipeName, ethnicType, difficulty, isSlowCooker, ingredients, directions)
        VALUES
          (?, ?, ?, ?, ?, ?, ?);
      `,
        recipe.userId,
        recipe.recipeName,
        recipe.ethnicType,
        recipe.difficulty,
        recipe.isSlowCooker,
        recipe.ingredients,
        recipe.directions,
        recipe.prepTime,
        recipe.cookTime
      );
  }

  async hashUserPasswords(users) {
    const usersWithHashedPasswords = [];

    for (const user of users) {
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      usersWithHashedPasswords.push({ ...user, password: hashedPassword });
    }

    return usersWithHashedPasswords;
  }

  async createUsers(users) {
    for (const user of users) {
      await this.createUser(user);
    }
  }

  async createRecipes(recipes) {
    for (const recipe of recipes) {
      await this.createRecipe(recipe);
    }
  }

  async init() {
    const userTableExists = await this.tableExists('Users');

    if (userTableExists) {
      this.log('Dropping the Users table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Users;
      `);
    }

    this.log('Creating the Users table...');

    await this.context.execute(`
      CREATE TABLE Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username VARCHAR(255) NOT NULL DEFAULT '' UNIQUE, 
        password VARCHAR(255) NOT NULL DEFAULT ''
      );
    `);

    this.log('Hashing the user passwords...');

    const users = await this.hashUserPasswords(this.users);

    this.log('Creating the user records...');

    await this.createUsers(users);

    const recipeTableExists = await this.tableExists('Recipes');

    if (recipeTableExists) {
      this.log('Dropping the Recipes table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Recipes;
      `);
    }

    this.log('Creating the Recipes table...');

    await this.context.execute(`
      CREATE TABLE Recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        recipeName VARCHAR(255) NOT NULL DEFAULT '' UNIQUE,
        ethnicType VARCHAR(255),
        difficulty VARCHAR(255),
        isSlowCooker BOOLEAN,
        ingredients VARCHAR(255), 
        directions VARCHAR(255),
        prepTime VARCHAR(255),
        cookTime VARCHAR(255),
        userId INTEGER NOT NULL DEFAULT -1 
          REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.log('Creating the recipe records...');

    await this.createRecipes(this.recipes);

    this.log('Database successfully initialized!');
  }
}

module.exports = Database;