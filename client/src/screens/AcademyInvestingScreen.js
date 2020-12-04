import React,{useState,useEffect,useRef} from 'react'
import ReactDOM from 'react-dom';
import SectionHeader from '../components/SectionHeader'
import DragAndDrop from '../components/DragAndDrop'
import ArticleHeader from '../components/ArticleHeader'
// import ArticleControls from '../components/ArticleControls'
import TrainingStatus from '../components/TrainingStatus'
import MaterialIcon from '../components/MaterialIcon'
import { camelCaseToString } from '../utils/utils'

export default function AcademyInvestingScreen() {

    const [navigation, setNavigation] = useState({
        current:0,
        articles:[
            {name:'AssetsAndLiabilities',id:0,completed:false,visited:false,articleId:'article.0'},
            {name:'AssetsAndLiabilities',id:1,completed:false,visited:false,articleId:'article.1'},
            {name:'AssetsAndLiabilities',id:2,completed:false,visited:false,articleId:'article.2'},
        ],
    })

    const handleNavigate=(direction,status)=>{
            if(status==='unavailable') return
            let current = navigation.current
            let element = null
            if(direction==='prev'){
                current--;
            }else{
                current++;                
            }                
            element = document.getElementById('article.'+current)
            if(element){
                element.scrollIntoView({behavior: "smooth"});
                setNavigation({...navigation,current:current})
            }
    }

    const completeArticleHandler=(id)=>{
        const articleIndex = navigation.articles.findIndex(item => item.articleId===id)
        const navCopy={...navigation}
        navCopy.articles[articleIndex].completed=true
        setNavigation(navCopy)
    }

    return (
        <section className='academySection' >
            <SectionHeader 
                header={'Academy'} 
                subHeader={'Investing'} 
                back={'/academy'}
            /> 
            <div className='academyArticles' id={'academyArticles'} >
                <AssetsAndLiabilities id={'article.0'} completeArticle={completeArticleHandler}/>                       
                <AssetsAndLiabilities id={'article.1'} completeArticle={completeArticleHandler}/>                       
                <AssetsAndLiabilities id={'article.2'} completeArticle={completeArticleHandler}/>                       
            </div>
            <ArticleNavigation moveTo={handleNavigate} navigation={navigation}/>        
        </section>
    )
}

function ArticleNavigation({moveTo,navigation,}){

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

function AssetsAndLiabilities({id,completeArticle}){    

    const [articleStatus, setArticleStatus] = useState('practice')
    const [startExercise,setStartExercise] = useState(false)

    const [score,setScore] = useState({})
    
    const scoreHandler=(newScore)=>{
        setScore(newScore)
        if(newScore.correct===newScore.total){
            completeArticle(id)
        }
    }

    return(
    <div id={id} className='assetsAndLiabilities articleContainer'>
        <ArticleHeader header={'1. Assets and Liabilities'}/>
        <div className='article'>      
            <div className='articleContent'>
                {articleStatus==='exercise'&&
                    <DragAndDrop 
                        columns={[                    
                            {name:'Drag and drop items to Assets and Liabilities',id:1,
                                exercise:true,
                                starting:true},
                            {
                                name:'Assets',id:0,
                                // infoText:'Assets generate income and make you wealthier  even though you dont need use time and energy. Assets include items like stocks, bonds, real estate etc that generate passive income.',
                                icon:'AttachMoneyIcon'
                            },
                            {
                                name:'Liabilities',
                                id:2,
                                // infoText:'Liabilities loses value over time, for example cars, boats motorcycles. Liabilities loses value over time, for example it needs maintenence, fuel etc.',
                                icon:'MoneyOffIcon'
                            },                    
                        ]}
                        items={[
                            {name:'Car',start:1,target:2},
                            {name:'Stock',start:1,target:0},
                            {name:'Bond',start:1,target:0},
                            {name:'Boat',start:1,target:2},
                            {name:'House',start:1,target:0},
                            
                        ]}
                        getScore={scoreHandler}
                        startExercise={true}
                    />
                }
            </div>
            <ArticleControls score={score} articleStatus={articleStatus} setArticleStatus={setArticleStatus} startExercise={startExercise} setStartExercise={setStartExercise} />
        </div>
    </div>  
    ) 
}

function ArticleControls({score, startExercise, setStartExercise, articleStatus, setArticleStatus}){
    return(
        <div className='articleControls'>
            <div className='articleControlsHeader'>
                <h2>{camelCaseToString(articleStatus)}</h2>
                {articleStatus==='practice'&&
                    <button onClick={()=>setArticleStatus('exercise')} className='button'>
                        Start exercise
                    </button>
                }
                {/* <button onClick={()=>setStartExercise(true)} className='button'>Start exercise</button> */}
            </div>
            {startExercise&& 
                <div className='exerciseStats'>
                    <TrainingStatus header='Score' text={`${score.correct}/${score.total}`}/>
                    <p>Wrong answers: {score.wrongAnswerCount}</p>
                </div>
            } 
        </div>    
    )
}

