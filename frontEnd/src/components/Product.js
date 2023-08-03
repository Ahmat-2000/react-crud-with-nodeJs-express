import React from "react";
import { useContext } from "react";
import {productContext} from '../App';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
export default function Product({product}) {
    const navigate = useNavigate();
    const {setProductList} = useContext(productContext);
    const initialValues = {
        id: product.id,
        name: product.name,
        unite_price: product.unite_price,
        quantity: product.quantity,
      };
    const modifyProduct = (event) =>{
        event.stopPropagation();
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken) navigate("/addProduct",{state : {initialValues}});
        else window.alert("YOU ARE NOT CONNECTED");
    }
    const deleteProduct = (event,id) =>{
        event.stopPropagation();
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken){
            let confirmation = window.confirm("DO YOU WANT TO DELETE THIS PRODUCT ?")
            if(confirmation){
                axios.delete(`http://localhost:3003/products/${id}`,{headers :{token : accessToken}})
                .then((response) => {
                    if(!response.data.error)
                        setProductList((prevProductList) => prevProductList.filter((value) => value.id !== id));
                })
                .catch((err) => { console.log(err.message)});
            }
        }
        else{
            window.alert("YOU ARE NOT CONNECTED");
        }
    }
    return (
        <tr className="container">
            <td >{product?.name}</td>
            <td >{product?.unite_price}</td>
            <td >{product?.quantity}</td>
            <td>
                <button className="btn" onClick={(e) =>{deleteProduct(e,product.id)}}><i className="fa fa-trash"></i></button>
            </td>
            <td>
                <button className="btn" onClick={modifyProduct}><i className="fa fa-pencil"></i></button>
            </td>

        </tr>
    );
}