import React from 'react'
import ArticleSubNav from './ArticleSubNav'

export default function ArticleHeader({header,articleSubNav,setArticleSubNav}) {
    return (
        <div className='articleHeader'>
            <h2>{header}</h2>
            <ArticleSubNav articleSubNav={articleSubNav} setArticleSubNav={setArticleSubNav}/>
        </div>
    )
}
