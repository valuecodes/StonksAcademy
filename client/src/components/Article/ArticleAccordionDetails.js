import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize:16,    
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    // alignItems: 'center',
    // display:'grid',
    // gridTemplateColumns:'repeat(3,1fr)',
    // minHeight:'5rem'
  },
  column: {
    flexBasis: '83.33%',
  },
  section:{
    minHeight:30
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
    minHeight:50
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function ArticleAccordionDetails({content}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
        {content.map((item,index) =>
            <Accordion  key={index} expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)} >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
                >
                <div className={classes.column}>
                    <Typography className={classes.heading}>{item.header}</Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>{item.secondaryHeader}</Typography>
                </div>
                </AccordionSummary>
                
                <AccordionDetails className={'accordionDetails'}>
                    <div className={classes.helper} >{item.text}</div>
                    <div className={classes.helper}>
                        <p>Pros</p>
                        <ul>
                            <li>Safe</li>
                            <li>Safe</li>
                        </ul>
                    </div>
                    <div className={ classes.helper}>
                        <p>Cons</p>
                    </div>
                </AccordionDetails>
            </Accordion>

            // <Accordion key={index} expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)}>
            //     <AccordionSummary
            //     expandIcon={<ExpandMoreIcon />}
            //     aria-controls="panel1bh-content"
            //     id="panel1bh-header"
            //     >
            //     <Typography className={classes.heading}>{item.header}
            //     </Typography>
            //     <Typography>{item.chip}</Typography>
            //     </AccordionSummary>
            //     <AccordionDetails>

            //       <Typography>
            //           {item.text}
            //       </Typography>
            //     </AccordionDetails>
            // </Accordion>   
        )}

    </div>
  );
}