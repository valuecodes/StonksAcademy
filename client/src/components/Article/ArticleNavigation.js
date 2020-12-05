import React from 'react'
import MaterialIcon from '../MaterialIcon'

export default function ArticleNavigation({moveTo,navigation,}){

    const getBorderStyle=(item,index)=>{
        let color=item.id===navigation.current?'var(--secondary-color)':'rgba(255, 255, 255,0.0)'
        return '0.3rem solid '+color
    }

    const getNextButtonStatus=(navigation)=>{
        let currentArticle = navigation.articles.find(item => item.id===navigation.current)
        if(!currentArticle) return ''
        if(navigation.current===navigation.articles.length-1) return 'unavailable'
        return currentArticle.completed?'available':'unavailable'
    }

    let prevButtonStatus = navigation.current===0?'unavailable':''
    let nextButtonStatus = getNextButtonStatus(navigation)

    return(
        <div className='articleNavigationContainer'>
            <div className='articleNavigation'>
                
                <button onClick={()=> moveTo('prev',prevButtonStatus)}>
                    <MaterialIcon 
                        className={`navigationIcon ${prevButtonStatus}`}
                        icon={'ArrowUpwardIcon'} 
                    />
                </button>

                {navigation.articles.map((item,index) =>
                    <div 
                        key={item.id}
                        style={{border: getBorderStyle(item,index)}}
                        className='navigatioCheckpoint'
                >{navigation.current>=index&&<p>{index+1}</p>} </div>
                )}

                <button onClick={()=> moveTo('next',nextButtonStatus)}>
                    <MaterialIcon 
                        icon={'ArrowDownwardIcon'} 
                        className={`navigationIcon ${nextButtonStatus}`}
                    />
                </button>
            </div>            
        </div>
    )
}