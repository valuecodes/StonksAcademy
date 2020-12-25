import React from 'react'
import SectionHeader from '../Section/SectionHeader'
import './Course.css'
import { ArticleTermList } from '../Article/ArticleTerm';
import { ArticleButtonPrimary } from '../Other/Buttons'
import { camelCaseToString } from '../../utils/utils';

export default function CourseTableOfContent({course, moveTo}){
    console.log(course)
    return(
        <div id='tableOfContent' className='sectionContainer'>
                <SectionHeader 
                    header={'Table of content'} 
                />            
                <div className='sectionContentContainer largeSection'>
                    <ul className='tableOfContent'>
                        <li>
                            <h2>{camelCaseToString(course.name||'')} course</h2>
                        </li>
                        {course.sections.map((item,index) =>
                            <li key={index}>
                                <h3>{index+1}. {camelCaseToString(item.name)}</h3>
                                <p>{item.desc}</p>
                                <h4>Terms covered</h4>
                                <ArticleTermList articleTerms={item.articleTerms} />
                            </li>                
                        )}
                        <li>
                            <ArticleButtonPrimary onClick={()=>moveTo(0)} text={'Start Course'} />
                        </li>                        
                    </ul>
                </div>                
        </div>
    )
}
