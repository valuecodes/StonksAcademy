import React,{useEffect} from 'react'
import './Page.css'
import { Link } from 'react-router-dom'
import {ReactComponent as Logo} from '../../images/LogoWhite.svg'
import { useSelector, useDispatch} from 'react-redux'
import { signin, logout, userAuth } from '../../actions/userActions';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { MobileMenu, NavigationBar } from './Navigation'

const useStyles = makeStyles((theme) => ({
    AppBar:{
        margin:0,
        padding:0,
        backgroundColor:'var(--secondary-color)'
    }
  }));

export default function Header() {

    const classes = useStyles();
    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    useEffect(()=>{
        dispatch(userAuth())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const loginHandler = () =>{
        dispatch(signin())
    }

    const logoutHandler = () =>{
        dispatch(logout())
    }

    const menuItems=[
        {linkTo:'/',text:'Home'},
        {linkTo:'/academy',text:'Academy'},
        // {linkTo:'/academy',text:'Playground'},
        {linkTo:'/profile',text:'Profile',loginRequired:true},
        {linkTo:'/disclaimer',text:'Disclaimer',mobileOnly:'true'},
        {linkTo:'/privacy-policy',text:'Privacy Policy',mobileOnly:'true'},
        {linkTo:'/terms-of-service',text:'Terms of Service',mobileOnly:'true'},
        {linkTo:'/contact',text:'Contact',mobileOnly:'true'},
    ]

    return (
        <header className='header'>
            <AppBar className={classes.AppBar} position="static">
                <div className='container'>
                    <Link className='mainLogo' to='/'><Logo/></Link>
                    <NavigationBar 
                        menuItems={menuItems}
                        userInfo={userInfo} 
                        login={loginHandler} 
                        logout={logoutHandler}
                    />                
                    <MobileMenu 
                        menuItems={menuItems}
                        userInfo={userInfo} 
                        login={loginHandler} 
                        logout={logoutHandler}
                    />
                </div>
            </AppBar>
        </header>
    )
}