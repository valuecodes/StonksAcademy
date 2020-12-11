import React from 'react'
import SectionHeader from '../Section/SectionHeader'
import './Course.css'

export default function CourseRecap({course}){
    
    let allArticleTerms = course.sections.map(item => item.articleTerms).flat(1)

    return(
        <div id='recap' className='sectionContainer'>
            <SectionHeader 
                header={'Recap'} 
            />
            <ul className='tableOfContent'>
                <li>
                    <h4>Section Score</h4>
                    <div className='recapScore'>
                        {course.sections.map((item,index) =>
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