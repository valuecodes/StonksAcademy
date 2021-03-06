import React,{useState,useEffect,useRef} from 'react'
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
import Fab from '@material-ui/core/Fab';
import { useSelector } from 'react-redux'
import ExersiceCompleted from './ExerciseCompleted'
import ExerciseScore from './ExerciseScore'
import { formatDate } from '../../utils/utils';
import { InputSlider }  from '../Other/Sliders'
import { DeleteButton } from '../Other/Buttons'
import QUESTIONS from '../../courses/questions'
// import AdSense from 'react-adsense';

const useStyles = makeStyles({
  root: {
    color:'lightgreen',    
  },
  finish:{
    backgroundColor:'var(--positive-color)',
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
  },
  quizInitial:{
    color:'var(--primary-color)',
    backgroundColor:'var(--secondary-variant)',
  }
});

const createQuizQuestions=(section)=>{
    const questions = QUESTIONS[section.course][section.name]
    questions.forEach((item,index)=>{
        item.userAnswer = null
        item.id = index
    })
    return questions
}

export default function ExerciseQuiz({section,completeSection,moveTo}){
    
    const classes = useStyles();
    let intervalRef = useRef();

    const [time,setTime] = useState(0)
    const [quiz,setQuiz] = useState({
        stage:'initial',//initial, quiz, results, completed
        currentQuestion:0,
        questions:[],
        attempts:0,
        completedAt:formatDate()
    })

    const sectionGetCompleted = useSelector(state => state.sectionGetCompleted)
    const { completedSections } = sectionGetCompleted

    useEffect(()=>{
        const newQuestions = createQuizQuestions(section)
        setQuiz({...quiz,questions:newQuestions})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        if(completedSections){
            let sectionCompleted = completedSections
                .find(item => item.sectionId===section.sectionId)
            if(sectionCompleted){
                let completedAt = formatDate(sectionCompleted.updatedAt) 
                setQuiz({...quiz,stage:'completed',attempts:sectionCompleted.attempts,score:sectionCompleted.score,completedAt:completedAt})
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    },[completedSections])
    
    const increaseNum = () => setTime((prev) => prev + 1);

    const startExerciseHandler=()=>{
        setTime(0)
        intervalRef.current = setInterval(increaseNum, 1000);
        const newQuestions = createQuizQuestions(section)
        setQuiz({...quiz,stage:'quiz',currentQuestion:0,questions:newQuestions})
    }

    const answerQuestionHandler = (option,index) =>{
        const quizCopy = {...quiz}
        quizCopy.questions[index].userAnswer = option
        setQuiz(quizCopy)
    }

    const finishQuizHandler = (quiz) =>{
        clearInterval(intervalRef.current);
        quiz.questions.forEach(item => item.correct = item.userAnswer===item.answer)
        let correct = quiz.questions.reduce((a,c)=>a+(c.userAnswer===c.answer?1:0),0)
        let total = quiz.questions.length
        let wrong = total-correct
        let notAnswered = 0
        let score = { correct, total, wrong, notAnswered, time }
        let attempts = quiz.attempts+1
        setQuiz({...quiz,attempts,stage:'results',score:score})
    }

    const completeQuizHandler=()=>{
        completeSection(section.id,quiz.score,quiz.attempts)
        setQuiz({...quiz,completedAt:formatDate(),stage:'completed',})
    }

    const quitQuizHandler=()=>{
        clearInterval(intervalRef.current);
        const quizCopy = {...quiz}
        quizCopy.questions.forEach(item => item.userAnswer=null)
        let newStage = quizCopy.score?'completed':'initial'
        setQuiz({...quizCopy,stage:newStage})
    }

    return(
        <div className='quizGrid'>
            {quiz.stage==='initial'&&
                <div className='quizInitial'>
                    <Fab className={classes.quizInitial} onClick={startExerciseHandler} variant="extended">
                        Start Quiz
                    </Fab>
                </div>
            }
            {quiz.stage==='quiz'&&
                <Card className='quiz'>
                    <div className='quizHeader'>
                        <h2>Question: {quiz.currentQuestion+1}</h2>
                        <p>Time {time}</p>
                        <DeleteButton deleteItem={quitQuizHandler}/>
                    </div>
                    
                    {quiz.questions[quiz.currentQuestion]&&
                        <>
                        <p>{quiz.questions[quiz.currentQuestion].question}</p>
                        <div>
                            {quiz.questions[quiz.currentQuestion].options&&
                                <ButtonOptions quiz={quiz} answerQuestionHandler={answerQuestionHandler}/>
                            }
                            {quiz.questions[quiz.currentQuestion].slider&&
                                <SliderOption quiz={quiz} answerQuestionHandler={answerQuestionHandler}/>
                            }   
                        </div>
                        <QuizNav quiz={quiz} setQuiz={setQuiz} finishQuiz={finishQuizHandler}/>    
                        </>                                 
                    }

                </Card>        
            }
            {quiz.stage==='results'&&
                <>
                    <QuizResults quiz={quiz} completeQuiz={completeQuizHandler} tryAgain={startExerciseHandler}/>
                    <ExerciseScore section={quiz}/>
                </>
            }
            {quiz.stage==='completed'&&
                <>
                    <ExersiceCompleted section={quiz} tryAgain={startExerciseHandler} moveTo={moveTo}/>
                    <div className='add-adsense desktop-add'>
                        {/* <AdSense.Google
                            client='ca-pub-4976696279180454'
                            slot='7806394673'
                            style={{ width: 336, height: 280, float: 'right' }}
                            format=''
                        /> */}
                    </div>
                </>
            }
        </div>        
    )
}

function SliderOption({quiz,answerQuestionHandler}){
    let currentQuestion=quiz.questions[quiz.currentQuestion]
    let currentValue = currentQuestion.userAnswer===null?0:currentQuestion.userAnswer

    const onChange=(e,value)=>{
        answerQuestionHandler(value,quiz.currentQuestion)
    }

    return(
        <div className='quizSlider'>
            <InputSlider
                value={currentValue}
                onChange={onChange}
                {...currentQuestion.slider}
            />
            <h2>{currentValue}{currentQuestion.slider.format}</h2>
        </div>
    )
}

function ButtonOptions({quiz,answerQuestionHandler}){
    return(
        <ButtonGroup className={'quizButtons'} aria-label="outlined button group">
            {quiz.questions[quiz.currentQuestion].options.map((option,index) =>
                <Button 
                    key={index}
                    onClick={()=>answerQuestionHandler(option,quiz.currentQuestion)} 
                    id={index}
                    className={quiz.questions[quiz.currentQuestion].userAnswer===option&&'selected'}
                >
                    {option}
                </Button>
            )}
        </ButtonGroup>   
    )
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
                    <Accordion key={index} expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}bh-content`}
                        id={`panel${index}bh-header`}
                    >
                    <div  className='questionHeader'>
                        <h3>{`Question ${index+1}.   `}</h3>
                        {question.correct?
                            <DoneIcon className={'correct icon'}/>
                            :
                            <ExposureNeg1Icon className={'wrong icon'} />}
                    </div>
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
