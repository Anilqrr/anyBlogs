import React from 'react'

export default function UpdateBlog() {
  return (
    <>
    <div className="info">
      <h3>Update Blog</h3>
    </div>
    <div className="useraddblog">
      <form className='form' action="" method='post' encType='multipart/form-data'>
        <div className="form-control">
          <input type="text" className='text' placeholder='blog title...' name="title" id="title" />
         </div>
         <div className="form-control">
          <input type="text" className='text' placeholder='blog description...' name="description" id="desc" />
         </div>
         <div className="form-control">
          <input type="file" name="image" id="image" />
         </div>
         <div className="form-control-btn-u">
          <button>Update</button>
         </div>
      </form>
    
    </div>
    </>
  )
}
