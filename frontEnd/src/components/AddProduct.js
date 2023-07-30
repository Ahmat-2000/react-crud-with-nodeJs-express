import {useLocation , useNavigate} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../App';

export default function AddProduct() {
    const location = useLocation();
    const navigate = useNavigate();
    const {setAuthentication} = useContext(authContext);
    const intialFieldValue = location?.state?.initialValues || {name :"", unite_price:"", quantity: ""};
    let isUpdate = intialFieldValue.id ? true : false;
    const handleSubmit = (data,{resetForm}) => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            if(isUpdate){
            axios
            .put(`http://localhost:3003/products/${data.id}`,data,{headers : {token : localStorage.getItem('accessToken')}})
            .then((response) => 
                {
                    console.log(response.data);
                    alert(response.data.message);
                    navigate("/products");
                })
            .catch((err) => { console.log(err.message)});
            }
            else{
                axios.post("http://localhost:3003/products",data,{headers : {token : localStorage.getItem('accessToken')}})
                .then((response) => {
                    alert(response.data.message);
                    resetForm({values: {name :"", unite_price:"", quantity: ""}});
                    console.log(response.data);
                })
                .catch((err) => { console.log(err.message)});
            }
        }
        else{
            alert("YOU ARE NOT CONNECTED");
            setAuthentication({username : "", userId : 0, connected : false});
        }
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(25).required(),
        unite_price: Yup.number().positive().min(0.01 ).required(),
        quantity: Yup.number().positive().min(1).required().integer()
    })
    return (
        <Formik initialValues={intialFieldValue} enableReinitialize={true} onSubmit={handleSubmit} validationSchema={validationSchema}>
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