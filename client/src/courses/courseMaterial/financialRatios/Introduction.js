import React from 'react'
import { TimelineList } from '../../../components/Other/Timeline'

export default function Introduction() {
    return (
        <div className='introductionContent'>
            <p className='newLine'>In this course you will learn about the key financial ratios and stock valuation.</p>
            <TimelineList list={['Stock Price','Earnings','Valuation']}/>
        </div>
    )
}
