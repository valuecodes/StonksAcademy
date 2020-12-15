import React from 'react'
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        borderColor:'var(--primary-variant)',
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
