import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

export default function ExerciseScore({section,size,showText=true}){
    return(
        <div className='exerciseScore'>
            {showText && <h2>Score</h2>} 
            <CircularProgressWithLabel section={section} size={size} />
        </div>
    )
}

function CircularProgressWithLabel({section,size='large'}) {
    const { correct, total } = section.score

    let circleClass='smallScore'
    let cirleTextClass='smallScoreText'

    if(size==='large'){
        circleClass='largeScore'
        cirleTextClass='largeScoreText'
    }

    return (
      <Box  position="relative" display="inline-flex">
        <CircularProgress className={circleClass} variant="determinate" value={(correct/total)*100} />
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