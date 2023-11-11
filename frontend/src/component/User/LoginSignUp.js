import React, { useEffect, useRef, useState } from 'react'
import './LoginSignUp.css';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useLoadUserQuery, useLoginUserMutation,useRegisterUserMutation } from '../../services/User';
import {useAlert} from "react-alert";

const LoginSignUp = ({history}) => {

  const {data,isSuccess:loadSuccess} = useLoadUserQuery();

    const alert = useAlert();
    const[loading,setLoading] = useState(false);
    const [loginUser,{error:loginError,isLoading,isError:isLoginError,isSuccess:isLoginSuccess}] = useLoginUserMutation({
      fixedCacheKey: 'login',
    });

    const [registerUser,{error:regError,isLoading:regLoading,isError:isRegError,isSuccess:isRegSuccess}] = useRegisterUserMutation({
      fixedCacheKey: 'register',
    });
  
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    const [user, setUser] = useState({
      name:'',
      email:'',
      password:'',
    });

    const {name, email, password} = user;

    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png");


    const loginSubmit = async (e) =>{
      e.preventDefault();
      const loginData = {loginEmail,loginPassword}
      await loginUser(loginData);
      if(isLoginSuccess){
        alert.success('Login Successfully');
      }
    }

    const registerSubmit = async (e) =>{
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("name",name);
      myForm.set("email",email);
      myForm.set("password",password);
      myForm.set("avatar",avatar);
      //console.log(Object.fromEntries(myForm))
      await registerUser(Object.fromEntries(myForm));

      if(isRegSuccess){
        alert.success('Register Successfully');
      }
    };

    const registerDataChange = (e) =>{
      if(e.target.name === 'avatar'){
        const reader = new FileReader();

        reader.onload = () =>{
          if(reader.readyState === 2){
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        }
        reader.readAsDataURL(e.target.files[0]);
      }else{
        setUser({...user,[e.target.name]: e.target.value});
      }
    }


    const switchTabs = (e,tab) =>{
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
      
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
          }
          if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
      
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
          }
    }

    useEffect(() => {
      if(isLoginError){
        alert.error(loginError.data.message);
      }
      else if(isLoginSuccess){
        history.push('/account')
      } 
      else if(isRegError){
        alert.error(regError.data.message);
      }
      else if(isRegSuccess){
        history.push('/account')
      }
      else if(loadSuccess){
        history.push('/account')
      }
      },[isLoginError,isLoginSuccess,isRegError,isRegSuccess])

  return (
    <>
    {
      isLoading ? <Loader/> : 
      <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
            <div>
                <div className="login_signUp_toggle">
                    <p onClick={(e)=>switchTabs(e,'login')}>LOGIN</p>
                    <p onClick={(e)=>switchTabs(e,'register')}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
            </div>

            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                    <MailOutlineIcon/>
                    <input 
                      type="email"
                      placeholder='Email'
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value) }
                    />
                </div>
                <div className="loginPassword">
                    <LockOpenIcon/>
                    <input 
                      type="text"
                      placeholder='Password'
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}  
                    />
                </div>
                <Link to="/password/forgot">Forgot Password ?</Link>
                <input type="submit" value="Login" className='loginBtn' />
            </form>
            <form 
            className='signUpForm' ref={registerTab}
            encType='multipart/form-data'
            onSubmit={registerSubmit}
            >
              <div className='signUpName'>
                <FaceIcon/>
                <input 
                type="text" 
                placeholder='Name'
                required
                name='name'
                value={name}
                onChange={registerDataChange}
                />
              </div>
              <div className='signUpEmail'>
                <MailOutlineIcon/>
                <input 
                      type="email"
                      placeholder='Email'
                      required
                      name='email'
                      value={email}
                      onChange={registerDataChange}
                    />
              </div>
              <div className='signUpPassword'>
                  <LockOpenIcon/>
                    <input 
                      type="text"
                      placeholder='Password'
                      required
                      name='password'
                      value={password}
                      onChange={registerDataChange}  
                    />
              </div>
              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file" 
                  name='avatar'
                  accept='image/*'
                  onChange={registerDataChange}
                />
              </div>

              <input 
            type="submit"
            value="Register"
            className='signUpBtn'
            />

            </form>

        </div>
      </div>
    </>
    }
    </>
  )
}

export default LoginSignUp