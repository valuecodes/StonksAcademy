import React,{useEffect,useState} from 'react'
import SectionHeader from '../Section/SectionHeader'
import './Course.css'
import Card from '@material-ui/core/Card';
import { ScoreBig, ScoreMedium } from '../Exercise/ExerciseScore'
import {ArticleTermList} from '../../components/Article/ArticleTerm'
import { ArticleButtonPrimary } from '../Other/Buttons'
import { Link } from 'react-router-dom'
import { camelCaseToString } from '../../utils/utils';
import AdSense from 'react-adsense';

export default function CourseRecap({course, }){
    
    const [score,setScore] = useState({})
    const [sections,setSections] = useState([])

    let allArticleTerms = course.sections.map(item => item.articleTerms).flat(1)

    useEffect(() => {
        if(course.name){    
            let newScore = course.getTotalScore(course.sections)
            setScore({...newScore})      
        }
        if(course.sections){
            let updatedSections = [...course.sections]
            setSections([...updatedSections])
        }
    }, [course])

    return(
        <div id='recap' className='sectionContainer'>
            {(course.current==='recap'||course.last==='recap')&&
                <>
                    <SectionHeader 
                        header={'Recap'} 
                    />
                    <div className='sectionContentContainer largeSection'>
                        <div className='recapGrid'>
                            <ul className='sectionScores'>
                                <li>
                                    <h3>Section Scores</h3>
                                    <div className='recapScoreContainer'>    
                                        <div className='recapScore'>
                                            {sections.map((item,index) =>
                                                <Card key={index} className='scoreContainer'>
                                                    <h3>{index+1}{'. '}{camelCaseToString(item.name)}</h3>
                                                    {item.score&&
                                                        <div className='recapScoreProgress'>
                                                            <ScoreMedium section={item}/>
                                                        </div>
                                                    } 
                                                </Card>                        
                                            )}
                                        </div>                        
                                    <Card className='courseScore'>
                                        <h2>Course Score</h2>
                                        <ScoreBig score={score}/>
                                    </Card>  
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
                            <div>
                                <div className='add-adsense desktop-add'>
                                    <AdSense.Google
                                        client='ca-pub-4976696279180454'
                                        slot='7806394673'
                                        style={{ width: 300, height: 600, float: '' }}
                                        format=''
                                        />
                                </div>                                 
                                {/* <Card className='courseScore'>
                                    <h2>Course Score</h2>
                                    <ScoreBig score={score}/>
                                </Card>                                    */}
                            </div>          


                        </div>                
                    </div>
                </>
            }
        </div>
    )
}