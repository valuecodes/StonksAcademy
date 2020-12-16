import React from 'react'
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

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

export default function ArticleButton({text,onClick}) {
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
