import React,{useState,useEffect} from 'react'
import SectionHeader from './SectionHeader'
import SectionNav from '../../utils/sectionNav';

export default function SectionContainer({section,sectionComponents,completeArticle}) {

    const [sectionNav, setSectionNav] = useState(new SectionNav([]))

    useEffect(() => {
        let newSectionNav = new SectionNav(sectionComponents)
        setSectionNav(newSectionNav)
    }, [])

    let components = []
    let props = []

    sectionComponents.forEach(item =>{
        let Article = item.article
        components.push(Article)
        props.push(item.props)
    })
    
    return (
        <>
            <SectionHeader 
                header={section.name} 
                sectionNav={sectionNav} 
                setSectionNav={setSectionNav}
            />
            <div className='sectionArticles' style={sectionNav.subPageStyle(sectionNav)}>
                {components.map((Article,index) =>
                    <Article 
                        key={index}
                        {...props[index]}
                    />
                )}                
            </div>
        </>
    )
}

const createArticle=(items)=>{
    return items.map((item,index) => {
        return{
            name:item,
            id:index
        }
    })
}
