import React from 'react'
import SectionHeader from '../Section/SectionHeader'
import './Course.css'
import Card from '@material-ui/core/Card';
import ExerciseScore from '../Exercise/ExerciseScore'
import {ArticleTermList} from '../../components/Article/ArticleTerm'
import { ArticleButtonPrimary } from '../Other/Buttons'
import { Link } from 'react-router-dom'
import { camelCaseToString } from '../../utils/utils';

export default function CourseRecap({course}){
    
    let allArticleTerms = course.sections.map(item => item.articleTerms).flat(1)
    let totalScore = { correct:0,wrong:0,notAnswered:0,total:0 }

    course.sections.forEach(item => {
        if(item.score){
            Object.keys(item.score).forEach(key => totalScore[key]+=item.score[key])
        }
    })

    return(
        <div id='recap' className='sectionContainer'>
            <SectionHeader 
                header={'Recap'} 
            />
            <div className='sectionContentContainer'>
                <div className='recapGrid'>
                    <ul className='sectionScores'>
                        <li>
                            <div >
                                <h3>Section Scores</h3>
                                <div className='recapScore'>
                                    {course.sections.map((item,index) =>
                                        <Card key={index} className='scoreContainer'>
                                            <h3>{index+1}{'. '}{camelCaseToString(item.name)}</h3>
                                            {item.score&&
                                                <ExerciseScore section={item} size={'small'} showText={false}/>
                                            } 
                                        </Card>                        
                                    )}
                                </div>                        
                            </div>
                        </li>
                        <li>
                            <h4>Terms covered</h4>       
                            <ArticleTermList articleTerms={allArticleTerms}/>     
                        </li>
                        <li>
                            {course.nextCourse&& 
                                <Link to={course.nextCourse||'/academy'}>
                                    <ArticleButtonPrimary text={'Start next course'}  />
                                </Link>
                            }
                        </li>
                    </ul>              
                    <Card className='courseScore'>
                        <h2>Course Score</h2>
                        <ExerciseScore section={{score:totalScore}} showText={false}/>
                    </Card>              
                </div>                
            </div>
        </div>
    )
}