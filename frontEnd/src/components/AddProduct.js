import {useNavigate,useLocation} from 'react-router-dom';
import {useContext} from 'react';
import {productContext} from '../App'
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
export default function AddProduct({update}) {
    const navigate = useNavigate();
    const location = useLocation();
    const contextValues = useContext(productContext);
    const setProductList = contextValues.setProductList;
    const productList = contextValues.productList;
    const intialFieldValue = location?.state?.initialValues || {name :"", unite_price:"", quantity: ""};
    let isUpdate = true && intialFieldValue.id;
    
    const handleSubmit = (data) => {
        if(isUpdate){
            axios.put(`http://localhost:3003/products/${data.id}`,data)
            .then((response) => 
                {
                   
                    const updatedProductList = productList.map((value) => {
                        if (value.id === data.id) {
                          return { ...data };
                        }
                        return value;
                      });
                    setProductList(updatedProductList);
                    isUpdate =false;
                })
            .catch((err) => { console.log(err.message)})
            .finally(navigate("/products"));
        }
        else{
            axios.post("http://localhost:3003/products",data)
            .then((response) => {
                setProductList(prevProductList => [...prevProductList,data ]);
            })
            .catch((err) => { console.log(err.message)})
            .finally(navigate("/products"));
        }
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(25).required(),
        unite_price: Yup.number().positive().min(0.01 ).required(),
        quantity: Yup.number().positive().min(1).required().integer()
    })
    return (
        <Formik initialValues={intialFieldValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <Form className="container content form">
                <label htmlFor="nameInput">Name</label>
                <Field name="name" id='nameInput' placeholder="Enter a product name"/>
                <ErrorMessage className='error' name="name" component="div" />
                <label htmlFor="nameInput">Unite Price</label>
                <Field name="unite_price" id='priceInput' placeholder="Enter the unite product price"/>
                <ErrorMessage className='error' name="unite_price" component="div" />
                <label htmlFor="nameInput">Quantity </label>
                <Field name="quantity" id='quantityInput' placeholder="Enter the quantity"/>
                <ErrorMessage className='error' name="quantity" component="div" />
                <button type="submit">Add Product</button>
            </Form>
        </Formik>
    );
}