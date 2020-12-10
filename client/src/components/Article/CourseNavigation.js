import React from 'react'
import MaterialIcon from '../MaterialIcon'

export default function CourseNavigation({moveTo,course,}){

    const getBorderStyle=(item,index)=>{
        let color=item.id===course.current?'var(--secondary-color)':'rgba(255, 255, 255,0.0)'
        return '0.2rem solid '+color
    }

    // const getNextButtonStatus=(course)=>{
    //     let currentArticle = course.articles.find(item => item.id===course.current)
    //     if(!currentArticle) return ''
    //     if(course.current===course.articles.length-1) return 'unavailable'
    //     return currentArticle.completed?'available':'unavailable'
    // }

    const getButtonStyle=(id)=>{
        let color=course.current===id?'var(--secondary-color)':'rgba(255, 255, 255,0.0)'
        return '0.2rem solid '+color
    }

    // let prevButtonStatus = course.current===-1?'unavailable':''
    // let nextButtonStatus = getNextButtonStatus(course)
    let prevButtonStatus = ''
    let nextButtonStatus = ''

    return(
        <div className='articleNavigationContainer'>
            <div className='articleNavigation'>
                
                <button onClick={()=> moveTo('start',prevButtonStatus)}
                    className='articleNavButton'
                    style={{border: getButtonStyle('start')}}
                >
                    <MaterialIcon 
                        className={`navigationIcon ${prevButtonStatus}`}
                        icon={'TocIcon'} 
                    />
                </button>
                {course.articles.map((item,index) =>
                    <button
                        onClick={()=> moveTo(item.id,'')}
                        key={item.id}
                        style={{border: getBorderStyle(item,index)}}
                        className='navigationCheckpoint'
                    >
                    {index+1}
                </button> 
                )}

                <button onClick={()=> moveTo('recap',nextButtonStatus)}
                     className='articleNavButton'
                     style={{border: getButtonStyle('recap')}}
                >
                    <MaterialIcon 
                        icon={'EmojiFlagsIcon'} 
                        className={`navigationIcon ${nextButtonStatus}`}
                    />
                </button>
            </div>            
        </div>
    )
}