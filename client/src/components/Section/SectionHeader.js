import React from 'react'
import './Section.css'
import SectionNav from '../Section/SectionNav'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { camelCaseToString } from '../../utils/utils';

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
    title:{
        fontSize:24,
        paddingTop:4
    }
  }));

export default function SectionHeader({header,sectionNav,setSectionNav}) {
    const classes = useStyles();
    return (
        <div className='sectionHeader'>
            <Toolbar className={'appBar'}  >
                {/* <Typography className={classes.title} noWrap> */}
                    <h2 className={classes.title}>{camelCaseToString(header)}</h2>
                {/* </Typography> */}
                {sectionNav&&
                    <SectionNav sectionNav={sectionNav} setSectionNav={setSectionNav}/>
                }
            </Toolbar>
        </div>
    )
}
