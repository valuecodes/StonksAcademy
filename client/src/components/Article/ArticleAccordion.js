import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize:16,
  },
}));

export default function ArticleAccordion({content}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>

        {content.map((item,index) =>
            <Accordion key={index} expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography className={classes.heading}>{item.header}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    {item.text}
                </Typography>
                </AccordionDetails>
            </Accordion>   
        )}
    </div>
  );
}