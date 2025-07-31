//import './App.css'
import Admin from './pages/Admin'
import Home  from './pages/Home'
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </main>
  )
}

export default App
