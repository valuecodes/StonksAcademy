export function ArticleNav(items,testing=false){

    const createArticles=(items)=>{
        return items.map((item,index) => {return{
            name:item,
            id:index,
            completed:testing,
            visited:false,
            articleId: 'article.'+index,
            current:0,
        }})
    }

    const navigate = (direction,status,navigation,setNavigation) => {
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
            navigation.articles.forEach(item => {
                item.current=current
            })
            setNavigation({...navigation,current:current})
        }
    }

    const complete = (id,navigation,setNavigation) => {
        const articleIndex = navigation.articles.findIndex(item => item.articleId===id)
        const navCopy={...navigation}
        navCopy.articles[articleIndex].completed=true
        setNavigation(navCopy)
    }

    return{
        current:0,
        articles:createArticles(items),
        navigate,
        complete,
    }
}