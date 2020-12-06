import React from 'react'
import MaterialIcon from '../MaterialIcon'

export default function ArticleNavigation({moveTo,navigation,}){

    const getBorderStyle=(item,index)=>{
        let color=item.id===navigation.current?'var(--secondary-color)':'rgba(255, 255, 255,0.0)'
        return '0.2rem solid '+color
    }

    const getNextButtonStatus=(navigation)=>{
        let currentArticle = navigation.articles.find(item => item.id===navigation.current)
        if(!currentArticle) return ''
        if(navigation.current===navigation.articles.length-1) return 'unavailable'
        return currentArticle.completed?'available':'unavailable'
    }

    const getButtonStyle=(id)=>{
        let color=navigation.current===id?'var(--secondary-color)':'rgba(255, 255, 255,0.0)'
        return '0.2rem solid '+color
    }

    // let prevButtonStatus = navigation.current===-1?'unavailable':''
    // let nextButtonStatus = getNextButtonStatus(navigation)
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

                {navigation.articles.map((item,index) =>
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