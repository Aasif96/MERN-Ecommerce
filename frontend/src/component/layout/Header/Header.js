import React from 'react'
import {ReactNavbar} from "overlay-navbar"
import logo from '../../../images/ecommerce.gif'
import {MdSearch } from "react-icons/md";
import {MdAccountCircle } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";

const options={
        logo:logo,
        burgerColor:"crimson",
        navColor1:"#ffffff",
        burgerColorHover:"#900",
        logoWidth:"50%",
        logoHoverColor:"#ffffff",
        link1Size:"1.2rem",
        link1Color:"#121212",
        link1Padding:"1vmax",
        link1ColorHover:"crimson",
        nav2justifyContent:"flex-end",
        link1Margin:"1vmax",
        link2Margin:"0",
        link3Margin:"0",
        link4Margin:"1vmax",
        nav3justifyContent:"flex-start",
        link1Text:"Home",
        link1Family:"sans-serif",
        link2Text:"Products",
        link3Text:"About",
        link4Text:"Contact",
        link1Url: "/",
        link2Url: "/products",
        link3Url: "/about",
        link4Url: "/contact",
        nav4justifyContent:"flex-start",
        profileIconUrl: "/login",
        profileIcon:true,
        profileIconColor: "rgba(35, 35, 35,0.8)",
        cartIconColor: "rgba(35, 35, 35,0.8)",
        profileIconColorHover: "#eb4034",
        ProfileIconElement: MdAccountCircle, 
        searchIcon:true,
        searchIconColor: "rgba(35, 35, 35,0.8)",
        SearchIconElement:MdSearch,
        searchIconColorHover: "#eb4034",
        cartIcon:true,
        CartIconElement:MdAddShoppingCart,
        cartIconColorHover: "#eb4034",
        cartIconMargin: "1vmax",
}

const Header = () => {
  return (
    <ReactNavbar {...options}/>
  )
}

export default Header;