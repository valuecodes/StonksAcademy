import React from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'

export default function CashFlowStatement(props) {
    const sectionComponents = [
        // {name:'OverView',article: OverView},
    ]
    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}