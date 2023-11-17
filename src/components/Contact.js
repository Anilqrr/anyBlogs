import React from 'react'

export default function Contact() {
  return (
    <>
    <div className="info">
      <h2>Contact</h2>
    </div>
    <div className="contact">
      <form action="" method='post' encType='multipart/form-data'>
        <div className="form-control">
          <input type="email" className='text' placeholder='email...' name="title" id="title" />
         </div>
         <div className="form-control">
            <textarea rows='7' placeholder='description...'></textarea>
         </div>
         <div className="form-control-btn">
          <button>Submit</button>
         </div>
      </form>
    
    </div>
    </>
  )
}
