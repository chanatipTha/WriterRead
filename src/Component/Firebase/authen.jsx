import auth from "./Firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword } from "firebase/auth";
import axios from 'axios';
import app from "./Firebase";



const authen = getAuth(app) ;

export const signUpAccount = (account, success, unsuccess) => {
    createUserWithEmailAndPassword(authen, account.email, account.password)
    .then((userCredential) => {
        const user = userCredential.user
        const useraccount = {
            uid: user.uid,
            userName: account.userName,
            email: user.email
        }
        axios.post(`${process.env.REACT_APP_API}/sign-up`, useraccount)
        .then((response) => {
            success(response.data.message)
        })
        .catch(() => {
            unsuccess("Con't create your account")
        })
    })
    .catch((error) => {
        const errorCode = error.code
        if(errorCode === 'auth/invalid-email') 
        {
            unsuccess('Invalid email')
        }
        else if(errorCode === 'auth/email-already-in-use')
        {
            unsuccess('Email has already been used')
        }
    })
}

export const signInAccount = (account, success, unsuccess) => {
    signInWithEmailAndPassword(auth, account.email(), account.password)
    .then((userCredential) => {
        axios.post(`${process.env.REACT_APP_API}/sign-in`, {email: userCredential.user.email})
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            success('Login Success')
        })
        .catch((error) => {
            unsuccess('Login fail')
        })
    })
    .catch((error) => {
        unsuccess('Name or password incorect')
    })
}

export const LogOut = (success, unsuccess) => {
    signOut(authen)
    .then(() => {
        localStorage.removeItem('token')
        success('Log out Success')
    })
    .catch((error) => {
        unsuccess('Log out Unsucess')
    })
}

export const resetPassword = (email, success, unsuccess) => {
    sendPasswordResetEmail(authen, email)
    .then(() => {
        success(`Pless Cheack Your ${email}`)
    })
    .catch(() => {
        unsuccess('Resetpassword fail')
    })
}

export const updateUsernameAndPasswordAccount = (account, success, unsuccess) => {
    const token = localStorage.getItem('token')
    axios.post(`${process.env.REACT_APP_API}/sign-in-authentication`, {}, {headers: {
        'Authorization': `Bearer ${token}`
    }})
    .then((response) => {
        const email = response.data.decoded.email
        signInWithEmailAndPassword(authen, email, account.password)
        .then((userCredential) => {
            updatePassword(userCredential.user, account.newPassword)
            .then(() => {
                axios.patch(`${process.env.REACT_APP_API}/edit-account-username`, {email:userCredential.user.email, username:account.username})
                .then((response) => {
                    if(response.data.status){
                        success('Edit Profile Error')
                    }
                })
                .catch((error) => {
                    unsuccess('Edit Profile Error')
                })
            })
            .catch((error) => {
                unsuccess('Edit Profile Error')
            })
        })
        .catch((error) => {
            unsuccess('Incorect Old Password')
        })
    })
    .catch((error) => {
        unsuccess('Edit Profile Error')
    })
}