import React from "react";
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { authContext } from '../App';
import { useNavigate } from 'react-router-dom';
export default function Sinup() {
    const {authentication,setAuthentication} = useContext(authContext);
    const navigate = useNavigate();
    const intialFieldValue = {
        username : "",
        password : "",
        confirmPassword : ""
    };
    useEffect(()=>{
        if(authentication.connected) navigate("/");
        console.log("sinUp")
    })
    const handleSubmit = (data) => {
      /*  axios.post("http://localhost:3003/users/sinUp",data).then((response) => {
            console.log(response.data);
       }).catch((error) => console.log(error)) */
       axios.post("http://localhost:3003/users/sinUp",data).then((response) => {
            //console.log(response.data);
            if(response.data.error) 
                alert(response.data.error);
            else {
                localStorage.setItem("accessToken",response.data.token);
                setAuthentication({
                    username : response.data.username, 
                    userId : response.data.userId, 
                    connected : true
                });
                navigate('/');
            }
        }).catch((error) => window.alert('Sever is not working, sorry come later'));
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(25).required().matches(/^[a-zA-Z0-9]+$/,'Username must contain only letters and numbers'),
        password: Yup.string().min(4).max(12).required(),
        confirmPassword: Yup.string().min(4).max(12).required().oneOf([Yup.ref('password')],"Password Fields must match")
    });
    return (
        <Formik initialValues={intialFieldValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <Form className="container content form">
                <label htmlFor="usernameInput">UserName<span className='start'> * </span></label>
                <Field name="username" id='usernameInput' placeholder="Enter your username"/>
                <ErrorMessage className='error' name="username" component="div" />
                <label htmlFor="passwordInput">Password <span className='start'> * </span></label>
                <Field type='password' name="password" id='passwordInput' placeholder="Enter your password"/>
                <ErrorMessage className='error' name="password" component="div" />
                <label htmlFor="confirmPasswordIput">Confirm Password<span className='start'> * </span> </label>
                <Field type='password' name="confirmPassword" id='confirmPasswordIput' placeholder="Confirm your password"/>
                <ErrorMessage className='error' name="confirmPassword" component="div" />
                <button type="submit">Sin Up</button>
            </Form>
        </Formik>
    );
}