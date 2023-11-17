import React,{useContext} from 'react'
import CreateContext from '../context/userBlog/createcontext';
import '../App.css'
export default function Alert() {
  const data = useContext(CreateContext)
  const {msg,style} =  data.alert
  return (
    <div className='alert' style={{backgroundColor:style.color,transitionTimingFunction:style.trasition}}>
      {msg}
    </div>
  )
}
