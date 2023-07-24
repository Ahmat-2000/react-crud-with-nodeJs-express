import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
export default function Navbar({setSearchResult})
{
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
        try {
          const response = await axios.get(`http://localhost:3003/products/search/${search}`);
          //console.log(response.data);
          setSearchResult(response.data);
          
        } catch (err) {
          //console.log(err.message);
        } finally {
          setSearch('');
          navigate("/products/search")
        }
      };
    return(
        <nav className="nav-bar">
            <ul className='nav-list'>
                <li className='nav-li-items'><Link to="/"> Home </Link></li>
                <li className='nav-li-items'><Link to="/products"> Products </Link></li>
                <li className='nav-li-items'><Link to="/addProduct"> Add product </Link></li>
                <li className='nav-li-items'><Link to="/sinUp"> Sin Up </Link></li>
                <li className='nav-li-items'><Link to="/login"> Login </Link></li>
            </ul>
            <form className='search' onSubmit={onClickHandler}>
                <label>
                    Search  : <input value={search} onChange={inputOnChange} type="text" required/>
                </label>
                <button type='sumit'>Find product</button>
            </form>
        </nav>
    );
}