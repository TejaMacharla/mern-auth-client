import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Activate from './auth/Activate'
import Private from './core/Private'
import PrivateRoute from './auth/PrivateRoute';
import Admin from './core/Admin'
import AdminRoute from './auth/AdminRoute';
import Forgot from './auth/Forgot'
import Reset from './auth/Reset'

const Routes=()=>{
    return(
        <BrowserRouter>
          <Switch>
              <Route exact path="/" component={App}/>
              <Route  path="/signup" component={Signup}/>
              <Route  path="/signin" component={Signin}/>
              <Route  path="/auth/activate/:token" component={Activate}/>
              <PrivateRoute path="/private" component={Private}/>
              <AdminRoute  path="/admin" component={Admin}/>
              <Route  path="/auth/password/forgot" component={Forgot}/>
              <Route  path="/auth/password/reset/:token" component={Reset}/>

          </Switch>
        </BrowserRouter>
    )
}
export default Routes;