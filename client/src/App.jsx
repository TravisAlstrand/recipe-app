import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from './ApiCalls';
import UserContext from './context/UserContext';
import './App.css'

// COMPONENTS
import Header from './components/Header';
import AllRecipes from './components/AllRecipes';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';
import EditRecipe from './components/EditRecipe';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PageNotFound from './components/PageNotFound';

function App() {

  const [user, setUser] = useState(null);

  async function signInUser(username, password) {
    const response = await getUser(username, password);

    setUser(response);
  };

  function signOutUser() {
    setUser(null);
  };

  return (
    <>
      <UserContext.Provider value={{
        user,
        actions: {
          signIn: signInUser,
          signOut: signOutUser
        }
      }}>
        <Header />
        <Routes>
          <Route exact path='/' element={<Navigate replace to='/recipes' />} />
          <Route path='/recipes' element={<AllRecipes />} />
          <Route exact path='/recipes/create' element={<CreateRecipe />} />
          <Route path='/recipes/:id' element={<RecipeDetail />} />
          <Route path='/recipes/:id/edit' element={<EditRecipe />} />
          <Route path='/users/signin' element={<SignIn />} />
          <Route path='/users/signup' element={<SignUp />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
