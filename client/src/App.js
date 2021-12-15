import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import SignUp from './SignUp';
import { useState } from 'react';
import { Route, Routes } from "react-router-dom"

function App() {

  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route 
          path='/' 
          element={
            <Home />
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
