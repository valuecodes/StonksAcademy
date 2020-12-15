import React from 'react'
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ExerciseScore from './ExerciseScore'

export default function ExerciseCompleted({section,tryAgain}) {
    return (
        <Card className='exerciseCompleted'>
            <div className='exerciseCompletedHeader'>
                <h2>Exercise Completed</h2>
                <Chip label={`Completed ${section.completedAt.replaceAll('/','.')}`} variant="outlined" />
            </div>
            <ExerciseScore section={section}/>
            <div className='exerciseCompletedFooter'>
                <Button onClick={tryAgain} color="primary" variant="outlined">Try Again</Button>
            </div>
        </Card>
    )
}
