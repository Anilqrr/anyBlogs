import React,{useContext,useEffect} from "react";
// import { Link } from "react-router-dom";
// import Blog from '../image/myimge.jpg'
import CreateContext from "../context/userBlog/createcontext";
import UseBlogs from './UseBlogs';
export default function Blogs() {
  const Blogs = useContext(CreateContext)
  const {blogs,FetchAllBlogs} = Blogs
  useEffect(()=>{
    FetchAllBlogs()
    // eslint-disable-next-line
  },[])
  return (
    <>
      <main>
        <div className="container">
          <h1>Latest Blogs</h1>
          <div className="blogs">
          {blogs.map((b)=>{
              return <UseBlogs key={b._id} p_image={b.userImage} 
              user={b.username} time={b.date} title={b.title} 
              desc={b.description} image={b.image.data}/>
             })} 
          </div>
        </div>
      </main>
    </>
  );
}
