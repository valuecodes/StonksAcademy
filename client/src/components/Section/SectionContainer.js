import React,{useState,useEffect} from 'react'
import SectionHeader from './SectionHeader'
import SectionNav from '../../utils/sectionNav';
import SwipeableViews from "react-swipeable-views";

export default function SectionContainer({section,sectionComponents,completeSection,moveTo,course}) {

    const [sectionNav, setSectionNav] = useState(new SectionNav([]))

    useEffect(() => {
        let newSectionNav = new SectionNav(sectionComponents)
        setSectionNav({...newSectionNav,current:0,last:0})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let components = []
    let props = []

    sectionComponents.forEach(item =>{
        let Article = item.article
        components.push(Article)
        props.push(item.props)
    })
    
    const changePageHandler = (newIndex)=>{
        console.log(sectionNav.current)
        const last = sectionNav.current
        setSectionNav({...sectionNav,current:newIndex,last})
    }

    return (
        <div id={section.sectionId} className='sectionContainer'>
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
                className='swipeableContainer'
            >
            {components.map((Article,index) =>
                <div key={index} 
                className={`sectionContentContainer ${(sectionNav.current === index || sectionNav.last === index)?'active':'notVisible'}`}
                >
                    {(course.current===section.id||course.last===section.id)&&  
                        (sectionNav.current === index || sectionNav.last === index)&&
                        <Article 
                            {...props[index]}
                            moveTo={moveTo}
                            section={section}
                            completeSection={completeSection}
                            className='testing'
                        />
                        
                    }
                </div>
            )}  
            </SwipeableViews>          
        </div>
    )
}
