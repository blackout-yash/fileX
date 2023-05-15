import './App.css';
import Body from './components/Body';
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Download from './components/Download';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Body />} />
        <Route path='/download/:id' element={<Download />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
