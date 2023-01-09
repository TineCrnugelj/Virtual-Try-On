import {Fragment} from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Questions from "./pages/Questions";
import Navbar from './components/NavBar';
import Login from "./pages/Login";
import Admin from './pages/Admin';
import Home from "./pages/Home";
import TakePhoto from "./pages/TakePhoto";
import Results from "./pages/Results";
import { ToastContainer } from 'react-toastify';

function App() {

  return <Fragment>
      <Router>
          <Navbar />
          <div className='content'>
              <Routes>
                  <Route path='/login' element={<Login />} />
                  <Route path='/quiz' element={<Questions />} />
                  <Route path='/admin' element={<Admin />} />
                  <Route path='/' element={<Home />} />
                  <Route path='/take-photo' element={<TakePhoto />} />
                  <Route path='/results' element={<Results />} />
              </Routes>
          </div>
      </Router>
      <ToastContainer />
  </Fragment>
}

export default App;