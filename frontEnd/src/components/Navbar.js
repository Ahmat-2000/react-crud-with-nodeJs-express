import React from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { authContext } from '../App';
export default function Navbar()
{
    const authContextConsumer = useContext(authContext);
    const setSearchResult = authContextConsumer.setSearchResult;
    const auth = authContextConsumer.authentication;
    const setAuth = authContextConsumer.setAuthentication;
    const navigate = useNavigate();
    const [search,setSearch] = useState('');
    const inputOnChange = (event) =>{
        setSearch(event.target.value);
    }
    const onClickHandler = async (event) => {
        event.preventDefault();
        if (search.trim() === '') {
            // If the search input is empty, don't make the API call
            return;
        }
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            try {
                const response = await axios.get(`http://localhost:3003/products/search/${search}`,{headers : {token : localStorage.getItem('accessToken')}});
                if(response.data.error) {
                    window.alert(response.data.error);
                } 
                setSearchResult(response.data);
                setSearch('');
                navigate("/products/search")
              } catch (err) {
              } finally {
                
              }
        }
        else{
            alert("YOU ARE NOT CONNECTED");
        }
        
    };
    const logginOut = () => {
        localStorage.removeItem('accessToken');
        setAuth({
            sername : "", userId : 0, connected : false
          });
        navigate("/")
    }
    return(
    <nav className="nav-bar">
        <ul className='nav-list'>
            <li className='nav-li-items'><Link to="/"> Home </Link></li>
            {
                !auth.connected ?
                (<>
                    <li className='nav-li-items'><Link to="/sinUp"> Sin Up </Link></li>
                    <li className='nav-li-items'><Link to="/login"> Login </Link></li>
                </>)
                : 
                (<>
                    <li className='nav-li-items'><Link to="/products"> Products </Link></li>
                    <li className='nav-li-items'><Link to="/addProduct"> Add product </Link></li>
                    <li className='nav-li-items'>
                        <div>
                            <strong>Usernme : {auth.username}</strong>
                            <button onClick={logginOut}>Log out</button>
                        </div>
                    </li>
                </>)
            }
        </ul>
        {
        auth.connected &&
        (<form className='search' onSubmit={onClickHandler}>
            <label>
                Search  : <input value={search} onChange={inputOnChange} type="text" required/>
            </label>
            <button type='sumit'>Find product</button>
        </form>)
        }
    </nav>
    );
}