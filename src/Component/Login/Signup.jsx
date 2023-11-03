import  {React, useState} from 'react'
import { BsFillPersonFill, BsEnvelopeAtFill, BsShieldLockFill, BsCalendarDateFill, BsShieldFillCheck} from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import "./LoginSignUp.css"
import { signUpAccount } from '../Firebase/authen';
import axios from 'axios';

const Signup = () => {

    const[passWordRequir, setRequirPass] = useState({minimum: false, alphaLower: false, alphaUpper: false, number: false, special: false})
    const[account, setAccount] = useState({userName: "", email: "", date: "", passWord: "", confirmPass: ""})

    const atLeastOneLowercase = /[a-z]/g
    const atLeastOneUppercase = /[A-Z]/g
    const atLeastOneNumer = /[0-9]/g
    const sixCharsOrMore = /.{6,}/g
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/


    const setUserName = (userName) => {
        setAccount({...account, userName:userName.target.value})
    }

    const setEmail = (email) => {
        setAccount({...account, email:email.target.value})
    }

    const setDate = (date) => {
        setAccount({...account, date:date.target.value})
    }

    const setPassword = (passwords) => {
        const passWord = passwords.target.value
        setAccount({...account, passWord: passWord})
        setRequirPass({minimumLenght: passWord.match(sixCharsOrMore),
            alphaLower: passWord.match(atLeastOneLowercase),
            alphaUpper: passWord.match(atLeastOneUppercase),
            number: passWord.match(atLeastOneNumer),
        })
        
    }

    const setConfrimPassword = (confirmPass) => {
        setAccount({...account, confirmPass: confirmPass.target.value})
    }   

    const Success = (message) => {
        Swal.fire({
            title: 'Succese',
            text: message,
            icon: 'success',
            confirmButtonText: 'Continuous',
            confirmButtonColor: '#ADFF2'
          })
          setAccount({userName: "", eamil: "", passWord: "", confirmPass: ""})
          setRequirPass({minimumLenght: false, alphaLower: false, alphaUpper: false, nember: false, special: false})
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
    const signUp = (e) => {
        e.preventDefault() ;

        if(account.userName.length <= 0 || account.email.length <= 0 || account.passWord.length <= 0 || account.confirmPass.length <= 0) 
        {
            Swal.fire ({
                title: 'Plese',
                text: (account.userName.length <= 0) ? 'Enter Your UserName' : (account.email.length <= 0) ? 'Enter Email' : (account.passWord.length <= 0) ? 'Enter Password' : (account.confirmPass.length <= 0) && 'Confirm Password',
                icon: 'warning',
                confirmButtonText: 'Agree'
            })
        }
        else if(!account.email.match(emailRegex)) 
        {
            Swal.fire ({
                title: 'Something went wrong',
                text: 'Plese Enter gmail or hotmail',
                icon: 'warning',
                confirmButtomText: 'Agree'
            })
        }
        else if(!passWordRequir.minimumLenght || !passWordRequir.alphaLower || !passWordRequir.alphaUpper || !passWordRequir.number) 
        {
            Swal.fire ({
                title: 'Warning',
                text: (!passWordRequir.minimumLenght) ? 'รหัสผ่านต้องมีอักขระอย่างน้อย 8 ตัว' :
                (!passWordRequir.alphaLower) ? 'รหัสผ่านต้องมีอักขระพิมพ์เล็กอย่างน้อย 1 ตัว' :
                (!passWordRequir.alphaUpper) ? 'รหัสผ่านต้องมีอักขระพิมพ์ใหญ่อย่างน้อย 1 ตัว' :
                (!passWordRequir.number) && 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว' ,
                icon: 'warning',
                confirmButtonText: 'Agree'
            })
        }
        else if(account.passWord !== account.confirmPass) {
            Swal.fire ({
                title: 'Password incorrect',
                text: 'Your Password and Confirm password mismatch',
                icon: 'warning', 
                confirmButtonText: 'Agree' 
            })
        }
        else {
            axios.post(`${process.env.REACT_APP_API}/sign-up-validation`, account)
            .then((response) => {
                if(response.data.message === "Create Account Success") 
                {
                    signUpAccount(account, Success, Unsuccess)
                }
            })
            .catch((error) => {
                if(error.response === undefined)
                {
                 Swal.fire ({
                        title: 'Error',
                        text: 'Create Account Unsuccess',
                        icon: 'error',
                        cconfirmButtonText: 'Agree'
                    })
                }
                else 
                {
                    Swal.fire( {
                        title: 'Error',
                        text: error.response.data.message,
                        icon: 'warning',
                        confirmButtonText: 'Agree'
                    })
                }
            })
        }
    }

    return (
        <div className ='container'> 
            <form onSubmit = {signUp}>
                <div className = 'header'>
                    <div className = 'text'>Sign Up</div>

                    <div className = 'underline-Sign-Up'> </div>
                </div>
                
                <div className = "inputs">
                    {/* Name Sign Up*/} 
                    <div className = "input">
                        <BsFillPersonFill style={{fontSize:'25', margin : 20 }}/>
                        <input type = "text" placeholder='Name' value = {account.userName} onChange = {setUserName}/>
                    </div>

                    {/* Sign Up */}

                    <div className= "input">
                        <BsEnvelopeAtFill style={{fontSize:'25', margin : 20 }}/>
                        <input type = "email" placeholder='Email' value = {account.email}  onChange = {setEmail} />
                    </div>

                    <div className= "input">
                        <BsCalendarDateFill style={{fontSize:'25', margin : 20 }}/>
                        <input type = "date" value = {account.date} onChange = {setDate}/>
                    </div>

                    {/* PassWord Sign up */}
                    <div className = "input">
                        <BsShieldLockFill style={{fontSize:'25', margin : 20 }}/>
                        <input type = "password" placeholder='Password' value = {account.passWord} onChange = {setPassword} />
                    </div>

                    <div className = "input">
                        <BsShieldFillCheck style={{fontSize:'25', margin : 20 }}/>
                        <input type = "password" placeholder='Confirme Password' value = {account.confirmPass} onChange = {setConfrimPassword} />
                    </div>
                </div>
                <div className = "Login-box">
                    <p className = 'Login-dialog'>Already have an account?<Link className = "text-login" to ={"./login"}>Login</Link></p>
                </div> 

                {/* Set หน้า Sign Up */}

                {/* <div className = "Login-box">
                    <p className = 'Login-dialog'>Already have an account?<button className = {action === "Login" ? "Login" : "Sign Up"} onClick = {() => {setAction("Sign Up")}}>Login</button></p>
                </div> */}
                
                <div className= "submit-container">
                    <button className = "button"><span>Continue </span></button>
                </div>
             </form>
        </div>
    )
}

export default Signup ;