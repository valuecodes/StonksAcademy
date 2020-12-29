import React from 'react'
import './Section.css'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor:'red'
    },
    tab:{
        
    }
  }));

export default function SectionNav({sectionNav,setSectionNav}) {
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        const last = sectionNav.current 
        setSectionNav({...sectionNav,current:newValue,last})
    };

    return (

        <Tabs value={sectionNav.current} onChange={handleChange} aria-label="simple tabs example" TabIndicatorProps={{
        style: {
            backgroundColor: "var(--primary-color)",
            height:'0.3rem'
        }
        }}>
            {sectionNav.articlePages.map(article =>
                <Tab key={article.id} className={classes.tab} label={article.name} {...a11yProps(article.id)} />
            )}         
        </Tabs>

    )
}
