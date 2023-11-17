import React from "react";
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import UserBlogs from "./components/UserBlogs";
import AddBlog from "./components/AddBlog";
import UpdateBlog from "./components/UpdateBlog";
import About from "./components/About";
import Contact from "./components/Contact";
import ReadMore from "./components/ReadMore";
import UserProfile from "./components/UserProfile";
import Context from "./context/userBlog/context";
import Alert from "./components/Alert";
function App() {
  return (
    <>
    <Context>
     <BrowserRouter>
     <Navbar/>
     <Alert alert={alert}/>
     <Routes>
      <Route path="/" element={<Blogs/>}/>
      <Route path="/userblogs" element={<UserBlogs/>}/>
      <Route path="/addblog" element={<AddBlog/>}/>
      <Route path="/updateblog" element={<UpdateBlog/>}/>
      <Route path="/readmore" element={<ReadMore/>}/>
      <Route path="/profile" element={<UserProfile/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
     </Routes>
     <Footer/>
     </BrowserRouter>
     </Context>
    </>
  );
}

export default App;
