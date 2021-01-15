import React from 'react'
import TextList from '../../../components/Article/TextList'
import { ListSmall } from '../../../components/Other/Lists'
import { TimelineList } from '../../../components/Other/Timeline'
import SectionContainer from '../../../components/Section/SectionContainer'
import { Card } from '@material-ui/core'

export default function DebtRatios(props) {

    const sectionComponents = [
        {name:'OverView',article: OverView},
    ]

    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function OverView(){

    const accordion=[
        {header:'Quick Ratio',icon:'DoneIcon',text:'Topline\nCompany total sales'},
        {header:'Debt to Equity',icon:'BusinessIcon',text:'Topline\nCompany total sales'},
        {header:'Gearing',icon:'SettingsIcon',text:'Topline\nCompany total sales'},
    ]

    return(
        <div className='sectionGrid3'>
            <div>
                <TextList
                    content={[
                        {header:'Definition',text:"Debt ratios measure company debt levels and cash."},
                        {header:'Ratios',text:`Common used debt ratios:`}
                    ]}
                /> 
                <ListSmall list={accordion}/>
            </div>
            <div className='paddingTop'>
                <TimelineList list={['Assets','Liabilities','Debt','Cash']}/>
            </div>
            <Card className='padding'>
                <TextList
                    content={[
                        {header:'Use Cases',list:['Company financial health','Risk of bankruptcy','Leverage','Peer comparison']},
                    ]}
                />                
            </Card>
        </div>
    )
}