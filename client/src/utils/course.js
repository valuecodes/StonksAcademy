export function Course(courseContent,userInfo=null){

    const startingArticle = 'start'

    const createArticles=(courseContent,userInfo)=>{
        let completedArticles = userInfo ? userInfo.completedArticles : []
        return courseContent.articles.map((article,index) => {
            let completedArticle = completedArticles
                .find(item => item.articleId===getArticleId(index))
            return{
                ...article,
                course:courseContent.name,
                id:index,
                name:article.name,
                completed:completedArticle?true:false,
                visited:false,
                articleId: getArticleId(index),
                current: startingArticle,
                score:completedArticle?completedArticle.score:null,
                component:article.component
            }})
    }

    const navigate = (direction,status,navigation,setCourse) => {
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
            setCourse({...navigation,current:current})
        }
    }

    const complete = (id,score,navigation,setCourse) => {
        const articleIndex = navigation.articles.findIndex(item => item.id===id)
        const navCopy={...navigation}
        navCopy.articles[articleIndex].completed=true
        navCopy.articles[articleIndex].score=score
        setCourse(navCopy)
        return navCopy.articles[articleIndex]
    }

    const getArticleId = (index)=>{
        return courseContent.name+index
    }
    
    function init(courseContent,userInfo){
        return createArticles(courseContent,userInfo)
    }

    return{
        current:startingArticle,
        articles: createArticles(courseContent,userInfo),
        init,
        navigate,
        complete,
    }
}