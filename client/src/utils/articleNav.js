export function ArticleNav(items,testing=false){

    const createArticles=(items)=>{
        return items.map((item,index) => {return{
            ...item,
            id:index,
            completed:testing,
            visited:false,
            articleId: 'article.'+index,
            current:'start',
        }})
    }

    const navigate = (direction,status,navigation,setNavigation) => {
        console.log(direction,status)
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

    const complete = (id,navigation,setNavigation) => {
        const articleIndex = navigation.articles.findIndex(item => item.articleId===id)
        const navCopy={...navigation}
        navCopy.articles[articleIndex].completed=true
        setNavigation(navCopy)
    }

    return{
        current:'start',
        articles:createArticles(items),
        navigate,
        complete,
    }
}