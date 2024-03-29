import React, { useState } from 'react'
import './Header.css'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import {  useLazyLogoutUserQuery,useLazyLoadUserQuery } from '../../../services/User';
import { UserApi } from '../../../services/User';
import store  from '../../../Redux/store';
import { useDispatch } from 'react-redux';

const UserOptions = ({user}) => {
    const [open,setOpen] = useState(false);
    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch();

    const [loadUser,data] = useLazyLoadUserQuery();
    const [ trigger, result ] = useLazyLogoutUserQuery();

    const options = [
      {icon: <ListAltIcon/>, name:"Orders", func:orders},
      {icon: <PersonIcon/>, name:"Profile", func:account},
      {icon: <ExitToAppIcon/>, name:"Logout", func:logoutUser},
    ]

    if(user.role === 'admin'){
      options.unshift({icon: <DashboardIcon/>, name:"Dashboard", func:dashboard},)
    }

    function dashboard(){
      history.push('/dashboard');
    }

    function orders(){
      history.push('/orders');
    }

    function account(){
      history.push('/account');
    }

    async function logoutUser(){
      // dispatch(logoutUser.util.resetApiState());
      const {isSuccess:logoutSuccess} = await trigger();
      if(logoutSuccess){
        loadUser();
        dispatch(UserApi.util.resetApiState())
        alert.success('Logout Successfully!')
        // history.push('/login')
      }
    }

  return (
    <>
    <Backdrop open={open} style={{zIndex:"10"}}/>
    <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
    >

      {
        options.map((item,i) => (
          <SpeedDialAction key={i} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
        ))
      } 
  
    </SpeedDial>
    </>
  )
}

export default UserOptions