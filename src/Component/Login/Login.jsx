// import { React, useState } from 'react'
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import {  BsShieldLockFill, BsFillPersonFill} from "react-icons/bs";
// import { Link } from "react-router-dom";
// import './LoginSignUp.css'

// const Login = () => {


//     const signIn = (e) => {
//         e.preventDefault() ;
//         signInWithEmailAndPassword(email, passWord)
//             .then((userCredential) => {
//             console.log((userCredential))
//         })
//         .catch((error) => {
//             console.log(error) ;
//         });
//     };
    
//     return (
//         <div className ='container'>
//             <form onSubmit = {signIn}>
//                 <div className = 'header'>
//                     <div className = 'text'>Login</div>

//                     <div className = 'underline'> </div>
//                 </div>
                
//                 <div className = "inputs">
//                     {/* Name Login*/} 
//                     <div className = "input">
//                         <BsFillPersonFill style={{fontSize:'25', margin : 20 }}/>
//                         <input type = "text" placeholder='Name' value = {email} onChange = {(e) => setEmail(e.target.value)} />
//                     </div>
//                     {/* PassWord Login*/}
//                     <div className = "input">
//                         <BsShieldLockFill style={{fontSize:'25', margin : 20 }}/>
//                         <input type = "password" placeholder='Password' value = {passWord} onChange = {(e) => setPassword(e.target.value)} />
//                     </div>
//                 </div>
//                 <div className = "forgot-password">
//                     <input type = "checkbox"/>Show Password
//                     <Link to = {"./forgotpass"}>Forgot Password?</Link>
//                 </div>

//                 {/* Set หน้า Sign Up */}
//                 <div className = "Sign-box">
//                     <p className = 'Sign-dialog'>Don't have an account?<Link className = "text-SignUp" to ={"./singup"}>Sign up</Link></p>
//                 </div>
                
//                 <div className= "submit-container">
//                     <button className = "button-login"><span>Login</span></button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Login ;