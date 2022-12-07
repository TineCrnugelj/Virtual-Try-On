import {Fragment} from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Questions from "./pages/Questions";
import Navbar from './components/NavBar';
import Login from "./pages/Login";

function App() {

  return <Fragment>
      <Router>
          <Navbar />
          <div className='content'>
              <Routes>
                  <Route path='/login' element={<Login />} />
                  <Route path='/' element={<Questions />} />
              </Routes>
          </div>
      </Router>
  </Fragment>
}

export default App;