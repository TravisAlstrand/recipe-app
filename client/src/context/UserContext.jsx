import { createContext, useState } from "react";
import { useCookies } from 'react-cookie';
import { getUser } from "../ApiCalls";

export const UserContext = createContext(null);

export const Provider = (props) => {

  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState(cookies.user || null);

  async function signInUser(username, password) {
    const response = await getUser(username, password);
    response.password = password;

    setUser(response);
    setCookie('user', response, { path: '/' });
  };

  function signOutUser() {
    setUser(null);
    removeCookie('user');
  };

  return (
    <UserContext.Provider value={{
      user,
      actions: {
        signIn: signInUser,
        signOut: signOutUser
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
};