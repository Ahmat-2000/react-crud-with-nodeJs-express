import { useContext } from "react";
import Product from "./Product";
import {productContext} from '../App'
import {useLocation} from 'react-router-dom';

export default function Products({searchResult}) {
    const contextValues = useContext(productContext);
    const productsList = contextValues.productList || [];
    const location = useLocation();
    const currentPath = location.pathname;
   // console.log(currentPath);
    return (
        <table className="container content">
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
                : productsList.map((product, key) => {
                    return <Product key={key} product={product} />;
                  })
            }
            </tbody>
        </table>
    );
}