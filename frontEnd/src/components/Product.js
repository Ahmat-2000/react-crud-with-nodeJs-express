import { useContext } from "react";
import {productContext} from '../App';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
export default function Product({product}) {
    const navigate = useNavigate();
    const contextValues = useContext(productContext);
    const initialValues = {
        id: product.id,
        name: product.name,
        unite_price: product.unite_price,
        quantity: product.quantity,
      };
    const modifyProduct = (event) =>{
        event.stopPropagation();
        navigate("/addProduct",{state : {initialValues}});
    }
    const deleteProduct = (event,id) =>{
        event.stopPropagation();
        axios.delete(`http://localhost:3003/products/${id}`)
        .then((response) => {
           
            contextValues.setProductList((prevProductList) => prevProductList.filter((value) => value.id !== id));
        })
        .catch((err) => { console.log(err.message)})
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