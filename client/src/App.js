import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import LogIn from './LogIn';
import CheckInForm from './CheckInForm';
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

  if (!currentUser) return <LogIn setCurrentUser={setCurrentUser} />;

  const updateCheckIns = (checkIn) => {
    const updatedUserInfo = {...currentUser}
    updatedUserInfo.check_ins.push(checkIn)
    setCurrentUser(updatedUserInfo)
  }

  return (
    <div>
      <NavBar setCurrentUser={setCurrentUser} />
      <Routes>
        <Route 
          path='/' 
          element={
            <Home currentUser={currentUser} />
          } 
        />
          <Route
            path='/check-ins/new'
            element={
              <CheckInForm updateCheckIns={updateCheckIns} />
            } />
      </Routes>
    </div>
  );
}

export default App;
