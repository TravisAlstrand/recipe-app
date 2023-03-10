const api = (
  path,
  method = "GET",
  body = null,
  credentials = null
) => {
  const url = "http://localhost:5000/" + path;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json;",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (credentials) {
    const encodedCredentials = window.btoa(
      `${credentials.username}:${credentials.password}`
    );

    options.headers["Authorization"] = `Basic ${encodedCredentials}`;
  }

  return fetch(url, options);
};

// USER FUNCTIONS

export const getUser = async (username, password) => {

  const user = await api('users', "GET", null, { username, password })
    .then(res => res.json());

  return user;
};

// RECIPE FUNCTIONS

export const getAllRecipes = async () => {

  const recipes = await api('recipes')
    .then(res => res.json());

  return recipes;
};

export const getSingleRecipe = async (id) => {
  const recipe = await api(`recipes/${id}`)
    .then(res => res.json());

  return recipe;
}