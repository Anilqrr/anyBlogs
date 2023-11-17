import React,{useContext,useEffect} from 'react'
import { Link} from "react-router-dom";
import CreateContext from "../context/userBlog/createcontext";
import UseBlogs from './UseBlogs';

export default function UserBlogs() {
  
  const Blogs = useContext(CreateContext)
  const {userblogs,FetchUserBlogs} = Blogs
  useEffect(()=>{
   if(localStorage.getItem('token')){
     FetchUserBlogs()
   }
   // eslint-disable-next-line 
  },[])  
  
  return (
    <main>
      <div className="blogs-h">
        {localStorage.getItem('token') && <div className="container">
          <div className="addblog" >
            <Link to='/addblog'><button>Add New Blog</button></Link>
          </div>
        <div className="blogs">
              {userblogs.map((b)=>{
              return <UseBlogs key={b._id} p_image={b.userImage} 
              user={b.username} time={b.date} title={b.title} 
              desc={b.description} success={true} image={b.image.data}/>
             })} 
            </div>
          </div>
  }
  {!localStorage.getItem('token') && <div className="loginuser" >
            <Link to='/login'><button>Login! See Your Created Blogs View</button></Link>
    </div>}
    </div>
    </main>
  )
}
