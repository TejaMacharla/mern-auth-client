import React,{useState} from 'react';
import {Link,Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import{authenticate,isAuth} from './hepers'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Google from './Google'
import Facebook from './Facebook'
const Signin=({history})=>{
    const[values,setValues]=useState({
        email:'tejamacharla2808@gmail.com',
        password:'123456',
        buttonText:'Submit'
    })
    const{email,password,buttonText}=values
    const handleChange=name=>event=>{
        //console.log(event.target.value)
        setValues({...values,[name]:event.target.value})
    }
    const informParent=response=>{
        authenticate(response,()=>{
       isAuth() && isAuth().role==="admin" ? history.push('/admin'):history.push('/private')
        })
    }
    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,buttonText:'Submitting'})
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/signin`,
            data:{email,password}
        })
        .then(response=>{
            console.log('SIGNIN SUCCESS',response);
            //save the response(user,token) in the local storage/cookie
            authenticate(response,()=>{
                setValues({...values,email:'',password:'',buttonText:'submitted'})
           // toast.success(`Hey ${response.data.user.name}, Welcome back!`)
           isAuth() && isAuth().role==="admin" ? history.push('/admin'):history.push('/private')
            })
            
        })
        .catch(error=>{
            console.log('SIGNUP ERROR',error.response.data);
            setValues({...values,buttonText:'Submit'})
            toast.error(error.response.data.errors)
        })

    }
    const signinForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input className="form-control" type="email" onChange={handleChange('email')} value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input className="form-control" type="password" onChange={handleChange('password')} value={password}/>
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
            {isAuth()?<Redirect to="/" />:null}
            <h1 className="p-5 text-center">Signin Here...!</h1>
            <Google informParent={informParent}/>
            <Facebook informParent={informParent}/>
            {signinForm()}
            <br/>
            <Link to='/auth/password/forgot' className="btn btn-sm btn-outline-danger">Forgot Password</Link>
            </div>
        </Layout>
    )
}
export default Signin;