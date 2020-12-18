import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export function ArticleButton({text,onClick,disabled=false}) {
    return <Button 
        variant="outlined"
        onClick={onClick}
        size='large'
        disabled={disabled}
        >
            {text}
        </Button>
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor:'var(--secondary-color)',
        color:'var(--text-light)',
        borderColor:'var(--primary-color)',
        "&:hover": {
            // color:'dimgray',
            backgroundColor:'var(--primary-color)',
        }
    },
  }));

export function ArticleButtonPrimary({text,onClick}) {
    const classes = useStyles();
    return <Button
        className={classes.root}
        variant="outlined"
        onClick={onClick}
        size='large'
        >
            {text}
        </Button>
}

export function DeleteButton({deleteItem}){
    const handleDelete = () => {
        deleteItem()
        console.info('You clicked the delete icon.');
    };
    const classes = useStyles();
    return(
        <Chip
            className={'quitButton'}
            variant="outlined"
            size="small"
            label="Quit"
            onDelete={handleDelete}
            onClick={handleDelete}
            color="secondary"
      />

    )
}