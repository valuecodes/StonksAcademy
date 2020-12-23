import React,{ useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import ScreenHeader from '../components/Page/ScreenHeader'
import { useSelector, useDispatch} from 'react-redux'
import { getCompletedSections } from '../actions/courseActions';
import Card from '@material-ui/core/Card';
import { camelCaseToString } from '../utils/utils';
import ExerciseScore from '../components/Exercise/ExerciseScore'
import LinearProgress from '@material-ui/core/LinearProgress';
import COURSES from '../courses/courses'
import { ShowSections } from '../components/Other/ShowMore';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';

export default function ProfileScreen() {

    const [userCourses, setUserCourses] = useState(null)

    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const sectionGetCompleted = useSelector(state => state.sectionGetCompleted)
    const { loading, completedSections, error } = sectionGetCompleted

    useEffect(()=>{
        dispatch(getCompletedSections())
    },[])

    useEffect(()=>{
        if(completedSections&&userCourses===null){
            console.log('getting')
            let newUserCourses = [...COURSES]
            newUserCourses.forEach(item => item.completedSections=[])
            newUserCourses.forEach(item => item.attended=false)
            completedSections.forEach(item => {
                const { course, name } = item
                let courseIndex = newUserCourses.findIndex(item => item.name === course)
                let sectionIndex = newUserCourses[courseIndex].sections.findIndex(item => item.name===name)

                console.log(newUserCourses[courseIndex],item)
                newUserCourses[courseIndex].sections[sectionIndex].score=item.score
                newUserCourses[courseIndex].completedSections.push(item)
                newUserCourses[courseIndex].attended=true
            });

            newUserCourses.forEach(item => {
                if(item.attended){
                    item.completeRate = +((item.completedSections.length / item.sections.length)*100).toFixed(0) 
                }
            })
            setUserCourses(newUserCourses)
        }
    },[completedSections])

    console.log(userCourses)
    return (
        !userInfo?
            <Redirect to='/'/>
        :
        <div className='profileScreen'>
            <ScreenHeader header={'Profile'} /> 
            <h2>{userInfo.name}</h2>
            <h3>Courses Attended</h3>
            <div className='myCourses'>
                {userCourses&&userCourses.map(course =>
                    course.attended&&
                        <Card className='myCourse'>
                            <div className='myCourseHeader'>
                                <h3>{camelCaseToString(course.name)}</h3>
                                <Chip className='courseCompleteRate'  size="small" label={`Completed : ${course.completeRate}%`} />
                                <LinearProgress className='courseProgress' variant="determinate" value={course.completeRate} />
                            </div>
                            <ShowSections text={'testing'} sections={course.sections}/>
                        </Card>
                )}
            </div>
        </div>
    )
}
