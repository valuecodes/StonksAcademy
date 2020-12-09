export function ArticleNav(section,testing=false,startfrom){

    const startingArticle = 'start'

    const createArticles=(section)=>{
        return section.articles.map((article,index) => {return{
            ...article,
            section:section.name,
            id:index,
            completed:testing,
            visited:false,
            articleId: getArticleId(index),
            current: startingArticle,
            score:null
        }})
    }

    const navigate = (direction,status,navigation,setNavigation) => {
        if(status==='unavailable') return
        let current = direction
        let element = null

        if(current==='start'){
            element = document.getElementById('tableOfContent')
        }else if(current==='recap'){
            element = document.getElementById('recap')            
        }else{
            element = document.getElementById(getArticleId(current))
        }

        if(element){
            element.scrollIntoView({behavior: "smooth"});
            navigation.articles.forEach(item => {
                item.current=current
            })
            setNavigation({...navigation,current:current})
        }
    }

    const complete = (id,score,navigation,setNavigation) => {
        const articleIndex = navigation.articles.findIndex(item => item.id===id)
        const navCopy={...navigation}
        navCopy.articles[articleIndex].completed=true
        navCopy.articles[articleIndex].score=score
        console.log(score,navCopy.articles[articleIndex])
        setNavigation(navCopy)
    }

    const getArticleId = (index)=>{
        return section.name+index
    }

    return{
        current:startingArticle,
        articles:createArticles(section),
        navigate,
        complete,
    }
}