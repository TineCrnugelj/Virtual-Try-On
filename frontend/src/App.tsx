import {Fragment} from 'react'
import './App.css'
import Questions from "./components/Questions";

function App() {
  return <Fragment>
    <h1 className="mainHeader">Virtual Try-On</h1>
    <div className='content'>
      <Questions />
    </div>
  </Fragment>
}

export default App;