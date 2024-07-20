import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from "../../Context/StoreContext"
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    const {url ,setToken} = useContext(StoreContext)

    const[curr,setCurr]=useState("Login")
    const [data,setData] = useState({
        name : "",
        email : "",
        password : ""
    })

    const onChangeHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event)=>{
        event.preventDefault()
        let newUrl = url
        if (curr==="Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data)
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }
    }



  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container' >
            <div className="login-popup-title">
                <h2>{curr}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {curr==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />
                }
                <input onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder='Email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="Password" placeholder='Password' required />
            </div>
            <button type='submit'>{curr==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required  />
                <p>By Continuing , i agree to the terms of use & privacy policy</p>
            </div>
            {curr==="Login"?<p>Create a new Account? <span onClick={()=>setCurr("Sign Up")}>Click hear</span></p>
            :<p>Already have a  Account? <span onClick={()=>setCurr("Login")}>Login hear</span></p>
        }
            </form>

    </div>
  )
}

export default LoginPopup