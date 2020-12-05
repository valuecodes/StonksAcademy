export function SubArticleNav(items,setArticleSubNav){

    const createSubPages=(items)=>{
        return items.map((item,index) => {
            return{
                name:item,
                id:index
            }
        })
    }

    const subPageStyle = (articleSubNav) => {
        return {marginLeft:`${articleSubNav.current*-100}%`}
    }

    return{
        current:0,
        subpages: createSubPages(items),
        subPageStyle
    }
}