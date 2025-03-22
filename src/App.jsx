import { BrowserRouter as Router, Routes, Route } from 'react-router';
import React from 'react';
import Index from './pages/Index';
import ShowAllProduct from './components/ShowAllProduct';
import Updateproduct from './components/UpdateProduct';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path='/AllProducts' element={<ShowAllProduct />} />
          <Route path='/Updateproduct/:id' element={<Updateproduct />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
