import React from 'react'
import SectionHeader from '../Section/SectionHeader'
import './Course.css'
import { ArticleTermList } from '../Article/ArticleTerm';
import ArticleButtonPrimary from '../Article/ArticleButtonPrimary'

export default function CourseTableOfContent({course, moveTo}){
    return(
        <div id='tableOfContent' className='sectionContainer'>
                <SectionHeader 
                    header={'Table of content'} 
                />            
                <ul className=' sectionContentContainer'>
                    <div className='tableOfContent'>
                        {course.sections.map((item,index) =>
                            <li key={index}>
                                <h3>{index+1}. {item.name}</h3>
                                <p>{item.desc}</p>
                                <h4>Terms covered</h4>
                                <ArticleTermList articleTerms={item.articleTerms} />
                            </li>                
                        )}
                        <li>
                            <ArticleButtonPrimary onClick={()=>moveTo(0)} text={'Start Course'} />
                        </li>                        
                    </div>
                </ul>                
        </div>
    )
}
