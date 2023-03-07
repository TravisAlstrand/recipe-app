import { Buffer } from 'buffer';

export default class ApiCalls {

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {

    const url = 'https://localhost:5000' + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encryptedCredentials = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
      options.headers['Authorization'] = `Basic ${encryptedCredentials}`;
    }

    const results = fetch(url, options);

    return (results);
  };

  async getAllRecipes() {
    const response = await api('/recipes');

    if (response.status === 200) {
      return response.json();
    }
  }

};