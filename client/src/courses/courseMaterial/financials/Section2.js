import { Card } from '@material-ui/core'
import React from 'react'
import TextList from '../../../components/Article/TextList'
import { ListSmall } from '../../../components/Other/Lists'
import { TimelineList } from '../../../components/Other/Timeline'
import SectionContainer from '../../../components/Section/SectionContainer'

export default function BalanceSheet(props) {
    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'Structure',article:Structure}
    ]
    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function Structure(){
    return(
        <div className='sectionGrid2'>
            <div>
                <h3>Balance Sheet Structure</h3>
            </div>
        </div>
    )
}

function OverView(){
    
    const accordion=[
        {header:'Assets',icon:'AccountBalanceIcon'},
        {header:'Liabilities',icon:'MoneyOffIcon'},
        {header:"Shareholder's Equity",icon:'AssessmentIcon'},
    ]

    return(
        <div className='sectionGrid3'>
            <div>
                <TextList
                    content={[
                        {header:'Definition',text:"Balance sheet is used for reporting company company's assets, liabilities and shareholder equity. It is a snapshot of company's finances at a speficic date and represents what the company owns and owes."},
                        {header:'Components',text:`Balance sheet consist of 4 main components:`}
                    ]}
                /> 
                <ListSmall list={accordion}/>
            </div>
            <div className='paddingTop'>
                <TimelineList list={['Assets','Liabilities',"Shareholder's Equity"]}/>
            </div>
            <Card className='padding'>
                <TextList
                    content={[
                        {header:'Use Cases',list:['Helps understanding the current financial health of the company',"Snapshot of the company's assets and liabilities",'Shows if the company has positive net worth','Shows if the company has enough cash and short tem assets to cover its obligations','Helps at comparing business debt levels to peers']},
                    ]}
                />                
            </Card>
        </div>
    )
}
