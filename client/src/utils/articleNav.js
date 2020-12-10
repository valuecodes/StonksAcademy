export function ArticleNav(section,testing=false){

    const startingArticle = 'start'

    const createArticles=(section,userInfo)=>{
        let completedArticles = userInfo ? userInfo.completedArticles : []
        return section.articles.map((article,index) => {
            let completedArticle = completedArticles
                .find(item => item.articleId===getArticleId(index))
            return{
                ...article,
                section:section.name,
                id:index,
                completed:completedArticle?true:false,
                visited:false,
                articleId: getArticleId(index),
                current: startingArticle,
                score:completedArticle?completedArticle.score:null
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
        setNavigation(navCopy)
        return navCopy.articles[articleIndex]
    }

    const getArticleId = (index)=>{
        return section.name+index
    }
    
    function init(section,userInfo){
        return createArticles(section,userInfo)
    }

    return{
        current:startingArticle,
        articles: createArticles(section),
        init,
        navigate,
        complete,
    }
}