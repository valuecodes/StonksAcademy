export default function SectionNav(sectionComponents){
    
    const createArticlePages=(sectionComponents)=>{
        return sectionComponents.map((item,index) => {
            return{
                name:item.name,
                id:index,
            }
        })
    }

    const subPageStyle = (articleSubNav) => {
        return {marginLeft:`${articleSubNav.current*-100}%`}
    }

    return{
        current:0,
        articlePages: createArticlePages(sectionComponents),
        subPageStyle
    }
}