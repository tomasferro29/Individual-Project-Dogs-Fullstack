import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { createGlobalStyle } from "styled-components"
import Landing from './components/pages/Landing.jsx'
import Home from './components/pages/Home.jsx';
import Create from './components/pages/Create.jsx'
import Detail from './components/pages/Detail.jsx'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`

function App() {
  return (
    <>
      <GlobalStyles/>

      <BrowserRouter>
      {/* <Route path='/home' element={<Header/>} /> */}
        <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/home/:id' element={<Detail />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
