import React from 'react'
import ArticleHeader from './ArticleHeader'
import './Article.css'

export default function ArticleTableOfContent({navigation, moveTo}){
    return(
        <div id='tableOfContent' className='articleContainer'>
            <ArticleHeader 
                header={'Table of content'} 
            />            
            <ul className='tableOfContent'>
                {navigation.articles.map((item,index) =>
                    <li key={item.articleId}>
                        <h3>{index+1}. {item.name}</h3>
                        <p>{item.desc}</p>
                        <h4>Terms covered</h4>
                        <div className='articleTerms'>
                            {item.articleTerms.map(term =>
                                <p>{term}</p>
                            )}
                        </div>
                    </li>                
                )}
                <li>
                    <button onClick={()=>moveTo(0)} className='button'>
                        Start Section
                    </button>
                </li>
            </ul>
        </div>
    )
}
