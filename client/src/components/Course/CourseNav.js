import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { textAlign, width } from '@material-ui/system';
import TocIcon from '@material-ui/icons/Toc';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width:200,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 'auto',  
    },
    tabs: {        
        borderRight: `1px solid ${theme.palette.divider}`,
        "& .MuiTab-wrapper": {
            display:'block',
            textAlign:'left',
        },
        "& .MuiTab-wrapper div": {
            display:'grid',
            gridTemplateColumns:'4rem 1fr',
            alignItems:'center'
        },
        
    },
    icon:{
        fontSize:30,
        display:'inline-block',
        justifySelf:'center'
        
    },
    number:{
        fontSize:20,
        justifySelf:'center'
    }
}));

export default function CourseNav({moveTo,course}) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
        let sectionId = newValue
        sectionId--
        if(sectionId===-1) sectionId='start'
        if(sectionId===course.sections.length) sectionId = 'recap' 
        moveTo(sectionId)
        setValue(newValue);
  };

  return (
        <div className={classes.root}>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            TabIndicatorProps={{
                style: {
                    backgroundColor: "var(--primary-color)",
                    width:'0.3rem'
                }
                }}
        >
            <Tab label={
                <div>
                    <TocIcon className={classes.icon}/>
                    Table of Content
                </div>
                
                } {...a11yProps(0)} />
            
            {course.sections.map((section,index) =>
                <Tab className={classes.tab} 
                    label={
                        <div>
                            <h2 className={classes.number}>{index+1}</h2>
                            {section.name}
                        </div> 
                    }
                    {...a11yProps(index+1)} 
                    
                />
            )}
            <Tab {...a11yProps(course.sections.length+1)} 
                label={
                    <div>
                        <EmojiFlagsIcon className={classes.icon}/>
                        Course Recap
                    </div>                    
                }
            />
            </Tabs>
        </div>          

  );
}