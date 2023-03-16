import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

// COMPONENTS
import Header from './components/Header';
import AllRecipes from './components/AllRecipes';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';
import EditRecipe from './components/EditRecipe';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import PageNotFound from './components/PageNotFound';
import Forbidden from './components/Forbidden';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route exact path='/' element={<Navigate replace to='/recipes' />} />
        <Route path='/recipes' element={<AllRecipes />} />
        <Route exact path='/recipes/create' element={<CreateRecipe />} />
        <Route path='/recipes/:id' element={<RecipeDetail />} />
        <Route path='/recipes/:id/edit' element={<EditRecipe />} />
        <Route path='/users/signin' element={<SignIn />} />
        <Route path='/users/signup' element={<SignUp />} />
        <Route path='/users/signout' element={<SignOut />} />
        <Route path='/forbidden' element={<Forbidden />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
