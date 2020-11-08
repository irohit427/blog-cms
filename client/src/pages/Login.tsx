import React, { useState } from 'react'
import avatar from '../assets/images/user.svg'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../assets/styles/Login.scss';
import { Image } from 'antd';
import { useHistory } from 'react-router-dom';
import { Context } from '../context';
import axiosInstance from '../utils/api';

export default function Login() {
  const { dispatch } = React.useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const isAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") != null && localStorage.getItem("isAuthenticated")
  }
  const loginHandler = (e: any) => {
    e.preventDefault();
    console.log(username, password)
    axiosInstance.post('/api/admin/auth/login', {
      username, password
    }).then((res: any) => {
      console.log('Response:', res)
      if (res.data && res.data.success && !!res.data.token) {
        dispatch({
          type: 'LOGIN',
          payload: res.data
        })
        history.push('/dashboard');
      }
    }).catch(err => console.log(err));
  }
  if (!isAuthenticated()) {
    return (
      <div className="container">
        <div className="login-section">
          <div className="left-section">
            <Image src={window.location.origin + '/assets/images/login.svg'} width="240" />
          </div>    
          <div className="right-section">
            <img src={avatar} alt="user-avatar" />
            <form noValidate autoComplete="off">
              <div>
                <TextField 
                  required label="Username" 
                  variant="outlined" 
                  onChange={e => setUsername(e.target.value)}
                  style={{width: 220}}
                />
                <br />
                <TextField 
                  required type="password" 
                  label="Password" 
                  variant="outlined" 
                  onChange={e => setPassword(e.target.value)}
                  style={{width: 220}}
                  />  
              </div>
              <Button 
                variant="contained" 
                color="primary"
                onClick={loginHandler}
                style={{width: 220}}
              >Login</Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  else {
    history.push('/dashboard');
  }
  return (
    <div></div>
  )
}
