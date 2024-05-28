import React from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from './Login/Login';
import HomePage from './HomePage/HomePage';
import Registrar from './Registrar/Registrar';
import Listar from './HomePage/ListarItems';

const App: React.FC = () => {
  return (

      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/principal" element={<HomePage />} />
              <Route path="/lista" element={<Listar />} />
              <Route path="/registro" element={<Registrar />} />
          </Routes>
      </Router>
  );
}

export default App;
