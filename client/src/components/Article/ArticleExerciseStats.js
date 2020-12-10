import React from 'react'
import TrainingStatus from '../TrainingStatus'

export default function ArticleExerciseStats({score}){
    return(
        <div className='exerciseStats'>
            <TrainingStatus header='Score' text={`${score.correct}/${score.total}`}/>
            <p>Wrong answers: {score.wrong}</p>
        </div>
    )
}
