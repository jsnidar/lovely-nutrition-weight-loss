import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={
          <Home />
        } />
      </Routes>
    </div>
  );
}

export default App;
