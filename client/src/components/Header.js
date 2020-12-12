import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as Logo} from '../images/LogoWhite.svg'
import GoogleButton from 'react-google-button'
import { useSelector, useDispatch} from 'react-redux'
import { signin, logout, userAuth } from '../actions/userActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
    AppBar:{
        margin:0,
        padding:0,
        backgroundColor:'var(--secondary-color)'
    }
  }));

export default function Header() {
    const classes = useStyles();
    return (
        <header className='header'>
            <AppBar className={classes.AppBar} position="static">
                <div className='container'>
                    <Link className='mainLogo' to='/'><Logo/></Link>
                    <Navigation/>                
                </div>
            </AppBar>
        </header>
    )
}

function Navigation(){

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

    return(
        <nav className='mainNav'>
            <ul >
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/academy'>Academy</Link></li>
                {userInfo?
                    <>
                        <li><Link to='/profile'>{userInfo.name}</Link></li>
                        <li className='logoutButton'>
                            <Button onClick={logoutHandler}  variant="contained">Log out</Button>
                        </li>
                    </>:
                    <li className='googleLogin'><GoogleButton type="light" onClick={loginHandler}/></li>
                }
                
            </ul>  
        </nav>
    )
}

