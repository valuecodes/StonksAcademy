import React from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'


export default function StockMarket({section,completeSection,moveTo}){

    const sectionComponents = [
        {name:'Overview',article: Overview},
        // {name:'Example',article: Example},
        // {name:'Exercise',article: ExerciseQuiz,props:{section,completeSection,questions}},
    ]

    return(
        <SectionContainer 
            sectionComponents={sectionComponents} 
            section={section} 
            completeSection={completeSection}
            moveTo={moveTo}
        />
    )
}

function Overview(){
    return(
        <div>

        </div>
    )
}
