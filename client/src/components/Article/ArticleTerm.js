import React from 'react'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    chip:{
        height:25,
        backgroundColor:'white',
        borderColor:'var(--secondary-color)'
    },
});

export default function ArticleTerm({label}) {
    const classes = useStyles();
    return <Chip className={classes.chip} variant="outlined" size="medium" label={label} />
}

export function ArticleTermList({articleTerms}){
    return(
        <div className='articleTerms'>
            {articleTerms.map((term,index) =>
                <ArticleTerm key={index} label={term}/>
            )}
        </div>  
    )
}