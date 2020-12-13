export default function SectionNav(sectionComponents){
    
    const createArticlePages=(sectionComponents)=>{
        return sectionComponents.map((item,index) => {
            return{
                name:item.name,
                id:index,
            }
        })
    }
    
    return{
        current:1,
        articlePages: createArticlePages(sectionComponents),
    }
}