import { useContext , useEffect, useState} from "react";
import Product from "./Product";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { authContext } from '../App';
import { productContext } from '../App';

export default function Products({searchResult}) {
  const {setAuthentication} = useContext(authContext);
  const {productList, setProductList}= useContext(productContext);
  const [isLoading, setIsLoading] = useState(true); // Use a loading state
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.get("http://localhost:3003/products",{headers : {token : accessToken}})
      .then((response) => {
        if(response.error){
          setAuthentication({
            username: '',
            userId: 0,
            connected: false})
        }
        setProductList(response.data);
      })
      .catch((err) => { setAuthentication({
        username: '',
        userId: 0,
        connected: false,})})
      .finally(() => setIsLoading(false));
    }
    else {
      setIsLoading(false);
      setAuthentication({username : "", userId : 0, connected : false});
    }
  },[])
  if(isLoading) return;
  return (
    <table className="container content table">
        <thead className="container">
            <tr>
            <th>Name</th>
            <th>Unite Price</th>
            <th>Quantity</th>
            <th>Delete</th>
            <th>Modify</th>
            </tr>
        </thead>
        <tbody>
        {
            currentPath === "/products/search"
            ? searchResult?.map((product, key) => {
                return <Product key={key} product={product} />;
              })
            : productList?.map((product, key) => {
                return <Product key={key} product={product} />;
              })
        }
        </tbody>
    </table>
  );
}