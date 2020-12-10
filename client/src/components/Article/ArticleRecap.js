import React from 'react'
import ArticleHeader from './ArticleHeader'
import './Article.css'

export default function ArticleRecap({course}){
    
    let allArticleTerms = course.articles.map(item => item.articleTerms).flat(1)

    return(
        <div id='recap' className='articleContainer'>
            <ArticleHeader 
                header={'Recap'} 
            />
            <ul className='tableOfContent'>
                <li>
                    <h4>Section Score</h4>
                    <div className='recapScore'>
                        {course.articles.map((item,index) =>
                            <div key={index} className='scoreContainer'>
                                <h3>{item.name}</h3>
                                {item.score&&
                                    <h4>Score {item.score.correct}/{item.score.total}</h4>
                                } 
                            </div>                        
                        )}

                    </div>
                </li>
                <li>
                    <h4>Terms covered</h4>            
                    <div className='articleTerms'>
                        {allArticleTerms.map((term,index) =>
                            <p key={index}>{term}</p>
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