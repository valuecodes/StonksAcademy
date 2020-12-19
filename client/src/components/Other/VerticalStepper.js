import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import MaterialIcon from '../MaterialIcon'
import { ArticleButton } from './Buttons';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    whiteSpace: 'pre-wrap'    
  },
  button:{
    fontSize:'5px'
  }
}));


export default function VerticalLinearStepper({steps}) {

  const classes = useStyles();
  let [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep===steps.length-1?activeStep:activeStep+1);
  };

  const handleBack = () => {
    setActiveStep(activeStep===0?activeStep:activeStep-1);
  };

  return (
    <Card className={classes.root}>
      <Stepper  className='stepperText' activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel icon={<MaterialIcon icon={step.icon} className='stepperIcon'/>}>
              {step.label}           
            </StepLabel>
            <StepContent>
              <Typography className='stepperContent'>{step.text}</Typography>
              <div className='stepperButtons'>
                <ArticleButton text='Prev' onClick={handleBack} disabled={activeStep===0}/>
                <ArticleButton text='Next' onClick={handleNext} disabled={activeStep===steps.length-1}/>
              
              </div>
            </StepContent>
          </Step>
        ))}              
      </Stepper>
    </Card>
  );
}