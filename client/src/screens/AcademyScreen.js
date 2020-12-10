import React,{ useState, useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import { camelCaseToString, truncate } from '../utils/utils';
import { Link } from 'react-router-dom'
import MaterialIcon from '../components/MaterialIcon'
import COURSES from '../courses/courses'

export default function AcademyScreen(){
    
    const [academyCourses, setAcademyCourses] = useState([])

    useEffect(()=>{
        setAcademyCourses(COURSES)
    },[])

    return (
        <section className='academyScreen'>
            <SectionHeader header={'Academy'}/>
            <h2 className='academyCoursesHeader'>Featured Courses</h2>
            <div className='academyCourses'>    
                {academyCourses.map(course => 
                    <AcademyCourse key={course.name} course={course}/>
                )}
            </div>
        </section>
    )
}

function AcademyCourse({course}){
    return (
        <Link className='academyCourse' to={'/academy/'+course.name}>
            <div className='academyCourseHeader'>
                <MaterialIcon icon='MenuBookIcon' className='categoryBook'/>
            </div>
            <div className='academyCourseInfo'>            
                <h2>{camelCaseToString(course.name)}</h2>
                <p>{truncate(course.desc,77)}</p>
                <div className='academyCourseFooter'>
                    <h3>Midastopedia</h3>
                    <h3 className='positive'>{camelCaseToString(course.tier)}</h3>
                </div>    
            </div> 
        </Link> 
    )
}



