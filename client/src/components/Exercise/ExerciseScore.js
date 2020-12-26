import React,{useState,useEffect} from 'react'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { calculateSectionScore } from '../../utils/section'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      width:200,
      height: 'auto',  
  },
  smallText:{
    fontSize:13,
    fontWeight:'bold'
  },
  smallBorder:{
    color:'var(--primary-color)'
  },
  bigProgress:{
    color:'var(--secondary-color)'
  },
  mediumProgress:{
    color:'var(--secondary-color)'
  }
}));

export default function ExerciseScore({section,showText=true}){

    const [score,setScore]=useState({})

    useEffect(() => {
      let score = calculateSectionScore(section);
      setScore(score)    
    },[section])

    return(
        <div className='exerciseScore'>
          <ScoreBig score={score}/>
        </div>
    )
}

export function ScoreBig({score}){
  return(
    <>
        <div className='mainScore'>
          <CircularProgressWithLabelBig text={score.totalPoints} value={score.totalPercent} />              
        </div>
        <ul className='subScore'>
          <li>
            <p>Questions</p>
            <CircularProgressWithLabelSmall text={score.questions} value={score.questionPercent}/>                
          </li>
          <li>
            <p>Attempts</p>
            <CircularProgressWithLabelSmall text={score.attempts} value={score.attemptsPercent}format=''/>                
          </li>
          <li>
            <p>Time</p>
            <CircularProgressWithLabelSmall text={score.time} value={score.timePercent} format='s'/>  
          </li>
        </ul>
    </>
  )
}

function CircularProgressWithLabelSmall({text,value,format=''}) {
  const classes = useStyles();

  const getColor=()=>{
    if(value>80) return 'var(--positive-dark-color)'
    if(value>=40&&value<=80) return 'var(--neutral-color-dark)'
    if(value<40) return 'var(--negative-dark-color)'
  }

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress style={{color:getColor(value)}} className={`${classes.smallBorder} subScoreProgress`} variant="determinate" value={value} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        
      >
        <Typography className={classes.smallText} variant="caption" component="div" color="textSecondary">
          {text}{format}
        </Typography>
      </Box>
    </Box>
  );
}

export function CircularProgressWithLabelBig({value,text,size='large'}) {

    const classes = useStyles();

    let circleClass='smallScore'
    let cirleTextClass='smallScoreText'

    if(size==='large'){
        circleClass='largeScore'
        cirleTextClass='largeScoreText'
    }

    return (
      <Box  position="relative" display="inline-flex">
        <CircularProgress className={`${circleClass} ${classes.bigProgress}`} variant="determinate" value={value} />
        <Box
            className={circleClass}
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
          <Typography className={cirleTextClass} variant="caption" component="div" color="textSecondary">
            {text}
          </Typography>
        </Box>
      </Box>
    );
}

export function ScoreMedium({section}) {

    const classes = useStyles();

    const [score,setScore] = useState({})

    useEffect(() => {
        const newScore = calculateSectionScore(section)
        setScore({...newScore})
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    }, [section.score])

    return (
      <Box  position="relative" display="inline-flex">
        <CircularProgress className={`smallScore ${classes.mediumProgress}`} variant="determinate" value={score.totalPercent} />
        <Box
            className='smallScore'
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
          <Typography className={'smallScoreText'} variant="caption" component="div" color="textSecondary">
            {score.totalPercent}
          </Typography>
        </Box>
      </Box>
    );
}

export function CircularProgressWithLabel({section,size='large'}) {
    const { correct, total } = section.score
    const classes = useStyles();

    let circleClass='smallScore'
    let cirleTextClass='smallScoreText'

    if(size==='large'){
        circleClass='largeScore'
        cirleTextClass='largeScoreText'
    }

    return (
      <Box  position="relative" display="inline-flex">
        <CircularProgress className={`${circleClass} ${classes.mediumProgress}`} variant="determinate" value={(correct/total)*100} />
        <Box
            className={circleClass}
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
          <Typography className={cirleTextClass} variant="caption" component="div" color="textSecondary">
            {correct}/{total}
          </Typography>
        </Box>
      </Box>
    );
}