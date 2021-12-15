import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import SignUp from './SignUp';
import { Route, Routes } from "react-router-dom"

function App() {
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
            <SignUp />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
