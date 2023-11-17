import React, { useState,useContext } from "react";
import { Link,useNavigate} from "react-router-dom";
import Blog from '../image/myimge.jpg'
import CreateContext from "../context/userBlog/createcontext";
export default function Navbar() {
  const navigate = useNavigate();
  const handleClick = ()=>{
    localStorage.removeItem('token')  
    navigate('/login')        
}
  return (
    <>
    <nav>
      <div className="logo">
        <img src={Blog} alt="test" />
      </div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/userblogs'>Blogs</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        {!localStorage.getItem('token')?<li><Link to='/login'>Login</Link></li>
        :<li onClick={handleClick}><Link>Logout</Link></li>}
      </ul>
      <div className="profile">
          <Link to='/profile'><img src={Blog} alt="test" /></Link>
        </div>
    </nav>
    <div className="search-bar">
      <input type="text" name="search" id="search" placeholder='Search Blogs....' />
      <button>Search</button>
    </div>
    </>
  )
}
