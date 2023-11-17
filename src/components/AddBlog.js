import React, { useContext, useEffect } from "react";
import CreateContext from "../context/userBlog/createcontext";
export default function AddBlog() {
  const blog = useContext(CreateContext);
  const { AddBlog, setAddBlog, addblog, setImg, img } = blog;
  // const handleClick = (e)=>{
  //   e.preventDefault();

  // }

  const onChange = async (e) => {
    
    // console.log(base64);
    setAddBlog({ ...addblog, [e.target.name]: e.target.value });
  };
  // useEffect(()=>{
  //   AddBlog()
  // },[])
  return (
    <>
      <div className="info">
        <h3>Add New Blog</h3>
      </div>
      <div className="useraddblog">
        <form
          action="/"
          method="post"
          onSubmit={AddBlog}
          encType="multipart/form-data"
        >
          <div className="form-control">
            <input
              type="text"
              className="text"
              onChange={(e) => onChange(e)}
              placeholder="blog title..."
              name="title"
              id="title"
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              className="text"
              onChange={(e) => onChange(e)}
              placeholder="blog description..."
              name="description"
              id="desc"
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              accept=".png, .jpg"
              name="image"
              onChange={async(e) => {
                const image = e.target.files[0];
                const base64 = await convertToBase64(image);
                // console.log(base64)
                setImg({...img, image: base64 })
              }}
              id="image"
            />
          </div>
          <div className="form-control-btn">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      resolve(filereader.result);
    };
    filereader.onerror = (error) => {
      reject(error);
    };
  });
}
