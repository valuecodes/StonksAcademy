import React from 'react'
import './Section.css'
import SectionNav from '../Section/SectionNav'
import AppBar from '@material-ui/core/AppBar';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appBar:{
        backgroundColor: "white",
        color:'var(--secondary-color)',
        border: `2px solid ${theme.palette.divider}`,
        borderRadius:'0.5rem',
        flexWrap:'wrap'
    },
  }));

export default function SectionHeader({header,sectionNav,setSectionNav}) {
    const classes = useStyles();
    return (
        <div className='sectionHeader'>
            <Toolbar className={classes.appBar}  >
                <Typography className={classes.title} variant="h6" noWrap>
                    <h2>{header}</h2>
                </Typography>
                {sectionNav&&
                    <SectionNav sectionNav={sectionNav} setSectionNav={setSectionNav}/>
                }
            </Toolbar>
        </div>
    )
}
