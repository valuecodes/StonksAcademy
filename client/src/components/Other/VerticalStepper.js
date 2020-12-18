import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import MaterialIcon from '../MaterialIcon'
import { ArticleButton } from './Buttons';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button:{
    fontSize:'5px'
  }
}));


export default function VerticalLinearStepper({steps}) {
  const classes = useStyles();
  let [activeStep, setActiveStep] = useState(0);
  // const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

  const handleNext = () => {
    setActiveStep(activeStep===steps.length-1?activeStep:activeStep+1);
  };

  const handleBack = () => {
    setActiveStep(activeStep===0?activeStep:activeStep-1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Card className={classes.root}>
      <Stepper  className='stepperText' activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel icon={<MaterialIcon icon={step.icon} className='stepperIcon'/>}>
              {step.label}
              {/* <Typography className='stepperContent'>Company Sales</Typography> */}
              
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