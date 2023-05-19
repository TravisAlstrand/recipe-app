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

  if (response.status === 400) {
    return response.json();
  } else {
    return "Yeah, a little TOO Raph!"
  };
};

// =======  RECIPE FUNCTIONS  =======

export const getAllRecipes = async () => {

  const response = await api('recipes')
    .then(res => res.json());

  return response;
};

export const getSortedRecipes = async (key, value) => {
  const response = await api(`recipes/sort/${key}/${value}`);
  if (response.status === 200) {
    return response.json();
  } else {
    return response.status;
  };
}

export const getSingleRecipe = async (id) => {
  const response = await api(`recipes/${id}`);

  if (response.status === 200) {
    return response.json();
  } else {
    return response.status;
  };
};

export const createRecipe = async (body, username, password) => {
  const response = await api('recipes', 'POST', body, { username, password });

  if (response.status === 400) {
    return response.json();
  } else {
    return "Pizza dude's got 30 seconds..."
  };
};

export const updateRecipe = async (body, username, password) => {
  const response = await api(`recipes/${body.id}`, 'PUT', body, { username, password });

  if (response.status === 400) {
    return response.json();
  } else if (response.status === 403) {
    return response;
  } else {
    return "Is Schwarzenegger hard to spell?"
  };
};

export const deleteRecipe = async (id, username, password) => {
  const response = await api(`recipes/${id}`, 'DELETE', null, { username, password });

  if (response.status === 403 || response.status === 404) {
    return response.status;
  } else {
    return "You dirty rat! You killed my brudda! You dirty rat!"
  };
};