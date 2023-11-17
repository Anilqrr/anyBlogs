import React,{useState} from 'react'
// import { Link,useNavigate } from "react-router-dom";
import CreateContext from './createcontext'
const Context=(props)=> {
  // const navigate = useNavigate()
  const [data,setData] = useState({
    username:"",
    email:"",
    gender:"",
    birthadate:"",//yy-mm-dd
    password:"",
  })
  const [alert,setAlert] = useState({
    msg:"",
    style:{
      color:"",
      trasition:""
    }
  })

  const [blogs, setBlogs] = useState([])
  const [userblogs, setUserBlogs] = useState([])
  
  const [addblog,setAddBlog] = useState({
    title:"",
    description:"",
    image:""
  })
  const [img,setImg] = useState({
    image:""
  })
  const handleOnChange = (e)=>{
    e.preventDefault();
    setData({...data,[e.target.name]:e.target.value})
  }
  const ShowAlert = (msg,color)=>{
       setAlert({
        msg:msg,
        style:{
          color:color,
          trasition:"ease-in-out"
        }
       })
       setTimeout(()=>{
        setAlert({
          msg:"",
          style:{
            color:"",
            trasition:"ease-in-out"
          }

        })
       },2000)
  }
  const FetchAllBlogs = async()=>{
    const response = await fetch("http://localhost:5000/blog/allblogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // get all data by useState Through
      // body: JSON.stringify({ title, description, image}),
    });
    const json = await response.json()
    console.log(json.title)
    setBlogs(json)
  }
  const FetchUserBlogs = async()=>{
    const response = await fetch("http://localhost:5000/blog/alluserblogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
      // get all data by useState Through
      // body: JSON.stringify({ title, description, image}),
    });
    const json = await response.json()
    console.log(json.title)
    setUserBlogs(json)
  }
  

  const AddBlog = async(e)=>{
    e.preventDefault()
    const {title,description} = addblog
    const {image} = img
    const response = await fetch("http://localhost:5000/blog/blogcreate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      // get all data by useState Through
      body: JSON.stringify({ title:title,description:description,
         image:image}),
      });
    const json = await response.json()
    console.log(json.title)
    // console.log(image)
    setAddBlog(json)
  }
  return (
    <CreateContext.Provider value={{handleOnChange,data,setData,
    alert,ShowAlert,FetchAllBlogs,blogs,
    FetchUserBlogs,userblogs,addblog,setAddBlog,setImg,img,AddBlog}}>
        {props.children}
    </CreateContext.Provider>
  )
}

export default Context;