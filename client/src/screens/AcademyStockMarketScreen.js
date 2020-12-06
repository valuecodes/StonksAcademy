import React,{useState} from 'react'
import { ArticleNav } from '../utils/articleNav';
import SectionHeader from '../components/SectionHeader'
import ArticleSubNav from '../components/Article/ArticleSubNav'
import { SubArticleNav } from '../utils/subArticleNav'
import ArticleHeader from '../components/Article/ArticleHeader'
import ArticleNavigation from '../components/Article/ArticleNavigation'
import ArticleTableOfContent from '../components/Article/ArticleTableOfContent'
import ArticleRecap from '../components/Article/ArticleRecap'
import { camelCaseToString } from '../utils/utils';

const articleContent=[
    {
        name:'Assets And Liabilities',
        desc:'What is the difference between asset and liability',
        articleTerms:['Asset','Liability']
    },
    {
        name:'Value Investing And Intrinsic Value',
        desc:'What is the difference market price and real value of asset',
        articleTerms:['Value investing','Intrinsic value']
    },
    {
        name:'Investing categories',
        desc:'Different investing categories',
        articleTerms:['Investment Risk Ladder','Stock','Bond']
    },
]

export default function AcademyStockMarketScreen() {

    const [navigation, setNavigation] = useState(new ArticleNav(articleContent,true))

    const handleNavigate=(direction,status)=>{
        navigation.navigate(direction,status,navigation,setNavigation)
    }

    const completeArticleHandler=(id)=>{
        navigation.complete(id,navigation,setNavigation)
    }

    return (
        <div className='academySection' >
            <SectionHeader 
                header={'Stock Market'} 
            /> 
            <div className='academyArticles' id={'academyArticles'} >
                <ArticleTableOfContent navigation={navigation} moveTo={handleNavigate}/>
                <ArticleTest article={navigation.articles[0]}/>
                <ArticleTest article={navigation.articles[1]}/>
                <ArticleTest article={navigation.articles[2]}/>
                <ArticleRecap navigation={navigation}/>
            </div>
            <ArticleNavigation moveTo={handleNavigate} navigation={navigation}/> 
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