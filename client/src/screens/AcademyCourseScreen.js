import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CourseTableOfContent from '../components/Course/CourseTableOfContent'
import CourseRecap from '../components/Course/CourseRecap'
import COURSES from '../courses/courses'
import { camelCaseToString } from '../utils/utils';
import { Course } from '../utils/course';
import { completeSection, getCompletedSections, resetStatus } from '../actions/courseActions';
import CourseHeader from '../components/Course/CourseHeader'
import CourseNav from '../components/Course/CourseNav'
import { useSnackbar } from 'notistack';

export default function AcademyCourseScreen(props) {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams()
    const [course, setCourse] = useState({sections:[]})
    const [sections, setSections] = useState([])

    const sectionComplete = useSelector(state => state.sectionComplete)
    let { error:completedError, success:completedSuccess } = sectionComplete
    const sectionGetCompleted = useSelector(state => state.sectionGetCompleted)
    const { completedSections } = sectionGetCompleted

    useEffect(()=>{
        dispatch(getCompletedSections(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    },[id])

    useEffect(()=>{
        let newSections = []
        course.sections.forEach(item =>{
            let Section = item.component
            newSections.push(Section)
        })      
        setSections(newSections)  
    },[course])

    useEffect(()=>{
        if(completedSuccess){
            // enqueueSnackbar('Progress saved successfully!', {variant:'success'});
        }
        if(completedError){
            enqueueSnackbar('Please login to save progress', {variant:'warning'});
        }
        dispatch(resetStatus())        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[completedError,completedSuccess])

    useEffect(() => {
        let courseContent = COURSES.find(item => item.name===id)
        if(!courseContent) props.history.push("/academy")
        let courseIndex = COURSES.findIndex(item => item.name===id)
        let nextCourse = COURSES[courseIndex+1]?COURSES[courseIndex+1].name:null
        courseContent.nextCourse = nextCourse
        if(courseContent){
            let updatedCourse = new Course(courseContent,completedSections)
            updatedCourse.moveToStart()
            setCourse({...updatedCourse})     
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    }, [completedSections])

    const handleNavigate=(direction,status)=>{
        course.navigate(direction,status,course,setCourse)
    }

    const completeSectionHandler=(id,score,attempts)=>{     
        let completedArticle = course.complete(id,score,attempts,course,setCourse)
        dispatch(completeSection(completedArticle))
    }
 
    return (
        <div className='academyCourseScreen'>     
            <CourseHeader header={camelCaseToString(id)} moveTo={handleNavigate} course={course}/>
            <div className='courseContainer' id='courseContainer'>
                <CourseNav moveTo={handleNavigate} course={course}/>
                <div className='academySections' id={'academySections'} >
                    <CourseTableOfContent course={course} moveTo={handleNavigate}/>
                    {sections.map((Section,index) =>
                        <Section 
                            key={course.sections[index].sectionId}
                            section={course.sections[index]} 
                            completeSection={completeSectionHandler}
                            moveTo={handleNavigate}
                        />
                    )}
                    <CourseRecap course={course}/>    
                </div>                
            </div>
        </div>
    )
}
