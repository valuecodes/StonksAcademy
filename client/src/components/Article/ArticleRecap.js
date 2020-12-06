import React from 'react'
import ArticleHeader from './ArticleHeader'
import './Article.css'

export default function ArticleRecap({navigation}){
    let allArticleTerms = navigation.articles.map(item => item.articleTerms).flat(1)
    return(
        <div id='recap' className='articleContainer'>
            <ArticleHeader 
                header={'Recap'} 
            />
            <ul className='tableOfContent'>
                <li>
                    <h4>Section Score</h4>
                </li>
                <li>
                    <h4>Terms covered</h4>            
                    <div className='articleTerms'>
                        {allArticleTerms.map(term =>
                            <p>{term}</p>
                        )}
                    </div>                    
                </li>
                <li>
                    <button className='button'>Start next section</button>        
                </li>
            </ul>
        </div>
    )
}