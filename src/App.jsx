
import './App.css';
import Home from './componets/home/Home';
import TopBar from './componets/topbar/TopBar';
import NavBar from './componets/navbar/NavBar';
import Footer from './componets/footer/Footer';
import Asos from './componets/assas/asos';
import Mirror from './componets/mirror/Mirror';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
 

  return (
    <>
      <BrowserRouter>
      <TopBar />
      <NavBar />
      <nav>
        
        <Link to="/asos"></Link>
      </nav>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asos" element={<Asos />} />
        <Route path="/mirror" element={<Mirror />} />
        
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
