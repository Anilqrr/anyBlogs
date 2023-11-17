import React from 'react'
import Blog from '../image/myimge.jpg'
export default function ReadMore() {
  return (
    <div className='readmore'>
      <div className="box">
        <img src={Blog} alt="test" />
        <h1>Title:Title</h1>
        <p>Description:description</p>
        <h4>AuthName:AuthName</h4>
        <h3>Time:Time</h3>
      </div>
    </div>
  )
}
