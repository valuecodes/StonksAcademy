import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { makeStyles } from '@material-ui/core/styles';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

const useStyles = makeStyles({
    dot:{
        borderColor:'var(--primary-color)',
    },        
    content:{
        paddingTop:2,
        height:5
    },
});

export function TimelineList({list=[]}) {

    const classes = useStyles();

    return (
      <Timeline align="right">
        {list.map((item,index) =>
            <TimelineItem key={index} className={classes.timeline}>
                <TimelineSeparator className={classes.separator} >
                    <TimelineDot className={classes.dot} variant="outlined"/>
                    {index<list.length-1 && <TimelineConnector />} 
                </TimelineSeparator>
                <TimelineContent className={classes.content}>{item}</TimelineContent>
            </TimelineItem>            
        )}
      </Timeline>
    );
}

export function TimelineListOpposite({list=[]}) {
    const classes = useStyles();

    return (
        <Timeline >
            {list.map((item,index) =>
                <TimelineItem key={index} className={classes.timeline}>
                    <TimelineOppositeContent className={classes.content}>
                        {item[0]}
                    </TimelineOppositeContent>
                    <TimelineSeparator  className={classes.separator}>
                    <TimelineDot  className={classes.dot} variant="outlined"/>
                    {index<list.length-1 &&  <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent className={classes.content}>
                        {item[1]}
                    </TimelineContent>
                </TimelineItem>            
            )}
        </Timeline>
    );
  }