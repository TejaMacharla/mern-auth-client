import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Reset=({match,history}) => {//props.match from react-router-dom
    const[values,setValues]=useState({
        name:'',
        token:'',
        newPassword:'',
        buttonText:'Reset Password'
    })
    useEffect(()=>{
        let token=match.params.token
        let {name}=jwt.decode(token)
        if(token){
            setValues({...values,name,token})
        }
    },[])
    const{name,token,newPassword,buttonText}=values
    const handleChange=event=>{
        setValues({...values,newPassword:event.target.value})
    }
    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,buttonText:'Submitting'})
        console.log('send request')
        axios({
            method:'PUT',
            url:`${process.env.REACT_APP_API}/reset-password`,
            data:{newPassword,resetPasswordLink:token}
        })
        .then(response=>{
            console.log('RESET PASSWORD SUCCESS',response);
            //save the response(user,token) in the local storage/cookie
           toast.success(response.data.message)
           setValues({...values,buttonText:'Requested',})
          // history.push('/signin')
            
        })
        .catch(error=>{
            console.log('RESET PASSWORD ERROR',error.response.data);
            toast.error(error.response.data.errors)
            setValues({...values,buttonText:'Reset Password'})
           
        })

    }
    const passwordResetForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">New_Password</label>
                <input className="form-control" type="password" onChange={handleChange} value={newPassword}placeholder="Type your new password"required/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )
    return(
        <Layout>
            <div className="col-md-6 offset-md-3">
            <ToastContainer/>
            {/* {JSON.stringify({name,email,password})} */}
            <h1 className="p-5 text-center">Hey {name},Type your new password.</h1>
            {passwordResetForm()}
            </div>
        </Layout>
    )
}
export default Reset;