import React,{useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import CreateContext from '../context/userBlog/createcontext';


export default function Signup() {
  const navigate = useNavigate()
  let gender = ""
  const UserValue = useContext(CreateContext)
  const {username,email,birthadate,password} = UserValue.data 
  
  const handleSubmit = async (e)=>{
    // get gender value
    let g = document.getElementsByName('gender')
    if(g[0].checked===true){
      gender = "m"   
      console.log(gender)
    }
    else if(g[1].checked===true)
    {
      gender = "f"
      console.log(gender)
    }
        e.preventDefault();
        // signup http require send
        const response = await fetch("http://localhost:5000/user/signup",{
          method: "POST",
          headers:{
            'Content-Type':'application/json'
          },
          // get all data by useState Through
          body: JSON.stringify({username,email,birthadate,gender,password})
        })
        const json  = await response.json()
        // check error 
        if(json.success){
          console.log(json)
          g.checked = false
          UserValue.setData({
            username:"",
            email:"",
            gender:"",
            birthadate:"",
            password:"",
          })
          localStorage.setItem("token",json.token)
          UserValue.ShowAlert("SuccessFully Signup! You Can Login Now","rgb(111, 243, 129)")
          navigate('/login')
          document.getElementById("submit").disabled=true;
        }
        else{
           UserValue.ShowAlert("Invalid Credentials","rgb(243, 111, 111)")
        }
        
        
      }
      return (
        <>
    <div className="info">
      <h2>Signup</h2>
    </div>
    <div className="signup">
      <form action="" method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
        <div className="form-control">
          <input type="text" className='text' value={UserValue.data.username} onChange={UserValue.handleOnChange} placeholder='Username...' minLength={3} name="username" id="user" required/>
         </div>
         <div className="form-control">
          <input type="email" className='text' value={UserValue.data.email} onChange={UserValue.handleOnChange} placeholder='Email...' name="email" id="email" required/>
         </div>
         <div className="form-control">
          <label htmlFor="">M</label><input type="radio" className='gender' onChange={UserValue.handleOnChange} name="gender" id="genderm" required/>
          <label htmlFor="">F</label><input type="radio" className='gender'onChange={UserValue.handleOnChange}  name="gender" id="genderf" required/>
         </div>
         <div className="form-control">
          <input type="date" name='birthadate' className='text' placeholder='dd-mm-yyyy' value={UserValue.data.birthadate} onChange={UserValue.handleOnChange}required/>
         </div>
         <div className="form-control">
          <input type="password" className='text'value={UserValue.data.password} placeholder='password...' onChange={UserValue.handleOnChange} name="password" minLength={6} maxLength={8} id="password" required/>
         </div>
         <div className="form-control-btn">
          <button type='submit' id="submit">Signup</button>
         </div>
      </form>
    
    </div>
    </>
  )
}
