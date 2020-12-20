import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import GoogleButton from 'react-google-button'

const useStyles = makeStyles((theme) => ({
    menuIcon:{
        fontSize:35,
        padding:0,
        color:'white'
    },
    menu:{
        marginTop:'3.7rem',
        marginLeft:'2.2rem',
    },
    menuItem:{
        width:170,
        maxWidth:170,
        color:'var(--text-dark)'
    }
}));

export function MobileMenu({userInfo,login,logout,menuItems}) {
    
    const classes = useStyles();    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
        <div className='mobileNav'>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          className={classes.menuButton}
          onClick={handleClick}
        >
          <MenuIcon className={classes.menuIcon} size={'large'} />
        </IconButton>
        <Menu
          id="long-menu"
          className={classes.menu}
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
        {menuItems.map((item,index) =>
            validateItem(item,userInfo)&&
                <Link key={index} to={item.linkTo}>
                    <MenuItem className={classes.menuItem} key={index} selected={item.text === 'Pyxis'} onClick={handleClose}>
                    {item.text}
                    </MenuItem>               
                </Link>    
        )}
            <MenuItem>
                {userInfo?
                    <Button onClick={logout} variant="contained">Log out</Button>:
                    <GoogleButton className={classes.menuItem} label='Sign In' type="light" onClick={login}/>
                }
            </MenuItem>
        </Menu>
      </div>
    )
}

export function NavigationBar({userInfo,login,logout,menuItems}){
    return(
        <nav className='mainNav'>
            <ul >
                {menuItems.map((item,index) =>
                    validateItem(item,userInfo)&&
                        <li key={index}><Link to={item.linkTo}>{item.text}</Link></li>
                )}

                {userInfo?
                    <li className='logoutButton'>
                        <Button onClick={logout}  variant="contained">Log out</Button>
                    </li>:
                    <li className='googleLogin'><GoogleButton type="light" onClick={login}/></li>
                }
            </ul>  
        </nav>
    )
}

const validateItem=(item,userInfo)=>{
    if(item.loginRequired&&!userInfo){
        return false
    }
    return true
}