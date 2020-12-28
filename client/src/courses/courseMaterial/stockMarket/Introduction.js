import React from 'react'
import { TimelineList } from '../../../components/Other/Timeline'

export default function Introduction() {
    return (
        <>
            <p className='newLine'>In this course you will learn about the basic stock market vocabulary, financial ratios and investing categories. You will also learn about stock exhanges and indexes</p>
            <TimelineList list={['Stock','Index','Stock Market']}/>
        </>
    )
}
