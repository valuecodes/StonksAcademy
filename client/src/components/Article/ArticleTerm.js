import React from 'react'
import Chip from '@material-ui/core/Chip';

export default function ArticleTerm({label}) {
    return <Chip variant="outlined" size="medium" label={label} />
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