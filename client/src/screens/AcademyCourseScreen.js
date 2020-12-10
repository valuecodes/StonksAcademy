import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SectionHeader from '../components/SectionHeader'
import ArticleTableOfContent from '../components/Article/ArticleTableOfContent'
import ArticleRecap from '../components/Article/ArticleRecap'
import CourseNavigation from '../components/Article/CourseNavigation'
import COURSES from '../courses/courses'
import { camelCaseToString } from '../utils/utils';
import { Course } from '../utils/course';
import { completeArticle } from '../actions/articleActions';

export default function AcademyCourseScreen() {

    const { id } = useParams()
    const [course, setCourse] = useState({articles:[]})
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

    const completeArticleHandler=(id,score)=>{
        let completedArticle = course.complete(id,score,course,setCourse)
        dispatch(completeArticle(completedArticle))
    }

    let articles = []

    course.articles.forEach(item =>{
        let Article = item.component
        articles.push(Article)
    })

    return (
        <div className='academySection'>     
            <SectionHeader header={camelCaseToString(id)}/> 
            <div className='academyArticles' id={'academyArticles'} >
                <ArticleTableOfContent course={course} moveTo={handleNavigate}/>
                {articles.map((Article,index) =>
                    <Article 
                        key={course.articles[index].articleId}
                        article={course.articles[index]} 
                        completeArticle={completeArticleHandler}
                    />
                )}
                <ArticleRecap course={course}/>    
            </div>
            <CourseNavigation moveTo={handleNavigate} course={course}/>
        </div>
    )
}
