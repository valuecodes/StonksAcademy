import React from 'react'
import { TimelineList } from '../../../components/Other/Timeline'

export default function Introduction() {
    return (
        <div className='introductionContent'>
            <p className='newLine'>In this course you will learn about the key investing principles, how business works and what is value investing.</p>
            <TimelineList list={['Research','Invest','Reinvest']}/>
        </div>
    )
}
