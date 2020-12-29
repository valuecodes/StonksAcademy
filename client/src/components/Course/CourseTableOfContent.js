import React from 'react'
import SectionHeader from '../Section/SectionHeader'
import './Course.css'
import { ArticleTermList } from '../Article/ArticleTerm';
import { ArticleButtonPrimary } from '../Other/Buttons'
import { camelCaseToString } from '../../utils/utils';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

export default function CourseTableOfContent({course, moveTo}){
    let Introduction = null
    if(course.introduction){
        Introduction = course.introduction
    }
    return(
        <div id='tableOfContent' className='sectionContainer'>
                {(course.current==='start'||course.last==='start')&&
                    <>
                    <SectionHeader 
                        header={`${camelCaseToString(course.name||'')}`} 
                    />            
                    <div className='sectionContentContainer largeSection'>
                        <div className='tableOfContentContainer'>
                            <ul className='tableOfContent'>
                                <li><h2>Table of Content</h2></li>
                                <Card className='tableOfContentSection'>
                                {course.sections.map((item,index) =>
                                    <li key={index}>
                                        
                                            <h3>{index+1}. {camelCaseToString(item.name)}</h3>
                                            <p>{item.desc}</p>
                                            {/* <h4>Terms covered</h4> */}
                                            {/* <ArticleTermList articleTerms={item.articleTerms} />    */}
                                            <Divider/>     
                                    </li>    
                                )}
                                </Card> 
                            </ul>   
                            {Introduction&&
                                <Card className='courseIntroduction'>
                                    <h2>Introduction</h2>
                                    <Introduction/>
                                    <ArticleButtonPrimary className='startCourseButton' onClick={()=>moveTo(0)} text={'Start Course'}/>
                                </Card>
                            }   
                        </div>
                    </div> 
                    </>                      
                }
        </div>
    )
}
