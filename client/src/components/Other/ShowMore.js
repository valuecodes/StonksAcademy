import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { camelCaseToString } from '../../utils/utils';
import { ScoreBig } from '../Exercise/ExerciseScore';
import { calculateTotalScore } from '../../utils/course';

const useStyles = makeStyles((theme) => ({
    root: {
        height:0,
      maxWidth: 345,
      display:'span'
    },
    actions:{
        marginTop:-60
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    text:{
        textAlign:'center',
        margin:0
    },
    sections: {
      marginLeft:'auto',
      position:'relative',
      left:20,
      top:10
    },
    section:{
      padding:0,
      marginTop:15,
      marginBottom:'0 !important',
      '.cardScore':{
        margin:0
      }
    }
  }));

export default function ShowMore({text}) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <>
    <CardActions className={classes.actions}>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography className={classes.text} paragraph>
           {text}
          </Typography>
        </CardContent>
      </Collapse>
        </>
    )
}

export function ShowSections({sections}){

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [score,setScore]=useState({})

  useEffect(() => {
    let score = calculateTotalScore(sections);
    setScore(score)
  },[sections])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return(
    <>
    <CardActions className={classes.actions}>
      <IconButton
          className={clsx(classes.sections,classes.expand, {
            [classes.expandOpen]: expanded,
            
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse  className={classes.section} in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.section}>
          <div className='myCourseSectionHeader'>
            <h4>Sections</h4>
            <h4>Score</h4>            
          </div>
          {sections.map((item,index) =>
            <div key={index} className='myCourseCompletedSection'>
              <h5>{index+1}. {camelCaseToString(item.name)}</h5>
              {item.score?
                <p>{`${item.score.correct}/${item.score.total}`}</p>
                :
                <p>Not completed</p>
              }
            </div>       
          )}
          <h3 className='myCourseScore'>Course Score</h3>
          <ScoreBig score={score}/>
        </CardContent>
      </Collapse>
        </>
  )
}