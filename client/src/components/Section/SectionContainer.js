import React,{useState,useEffect} from 'react'
import SectionHeader from './SectionHeader'
import SectionNav from '../../utils/sectionNav';
import SwipeableViews from "react-swipeable-views";

export default function SectionContainer({section,sectionComponents,completeSection,moveTo}) {

    const [sectionNav, setSectionNav] = useState(new SectionNav([]))

    useEffect(() => {
        let newSectionNav = new SectionNav(sectionComponents)
        setSectionNav({...newSectionNav,current:0})
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
        setSectionNav({...sectionNav,current:newIndex})
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
                    <div key={index} className='sectionContentContainer'>
                        <Article 
                            {...props[index]}
                            moveTo={moveTo}
                            section={section}
                            completeSection={completeSection}
                        />                            
                    </div>

                )}      
            </SwipeableViews>          
        </div>
    )
}
