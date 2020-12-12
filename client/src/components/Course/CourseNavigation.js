import React from 'react'
import MaterialIcon from '../MaterialIcon'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import TocIcon from '@material-ui/icons/Toc';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';

const useStyles = makeStyles((theme) => ({
    fab:{
        fontSize:'16px',
        backgroundColor:'var(--background-color)',
        color:'var(--primary-variant)'
    },
    icon:{
        fontSize:'30px'
    }
  }));

export default function CourseNavigation({moveTo,course,}){

    const classes = useStyles();
    const getBorderStyle=(item,index)=>{
        let color=item.id===course.current?'var(--secondary-color)':'rgba(255, 255, 255,0.0)'
        return '0.2rem solid '+color
    }

    const getButtonStyle=(id)=>{
        let color=course.current===id?'var(--secondary-color)':'rgba(255, 255, 255,0.0)'
        return '0.2rem solid '+color
    }

    // let prevButtonStatus = course.current===-1?'unavailable':''
    // let nextButtonStatus = getNextButtonStatus(course)
    let prevButtonStatus = ''
    let nextButtonStatus = ''

    return(
        <div className='articleNavigationContainer'>
            <div className='articleNavigation'>
                <Fab 
                    style={{border: getButtonStyle('start')}}
                    onClick={()=> moveTo('start',prevButtonStatus)}
                    size='small' 
                    className={classes.fab} 
                    color="primary" 
                    aria-label="add"
                >
                    <TocIcon className={classes.icon} />
                </Fab>
                {course.sections.map((item,index) =>
                    <Fab 
                        style={{border: getBorderStyle(item,index)}} 
                        onClick={()=> moveTo(item.id,'')} 
                        size='small' 
                        className={classes.fab} 
                        color="primary" 
                        aria-label="add"
                    >
                        {index+1}
                    </Fab>
                )}
                <Fab 
                    style={{border: getButtonStyle('recap')}}
                    onClick={()=> moveTo('recap',nextButtonStatus)}
                    size='small' 
                    className={classes.fab} 
                    color="primary" 
                    aria-label="add"
                >
                    <EmojiFlagsIcon className={classes.icon} />
                </Fab>
            </div>            
        </div>
    )
}