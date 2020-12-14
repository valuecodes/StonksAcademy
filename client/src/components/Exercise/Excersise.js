import React,{useState,useEffect} from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import './Exercise.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { completeSection } from '../../actions/courseActions';
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {
    color:'lightgreen',    
  },
  finish:{
    backgroundColor:'lightgreen',
    "&:hover":{
        backgroundColor:'lightgreen'
    }
  },
  buttons:{
        width:50
  },
  details:{
    display:'grid',
    gridTemplateColumns:'auto auto 1fr',
    gridGap:10
  },
  detailsQuestion:{
      gridColumn:'1/4',
      fontSize:14
  }
});

export default function Exercise({section,completeSection}){

    const [quiz,setQuiz] = useState({
        stage:'initial',//initial, quiz, results, completed
        currentQuestion:0,
        questions:[
            {id:1,question:'Bond is asset',options:['True','False','Both'],answer:'True',userAnswer:null},
            {id:2,question:'Car is',options:['Asset','Liability','None'],answer:'Liability',userAnswer:null},
            {id:3,question:'Reinvesting dividends accelerates compounding',options:['True','False'],answer:'True',userAnswer:null},
            {id:4,question:'Stock is',options:['Asset','Liability'],answer:'Asset',userAnswer:null},
            {id:5,question:'Car insurance is',options:['Variable Cost','Fixed Cost'],answer:'Fixed Cost',userAnswer:null},
            {id:6,question:'Car gas is',options:['Variable Cost','Fixed Cost','Temperary Cost'],answer:'Variable Cost',userAnswer:null},
            {id:7,question:'Boat is',options:['Asset','Liability'],answer:'Liability',userAnswer:null},            
        ],
        completedAt:new Date().toLocaleDateString()
    })

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    useEffect(() => {
        if(userInfo){
            let sectionCompleted = userInfo.completedSections
                .find(item => item.sectionId===section.sectionId)
            if(sectionCompleted){
                let completedAt = new Date(sectionCompleted.updatedAt).toLocaleDateString()
                setQuiz({...quiz,stage:'completed',score:sectionCompleted.score,completedAt:completedAt})
            }
        }
    }, [userInfo])
    
    const startExerciseHandler=()=>{
        setQuiz({...quiz,stage:'quiz'})
    }

    const answerQuestionHandler = (option,index) =>{
        const quizCopy = {...quiz}
        quizCopy.questions[index].userAnswer = option
        setQuiz(quizCopy)
    }

    const finishQuizHandler = (quiz) =>{
        quiz.questions.forEach(item => item.correct = item.userAnswer===item.answer)
        let correct = quiz.questions.reduce((a,c)=>a+(c.userAnswer===c.answer?1:0),0)
        let total = quiz.questions.length
        let wrong = total-correct
        let notAnswered = 0
        let score = { correct, total, wrong, notAnswered }
        setQuiz({...quiz,stage:'results',score:score})
    }

    const completeQuizHandler=()=>{
        completeSection(section.id,quiz.score)
        setQuiz({...quiz,stage:'completed'})
    }

    const tryAgainHandler=()=>{
        const quizCopy = {...quiz}
        quizCopy.questions.forEach(item => item.userAnswer=null)
        setQuiz({...quizCopy,stage:'quiz',currentQuestion:0})
    }

    return(
        <div className='quizGrid sectionContent'>
            {quiz.stage==='initial'&&
                <div className='quizInitial'>
                    <Fab onClick={startExerciseHandler} variant="extended">
                        Start Quiz
                    </Fab>
                </div>
            }
            {quiz.stage==='quiz'&&
                <Card className='quiz'>
                    <h2>Question: {quiz.currentQuestion+1}</h2>
                    <p>{quiz.questions[quiz.currentQuestion].question}</p>
                    <div>
                        <ButtonGroup className={'quizButtons'} aria-label="outlined button group">
                            {quiz.questions[quiz.currentQuestion].options.map((option,index) =>
                                <Button 
                                    onClick={()=>answerQuestionHandler(option,quiz.currentQuestion)} 
                                    id={index}
                                    className={quiz.questions[quiz.currentQuestion].userAnswer===option&&'selected'}
                                >
                                    {option}
                                </Button>
                            )}
                        </ButtonGroup>                 
                    </div>
                    <QuizNav quiz={quiz} setQuiz={setQuiz} finishQuiz={finishQuizHandler}/>
                </Card>        
            }
            {quiz.stage==='results'&&
                <>
                    <QuizResults quiz={quiz} completeQuiz={completeQuizHandler} tryAgain={tryAgainHandler}/>
                    <QuizScore quiz={quiz}/>
                </>
            }
            {quiz.stage==='completed'&&
                <Card className='quizCompleted'>
                    <div className='quizCompletedHeader'>
                        <h2>Quiz Completed</h2>
                        {/* <h2>12.12.2020</h2> */}
                        <Chip className='competedQuiz' label={`Completed ${quiz.completedAt.replaceAll('/','.')}`} variant="outlined" />
                    </div>
                    <QuizScore quiz={quiz}/>
                    <div className='quizCompletedFooter'>
                        <Button onClick={tryAgainHandler} color="primary" variant="outlined">Try Again</Button>
                    </div>
                </Card>
            }

        </div>        
    )
}

function QuizScore({quiz}){
    const { correct, total } = quiz.score
    return(
        <div className='quizScore'>
            <h2>Score</h2>
            <CircularProgressWithLabel quiz={quiz} />
        </div>
    )
}

function CircularProgressWithLabel({quiz}) {
    const { correct, total } = quiz.score
    return (
      <Box  position="relative" display="inline-flex">
        <CircularProgress className='quizScoreProgress' variant="determinate" value={(correct/total)*100} />
        <Box
            className='quizScoreProgress'
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
          <Typography className='quizScoreText' variant="caption" component="div" color="textSecondary">
            {correct}/{total}
          </Typography>
        </Box>
      </Box>
    );
}
  
function QuizResults({quiz,completeQuiz,tryAgain}){

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return(
        <div className={'quizResults'}>       
            <h2>Results</h2>
            <div>
                {quiz.questions.map((question,index) =>
                    <Accordion expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}bh-content`}
                        id={`panel${index}bh-header`}
                    >
                    <Typography  className='questionHeader'>
                        <h3>{`Question ${index+1}.   `}</h3>
                        {question.correct?
                            <DoneIcon className={'correct icon'} fontSize="medium"/>
                            :
                            <ExposureNeg1Icon className={'wrong icon'} fontSize="medium"/>}
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails  className={classes.details}>                
                        <Typography className={classes.detailsQuestion}>
                            {question.question}
                        </Typography>
                        <Chip className={'correct'} label={`Correct Answer: ${question.answer}`} />
                        <Chip className={question.correct?'correct':'wrong'} label={`My Answer: ${question.userAnswer}`} />
                    </AccordionDetails>
                    </Accordion>            
                )}            
            </div>            
            <ButtonGroup className='quizResultButtons' size="large" aria-label="large outlined primary button group">
                <Button onClick={tryAgain}>Try again</Button>
                <Button onClick={completeQuiz} className={classes.finish}>Continue</Button>
            </ButtonGroup>
        </div>
    )
}

function QuizNav({quiz,setQuiz,finishQuiz}) {

    let steps = quiz.questions.length
    let currentStep =  quiz.currentQuestion
    const classes = useStyles();
    const theme = useTheme();

    const handleNext = (next) => {
        const nextStep = quiz.currentQuestion + next
        console.log(nextStep,steps)
        if(nextStep< steps){
           setQuiz({...quiz,currentQuestion:nextStep}) 
        }else{
            finishQuiz(quiz)
            console.log('Finish quiz')
        }
    };

    const getClasses=(currentStep,steps)=>{
        let userAnswers = quiz.questions.reduce((a,c)=>a+(c.userAnswer!==null?1:0),0)
        return currentStep === steps-1&&userAnswers=== steps&&classes.finish
    }

  return (
    <MobileStepper
      variant="progress"
      steps={steps}
      position="static"
      activeStep={currentStep}
      className={classes.root}
      nextButton={
        <Button className={`${classes.buttons} ${getClasses(currentStep,steps)}`} size="large" onClick={()=>handleNext(1)}>
          {currentStep === steps-1?'Finish':`Next`}
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button className={classes.buttons} size="large" onClick={()=>handleNext(-1)}disabled={currentStep === 0}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
           {'Back'} 
        </Button>
      }
    />
  );
}
