import React,{ useState, useEffect } from 'react'
import ScreenHeader from '../components/Page/ScreenHeader'
import { camelCaseToString, truncate } from '../utils/utils';
import { Link } from 'react-router-dom'
import MaterialIcon from '../components/Other/MaterialIcon'
import COURSES from '../courses/courses'
import Card from '@material-ui/core/Card';

export default function AcademyScreen(){
    
    const [academyCourses, setAcademyCourses] = useState([])

    useEffect(()=>{
        setAcademyCourses(COURSES)
    },[])

    return (
        <section className='academyScreen'>
            <ScreenHeader header={'Academy'}/>
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
        <Card className='academyCourseCard'>
            <Link className='academyCourse' to={'/academy/'+course.name}>
                <div className='academyCourseHeader'>
                    <MaterialIcon icon='MenuBookIcon' className='categoryBook'/>
                </div>
                <div className='academyCourseInfo'>            
                    <h2>{camelCaseToString(course.name)}</h2>
                    <p>{truncate(course.desc,20)}</p>
                    <div className='academyCourseFooter'>
                        <h3>Stonks Academy</h3>
                        <h3 className='positive'>{camelCaseToString(course.tier)}</h3>
                    </div>    
                </div> 
            </Link>             
        </Card>

    )
}



