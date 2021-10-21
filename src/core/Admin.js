import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout'
import axios from 'axios'
import {isAuth,getCookie, signout, updateUser} from '../auth/hepers'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Admin=({history})=>{
    const[values,setValues]=useState({
        role:'',
        name:'',
        email:'',
        password:'',
        buttonText:'Submit'
        
    })
    const token=getCookie('token')
    useEffect(()=>{
        loadProfile()
    },[])
    const loadProfile=()=>{
        axios({
            method:'GET',
            url:`${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers:{
                Authorization:`Bearer ${token}`
            }
            
        })
        .then(response=>{
            console.log('ADMIN PROFILE UPDATED',response)
            const{role,name,email}=response.data
            setValues({...values,role,name,email})
        })
        .catch(error=>{
            console.log('ADMIN PROFILE UPDATE ERROR',error.response.data.errors)
            if(error.response.status===401){
                signout(()=>{
                    history.push('/')
                })
            }
        })
    }
    const{role,name,email,password,buttonText}=values
    const handleChange=name=>event=>{
        //console.log(event.target.value)
        setValues({...values,[name]:event.target.value})
    }
    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,buttonText:'Submitting'})
        axios({
            method:'PUT',
            url:`${process.env.REACT_APP_API}/admin/update`,
            headers:{
                Authorization:`Bearer ${token}`
            },
            data:{name,password}
        })
        .then(response=>{
            console.log('ADMIN PROFILE UPDATE SUCCESS',response);
            updateUser(response,()=>{
                setValues({...values,buttonText:'submitted'})
                toast.success('Profile updated successfully')
            })
           
        })
        .catch(error=>{
            console.log('ADMIN PROFILE UPDATE ERROR',error.response.data.errors);
            setValues({...values,buttonText:'Submit'})
            toast.error(error.response.data.errors)
        })

    }
    const updateForm=()=>(
        <form>
             <div className="form-group">
                <label className="text-muted">Role</label>
                <input className="form-control" type="text"  defaultValue={role} disabled/>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input className="form-control" type="text" onChange={handleChange('name')} value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input className="form-control" type="email"  defaultValue={email} disabled/>
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
            <h1 className="p-5 text-center">Admin Page</h1>
            <p className="lead text-center">Profile Update Here...!</p>
            {updateForm()}
            </div>
        </Layout>
    )
}
export default Admin;