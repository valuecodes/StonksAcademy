import React from 'react'
import './Section.css'
import SectionNav from '../Section/SectionNav'

export default function SectionHeader({header,sectionNav,setSectionNav}) {
    return (
        <div className='sectionHeader'>
            <h2>{header}</h2>
            {sectionNav&&
                <SectionNav sectionNav={sectionNav} setSectionNav={setSectionNav}/>
            }
        </div>
    )
}
