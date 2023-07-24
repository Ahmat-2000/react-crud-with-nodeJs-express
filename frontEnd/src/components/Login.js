/* import {useNavigate,useLocation} from 'react-router-dom';
import {useContext} from 'react';
import {productContext} from '../App' */
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
export default function Login() {
    const intialFieldValue = {
        username : "",
        password : ""
    };
    const handleSubmit = (data) => {
        axios.post("http://localhost:3003/users/login",data).then((response) => {
            //console.log(response.data);
            if(response.data.error) alert(response.data.error);
            else sessionStorage.setItem("AccesToken",response.data);
        }).catch((error) => console.log(error))
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(25).required().matches(/^[a-zA-Z0-9]+$/,'Username must contain only letters and numbers'),
        password: Yup.string().min(4).max(12).required(),
    })
    return (
        <Formik initialValues={intialFieldValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
           <Form className="container content form">
                <label htmlFor="usernameInput">UserName<span className='start'> * </span></label>
                <Field name="username" id='usernameInput' placeholder="Enter your username"/>
                <ErrorMessage className='error' name="username" component="div" />
                <label htmlFor="passwordInput">Password <span className='start'> * </span></label>
                <Field type='password' name="password" id='passwordInput' placeholder="Enter your password"/>
                <ErrorMessage className='error' name="password" component="div" />
                <button type="submit">Log in</button>
            </Form>
        </Formik>
    );
}