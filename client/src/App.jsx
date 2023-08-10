import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './components/pages/Landing.jsx'
import Home from './components/pages/Home.jsx';
import Create from './components/pages/Create.jsx'
import Detail from './components/pages/Detail.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/home/:id' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
