import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import './App.css'

// COMPONENTS
import HomePage from './components/HomePage';
import Header from './components/Header';
import AllRecipes from './components/AllRecipes';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';
import EditRecipe from './components/EditRecipe';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import PageNotFound from './components/PageNotFound';
import Forbidden from './components/Forbidden';

function App() {

  const { user } = useContext(UserContext);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path='/' element={
          user ? (
            <Navigate replace to='/recipes' />
          ) : (
            <Navigate replace to='/welcome' />

          )
        } />
        <Route path='/welcome' element={<HomePage />} />
        <Route path='/recipes' element={<AllRecipes />} />
        <Route path='/recipes/:id' element={<RecipeDetail />} />
        <Route path='/users/signin' element={<SignIn />} />
        <Route path='/users/signup' element={<SignUp />} />
        <Route path='/users/signout' element={<SignOut />} />
        <Route path='/forbidden' element={<Forbidden />} />
        <Route element={<PrivateRoute />}>
          <Route exact path='/recipes/create' element={<CreateRecipe />} />
          <Route path='/recipes/:id/edit' element={<EditRecipe />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
