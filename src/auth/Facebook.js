import React from 'react';
import axios from 'axios'
import{authenticate,isAuth} from './hepers'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Facebook=({informParent=f=>f})=>{
    const responseFacebook=(response)=>{
        console.log(response);
        axios({
            method: 'POST',
            url:`${process.env.REACT_APP_API}/facebook-login`,
            data:{userID:response.userID,accessToken:response.accessToken}
        })
        .then(response=>{
            console.log('FACEBOOK LOGIN SUCCESS',response)
            informParent(response)
        })
        .catch(error=>{
            console.log('FACEBOOK LOGIN ERROR',error.response)
        })
    }
  
    return(
        <div className="pb-3">
            <FacebookLogin
               appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick}  className="btn btn-primary btn-large btn-block">
                    <i className="fab fa-facebook pr-2"></i>  Login with Facebook</button>
                )}
            />
        </div>
    )
}
export default Facebook;