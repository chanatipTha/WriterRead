import React from 'react'
// import { useSelector } from 'react-redux'
import { BsShieldFillCheck } from "react-icons/bs";
import { resetPassword } from '../Firebase/authen';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { signInAccount } from '../Firebase/authen';
import './Forgot.css'

const ForgotPass = () => {

    // const Login = useSelector((state) => state.Login.Login)
    const[account, setAccount] = useState({email: ''})
    const navigate = useNavigate()

    // useEffect(()=>{
    //     Login && navigate('/')
    //   }, [Login])
    
    const Success = (message) => {
        Swal.fire({
            title: 'Succese',
            text: message,
            icon: 'success',
            confirmButtonText: 'Continuous',
            confirmButtonColor: '#ADFF2'
          })
          navigate() //หน้าที่จะไปเมื่อทำเสร็จแล้ว
    }

    const Unsuccess = (message) => {
        Swal.fire({
            title: "Unsuccess",
            text: message,
            icon: 'error',
            confirmButtonText: 'Continuous',
            cancelButtonColor: '#D22B2B'
        })
    }

    const setEmail = (email) => {
        setAccount({...account, email:email.target.value})
    }

    const recovePass = (event) => {
        event.preventDefault()
        resetPassword(account.email, Success, Unsuccess)
    }

    return (

            <div className = 'container2'>
                <div className = 'header2'>
                    <div className = 'text2'>Enter Your Email</div>
                    <div className = 'underline2'></div>
                </div>

                <div className = "inputs2">
                    <div className = "input">
                        <BsShieldFillCheck style={{fontSize:'25', margin : 20 }}/>
                        <input type = "email" placeholder='Email' value = {account.email} onChange = {setEmail} />
                    </div>
                </div>
                <div className = "submit-container2">
                    <div className = "submit2">Send</div>
                </div>
                <div className = "cheack-box">
                    <div className = "cheackbox"></div>
                </div>
            </div>
    )
}

export default ForgotPass ;