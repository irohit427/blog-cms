import React, { useState } from 'react'
import background from '../assets/images/bg.svg'
import avatar from '../assets/images/user.svg'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../assets/styles/Login.scss';
import { Image } from 'antd';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginHandler = (e: any) => {
    e.preventDefault();
    console.log(username, password)
  }
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
