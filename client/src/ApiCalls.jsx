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
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  };

  if (credentials) {
    const encodedCredentials = window.btoa(
      `${credentials.username}:${credentials.password}`
    );

    options.headers["Authorization"] = `Basic ${encodedCredentials}`;
  };

  return fetch(url, options);
};

// =======  USER FUNCTIONS  =======

// GET SINGLE USER
export const getUser = async (username, password) => {

  const response = await api('users', 'GET', null, { username, password });

  if (response.status === 200) {
    return response.json();
  } else if (response.status === 401) {
    return null;
  };
};

// CREATE NEW USER
export const createUser = async (body) => {
  const response = await api('users', 'POST', body);

  if (response.status === 201) {
    return true;
  } else if (response.status === 400) {
    return response.json();
  };
};

// =======  RECIPE FUNCTIONS  =======

export const getAllRecipes = async () => {

  const recipes = await api('recipes')
    .then(res => res.json());

  return recipes;
};

export const getSingleRecipe = async (id) => {
  const recipe = await api(`recipes/${id}`)
    .then(res => res.json());

  return recipe;
};