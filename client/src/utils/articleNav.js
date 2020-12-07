export function ArticleNav(items,testing=false,startfrom){

    const startingArticle = 'start'

    const createArticles=(items)=>{
        return items.map((item,index) => {return{
            ...item,
            id:index,
            completed:testing,
            visited:false,
            articleId: 'article.'+index,
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
            element = document.getElementById('article.'+current)
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
        console.log(score)
        setNavigation(navCopy)
    }

    return{
        current:startingArticle,
        articles:createArticles(items),
        navigate,
        complete,
    }
}