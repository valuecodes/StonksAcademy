import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor:'var(--secondary-color)',
        color:'var(--text-light)',
        borderColor:'var(--primary-color)',
        "&:hover": {
            backgroundColor:'var(--primary-color)',
        },
        
    },
    secondary:{
        backgroundColor:'white',
        borderColor:'var(--primary-color)'
    },
    actionButton:{
        backgroundColor:'var(--secondary-color)',
        color:'white',
        "&:hover": {
            backgroundColor:'var(--primary-color)',
        },
    }
  }));

  export function ArticleButton({text,onClick,disabled=false}) {
    const classes = useStyles();

    return <Button 
        className={classes.secondary}
        variant="outlined"
        onClick={onClick}
        size='large'
        disabled={disabled}
        >
            {text}
        </Button>
}



export function ArticleButtonPrimary({text,onClick,className}) {
    const classes = useStyles();
    return <Button
        className={`${classes.root} ${className}`}
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

export function ResetButton({text,onClick}){
    return(
    <Button
        variant="contained"
        color="secondary"
        onClick={onClick}
        startIcon={<DeleteIcon />}
      >
        {text}
      </Button>
    )
}

export function ActionButton({text}){
    const classes = useStyles();

    return(
        <Button
            variant="contained"
            size='large'
            // onClick={onClick}
            className={classes.actionButton}
          >
            {text}
          </Button>
        )
}