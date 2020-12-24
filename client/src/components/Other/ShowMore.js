import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { camelCaseToString } from '../../utils/utils';
import ExerciseScore from '../Exercise/ExerciseScore';

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let totalScore = { correct:0,wrong:0,notAnswered:0,total:0 }
  sections.forEach(item => {
    if(item.score){
        Object.keys(item.score).forEach(key => totalScore[key]+=item.score[key])
    }else{
      totalScore.total+=10
    }
  })

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
          <ExerciseScore section={{score:totalScore}} size={'small'} showText={false}/>
        </CardContent>
      </Collapse>
        </>
  )
}