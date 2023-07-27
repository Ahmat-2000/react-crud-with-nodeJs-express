import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import Sinup from './components/Sinup';
import Login from './components/Login';
import { useState, createContext, useEffect } from 'react';


export const productContext = createContext();


function App() {
  const [productList, setProductList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3003/products").then((response) => {
      setProductList(response.data);
    }).catch((err) => { console.log(err.message)});
  },[])
  return (
    <Router>
      <Navbar setSearchResult={setSearchResult}/>
      <main className='App'>
      <productContext.Provider value ={{productList,setProductList}} >
        <Routes>
          <Route path='/' element={<Home />}></Route>
            <Route path='/products/search' element={<Products searchResult={searchResult}/>}></Route>
            <Route path='/products' element={<Products searchResult={searchResult}/>}></Route>
            <Route path='/addProduct' element={<AddProduct />}></Route>          
            <Route path='/sinUp' element={<Sinup />}></Route>          
            <Route path='/login' element={<Login />}></Route>          
        </Routes>
      </productContext.Provider>
      </main>
      
    </Router>
    
  );
}

export default App;
