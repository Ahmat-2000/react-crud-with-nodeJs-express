import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import Sinup from './components/Sinup';
import Login from './components/Login';
import NoPage from './components/NoPage';
import { React, useState, createContext, useEffect } from 'react';

export const productContext = createContext();
export const authContext = createContext();

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [productList, setProductList]= useState([]);
  const [authentication, setAuthentication] = useState({username : "", userId : 0, connected : false});
  const [isLoading, setIsLoading] = useState(true); // Use a loading state
  
  window.addEventListener('storage', function(event) {
    if(event.key === 'accessToken')
    {
      // Perform the window reload
      window.location.reload();
    }
    if (event.key === 'accessToken' && event.newValue === null) {
      setAuthentication({username : "", userId : 0, connected : false});
    }
  });
  
  useEffect(() => {
    // Check localStorage for authentication data on initial load
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.get("http://localhost:3003/users/token", {
        headers: { token: accessToken }
      })
      .then((response) => {
        if (response.data.error) {
          setAuthentication({
            username: "",
            userId: 0,
            connected: false
          });
        } else {
          setAuthentication({
            username: response.data.username,
            userId: response.data.userId,
            connected: true
          });
        }
      })
      .catch((err) => {
        // console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false); // Mark the loading as complete
      });
    } else {
      setIsLoading(false); // Mark the loading as complete if no accessToken
    }
  }, []);
  if (isLoading) {
    return;
    //return <div>Loading...</div>;
  }
  return (
    <authContext.Provider value={{authentication,setAuthentication,setSearchResult,searchResult}}>
    <Router>
      <Navbar />
      <main className='App'>
      <productContext.Provider value={{productList, setProductList}}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          
          {
          authentication.connected ?
          (<>
          
            <Route path='/products/search' element={<Products searchResult={searchResult}/>} />
            <Route path='/products' element={<Products searchResult={searchResult}/>} />
            <Route path='/addProduct' element={<AddProduct />} />
          </>)
          : (<>
          <Route path='/sinUp' element={<Sinup />} />
          <Route path='/login' element={<Login />} />
          </>)
          }
            
          <Route path='*' element={<NoPage />}></Route>
        </Routes>
        </productContext.Provider>
      </main>      
    </Router>
    </authContext.Provider>
  );
}

export default App;
