import React,{ useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import ScreenHeader from '../components/Page/ScreenHeader'
import { useSelector, useDispatch} from 'react-redux'
import { getCompletedSections, resetUserCourses } from '../actions/courseActions';
import Card from '@material-ui/core/Card';
import { camelCaseToString } from '../utils/utils';
import LinearProgress from '@material-ui/core/LinearProgress';
import COURSES from '../courses/courses'
import { ShowSections } from '../components/Other/ShowMore';
import Chip from '@material-ui/core/Chip';
import { ResetButton } from '../components/Other/Buttons';
import { useSnackbar } from 'notistack';

export default function ProfileScreen() {

    const [reseted, setReseted]=useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const [userCourses, setUserCourses] = useState(null)

    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const sectionGetCompleted = useSelector(state => state.sectionGetCompleted)
    const { completedSections } = sectionGetCompleted
    const courseReset = useSelector(state => state.courseReset)
    const { loading, success, error } = courseReset

    useEffect(()=>{
        dispatch(getCompletedSections())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        if(success&&reseted){
            enqueueSnackbar('Courses reseted succesfully!', {variant:'success'});
            setUserCourses(null)
            setReseted(false)
        }
        if(error&&reseted){
            enqueueSnackbar('Error at deleting courses', {variant:'error'});
            setReseted(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    },[success,error])
    
    useEffect(()=>{
        if(completedSections){
            let newUserCourses = [...COURSES]
            newUserCourses.forEach(item =>{
               item.completedSections=[]
               item.sections.forEach(sec => sec.score=null)
            })
            newUserCourses.forEach(item => item.attended=false)
            completedSections.forEach(item => {
                const { course, name } = item
                let courseIndex = newUserCourses.findIndex(item => item.name === course)
                let sectionIndex = newUserCourses[courseIndex].sections.findIndex(item => item.name===name)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[completedSections])

    const resetCoursesHandler = async () => {
        setReseted(true)
        dispatch(resetUserCourses())
    }

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
                        <Card key={course.name} className='myCourse'>
                            <div className='myCourseHeader'>
                                <h3>{camelCaseToString(course.name)}</h3>
                                <Chip className='courseCompleteRate'  size="small" label={`Completed : ${course.completeRate}%`} />
                                <LinearProgress className='courseProgress' variant="determinate" value={course.completeRate} />
                            </div>
                            <ShowSections text={'testing'} sections={course.sections}/>
                        </Card>
                )}
            </div>
            <ResetButton text={'Reset Course progress'} onClick={resetCoursesHandler}/>
        </div>
    )
}
