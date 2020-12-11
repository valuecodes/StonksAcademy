import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SectionHeader from '../components/SectionHeader'
import CourseTableOfContent from '../components/Course/CourseTableOfContent'
import CourseRecap from '../components/Course/CourseRecap'
import CourseNavigation from '../components/Course/CourseNavigation'
import COURSES from '../courses/courses'
import { camelCaseToString } from '../utils/utils';
import { Course } from '../utils/course';
import { completeSection } from '../actions/courseActions';

export default function AcademyCourseScreen() {

    const { id } = useParams()
    const [course, setCourse] = useState({sections:[]})
    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    useEffect(() => {
        let courseContent = COURSES.find(item => item.name===id)
        if(courseContent){
            let updatedCourse = new Course(courseContent,userInfo)
            setCourse({...updatedCourse})            
        }
    }, [id,userInfo])

    const handleNavigate=(direction,status)=>{
        course.navigate(direction,status,course,setCourse)
    }

    const completeSectionHandler=(id,score)=>{
        let completedArticle = course.complete(id,score,course,setCourse)
        dispatch(completeSection(completedArticle))
    }

    let sections = []

    course.sections.forEach(item =>{
        let Section = item.component
        sections.push(Section)
    })

    return (
        <div className='academyCourseScreen'>     
            <SectionHeader header={camelCaseToString(id)}/> 
            <div className='academySections' id={'academySections'} >
                <CourseTableOfContent course={course} moveTo={handleNavigate}/>
                {sections.map((Section,index) =>
                    <Section 
                        key={course.sections[index].sectionId}
                        section={course.sections[index]} 
                        completeArticle={completeSectionHandler}
                    />
                )}
                <CourseRecap course={course}/>    
            </div>
            <CourseNavigation moveTo={handleNavigate} course={course}/>
        </div>
    )
}
