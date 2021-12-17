import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom"

function App() {

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  if (!currentUser) return <SignIn signIn={setCurrentUser} />;

  

  return (
    <div>
      <NavBar />
      <Routes>
        <Route 
          path='/' 
          element={
            <Home currentUser={currentUser} />
          } 
        />
        <Route 
          path='/sign-up' 
          element={
            <SignUp setCurrentUser={setCurrentUser} />
          } 
        />
        <Route 
          path='/log-in' 
          element={
            <SignIn onSignIn={setCurrentUser} />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
