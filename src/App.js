import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Profile from './components/Profile';


import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='profile' element={<Profile />} />
          </Route>
      </Routes>
    </div>
  )
}

export default App;
