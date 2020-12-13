import React,{useState,useEffect} from 'react'
import SectionHeader from './SectionHeader'
import SectionNav from '../../utils/sectionNav';
import SwipeableViews from "react-swipeable-views";

export default function SectionContainer({section,sectionComponents,completeArticle}) {

    const [sectionNav, setSectionNav] = useState(new SectionNav([]))

    useEffect(() => {
        let newSectionNav = new SectionNav(sectionComponents)
        setSectionNav({...newSectionNav,current:0})
    }, [])

    let components = []
    let props = []

    sectionComponents.forEach(item =>{
        let Article = item.article
        components.push(Article)
        props.push(item.props)
    })
    

    const changePageHandler = (newIndex)=>{
        setSectionNav({...sectionNav,current:newIndex})
    }

    return (
        <>
            <SectionHeader 
                header={section.name} 
                sectionNav={sectionNav} 
                setSectionNav={setSectionNav}
            />
                <SwipeableViews
                    onChangeIndex={e => changePageHandler(e)}
                    resistance
                    // animateHeight
                    index={sectionNav.current}
                    className='teste'
                >
                    {components.map((Article,index) =>
                        <div className='sectionContentContainer'>
                            <Article 
                                key={index}
                                {...props[index]}
                            />                            
                        </div>

                    )}      
                </SwipeableViews>          
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
