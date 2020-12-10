import React,{useState,useEffect} from 'react'
import { ArticleNav } from '../utils/articleNav';
import SectionHeader from '../components/SectionHeader'
import { SubArticleNav } from '../utils/subArticleNav'
import ArticleHeader from '../components/Article/ArticleHeader'
import ArticleNavigation from '../components/Article/ArticleNavigation'
import ArticleRecap from '../components/Article/ArticleRecap'
import MaterialIcon from '../components/MaterialIcon'
import TextList from '../components/Article/TextList'
import ArticleExerciseStats from '../components/Article/ArticleExerciseStats'
import ArticleQuestionnary from '../components/Article/ArticleQuestionnary'
import ArticleTableOfContent from '../components/Article/ArticleTableOfContent'
import { useSelector, useDispatch} from 'react-redux'
import { completeArticle } from '../actions/articleActions'

const section={
    name:'stockMarket',
    articles:[
        {
            name:'Share',
            desc:'What is share of a company and what it represents',
            articleTerms:['Share','Shares Outstanding','Market Cap']
        },
        {
            name:'Share Financial Ratios',
            desc:'What is earnings per share and book value and how to calculate them',
            articleTerms:['Earnings','Earnings per Share','Equity','Book value']
        },
        {
            name:'Stock Market',
            desc:'What is stock market and how it works',
            articleTerms:['Stock Market','Broker','IPO']
        },
    ]
}

export default function AcademyStockMarketScreen() {
    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const [navigation, setNavigation] = useState(new ArticleNav(section))

    useEffect(() => {
        let newArticleNav = new ArticleNav(section)
        let newArticles = newArticleNav.init(section,userInfo)
        setNavigation({...newArticleNav,articles:newArticles})
    }, [userInfo])
    console.log(navigation)
    const handleNavigate=(direction,status)=>{
        navigation.navigate(direction,status,navigation,setNavigation)
    }

    const completeArticleHandler=(id,score)=>{
        let completedArticle = navigation.complete(id,score,navigation,setNavigation)
        dispatch(completeArticle(completedArticle))
    }

    return (
        <div className='academySection' >
            <SectionHeader 
                header={'Stock Market'} 
            /> 
            <div className='academyArticles' id={'academyArticles'} >
                <ArticleTableOfContent navigation={navigation} moveTo={handleNavigate}/>
                <Share article={navigation.articles[0]} completeArticle={completeArticleHandler}/>
                <ArticleTest article={navigation.articles[1]}/>
                <ArticleTest article={navigation.articles[2]}/>
                <ArticleRecap navigation={navigation}/>
            </div>
            <ArticleNavigation moveTo={handleNavigate} navigation={navigation}/> 
        </div>
    )
}

function Share({article,completeArticle}){
    const [articleSubNav, setArticleSubNav] = useState(new SubArticleNav(['Practise','Exercise']))
    return(
        <div id={article.articleId} className='articleContainer'>
            <ArticleHeader 
                header={article.name} 
                articleSubNav={articleSubNav} 
                setArticleSubNav={setArticleSubNav}
            />
            <div className='articleSubPages' style={articleSubNav.subPageStyle(articleSubNav)}>
                <SharePractice/>
                <ShareExercise article={article} completeArticle={completeArticle}/>
            </div>
        </div>
    )
}

function ShareExercise({article,completeArticle}){

    const [score,setScore] = useState({
        total:0,
        wrong:0,
        correct:0,
        notAnswered:0,
    })    

    useEffect(()=>{
        if(article.score){
            setScore(article.score)
        }
    },[article])

    const [questions, setQuestions] = useState([
        {id:1,parameters:[{name:'Share Price',value:10},{name:'Share Count',value:10}],solve:{name:'Market Cap',value:''},result:100},
        {id:2,parameters:[{name:'Share Count',value:5},{name:'Market Cap',value:200}],solve:{name:'Share Price',value:''},result:10},
        {id:3,parameters:[{name:'Market Cap',value:300},{name:'Share Price',value:15}],solve:{name:'Share Count',value:''},result:20},
    ])

    const setQuestionAswerHandler = (e,id) =>{
        const { value } = e.target
        let questionIndex = questions.findIndex(item => item.id===id)
        let qCopy = [...questions]
        qCopy[questionIndex].solve.value = +value
        setQuestions(qCopy)
    }

    const completeExerciseHandler = () => {
        let result={
            total:0,
            wrong:0,
            correct:0,
            notAnswered:0,
        }
        questions.forEach(item =>{
            result.total++
            if(typeof item.solve.value==='number'){
                if(item.solve.value===item.result){
                    result.correct++
                }else{
                    result.wrong++
                }
            }else{
                result.notAnswered++
            }
        })
        setScore(result)

        completeArticle(article.id,result)
    }

    return(
        <div className='articleSubPage'>
            <div className='articleExerciseHeader'>
                <h2>Solve the following questions</h2>
            </div>
            <ArticleQuestionnary questions={questions} setQuestionAswer={setQuestionAswerHandler} readOnly={article.completed}/>
            <ArticleResults article={article} completeExercise={completeExerciseHandler} score={score}/>
        </div>
    )
}

function ArticleResults({article,completeExercise, score}){
    return(
        <div className='articleResults'>
            {!article.completed&&
                <button onClick={completeExercise} className='button'>
                    Complete Exercise
                </button>            
            }
            <ArticleExerciseStats score={score}/>
        </div>
    )
}

function SharePractice(){

    const[company,setCompany] = useState({
        sharePrice:15,
        shareCount:60,
        marketCap:900,
    })

    const [startDemo,setStartDemo] = useState(false)

    const demoStartHandler = () =>{
        setStartDemo(!startDemo)
    }

    const shareCountHandler=(e)=>{
        const { value } = e.target
        let marketCap = company.sharePrice*company.shareCount
        let sharePrice = (marketCap/+value)
        if(marketCap>1200) return
        if(sharePrice>20) return
        setCompany({...company,sharePrice:sharePrice,shareCount:+value})
    }

    const sharePriceHandler = (e) =>{
        const { value } = e.target
        let marketCap = +value*company.shareCount
        if(marketCap>1200) return
        setCompany({...company,sharePrice:+value})
    }

    return(
        <div className='articleSubPage'>
            <TextList
                content={[
                    {
                        header:'Share',
                        text:'One share is like the whole company in miniature size.'
                    },
                    {
                        header:'Shares outstanding',
                        text:'Number of shares the company has. Company can be dividend in to many pieces but it doesnt affect the company value'},
                    {
                        header:'Market Cap',
                        text:'Market Cap is the total market value of the company. If you wanted buy the whole company (all of the shares) this is how much it would cost',
                        formula:'Market Cap = Share price * Shares Outstanding'
                    },
                    {buttons:[{text:'Demonstrate',onClick:demoStartHandler}]}
                ]}
            />
            {startDemo &&
                <div className='articleExample exampleGrid'>
                    <div className='shareExample'>
                        <h2>Share</h2>
                        <div className='companyContainer'
                            style={{transform:`scale(${company.sharePrice/10})`}}
                        >
                        <MaterialIcon icon='BusinessIcon' className='businessIcon'/> 
                        </div>
                        <div className='shareExampleInput'>
                            <label>Share Price: </label>
                            <h3 className='shareExampleNumber'>{(company.sharePrice).toFixed(2)}$</h3>                           
                        </div>
                        <input
                            min={1}
                            max={20} 
                            value={company.sharePrice} 
                            type='range'
                            onChange={(e)=>sharePriceHandler(e)} 
                        /> 
                        <p>Share price affects the market cap</p>
                    </div>
                    <div className='shareExample'>
                        <h2>Company</h2>
                        <div className='companyContainer'
                            style={{
                                transform:`scale(${company.sharePrice/10})`,
                                width:50+(company.shareCount/2)+'%'
                            }}
                        >
                            {[ ...Array(company.shareCount).keys()].map((item,index) =>
                                <MaterialIcon key={index} icon='BusinessIcon' className='businessIcon'/> 
                            )}
                        </div>
                        <div className='shareExampleInput'>
                            <label>Shares Outstanding: </label>
                            <h3 className='shareExampleNumber'>{company.shareCount}pcs</h3>   
                        </div>
                        <input 
                            onChange={(e)=>shareCountHandler(e)}
                            type='range'
                            min={10}
                            max={100}
                            value={company.shareCount}
                        /> 
                        <p>Number of shares doesn't affect the market cap. Just like pizza the company can be divided in the 4 or 8 pieces but the total size doesn't grow</p>
                    </div>
                    <div className='shareExample'>
                        <h2>Market Cap</h2>
                        <div className='companyContainer'
                            style={{transform:`scale(${(company.sharePrice*company.shareCount)/75})`}}
                        >
                        <MaterialIcon icon='BusinessIcon' className='businessIcon'/> 
                        </div>
                        <h3 className='shareExampleNumber'>
                            {(company.sharePrice*company.shareCount).toFixed(0)}$
                        </h3>
                    </div>
                </div>            
            
            } 
        </div>
    )
}








function ArticleTest({article}){
    const [articleSubNav, setArticleSubNav] = useState(new SubArticleNav(['Practise','Exercise']))
    return(
        <div  id={article.articleId} className='articleContainer'>
            <ArticleHeader 
                header={article.name} 
                articleSubNav={articleSubNav} 
                setArticleSubNav={setArticleSubNav}
            />

        </div>
    )
}