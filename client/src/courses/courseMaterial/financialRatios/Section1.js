import { Card } from '@material-ui/core'
import React from 'react'
import TextList from '../../../components/Article/TextList'
import { ListSmall } from '../../../components/Other/Lists'
import { TimelineList } from '../../../components/Other/Timeline'
import SectionContainer from '../../../components/Section/SectionContainer'

export default function PriceRatios(props) {
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
        {header:'Price to Earnings ratio',icon:'MoneyIcon',text:'Topline\nCompany total sales'},
        {header:'Price to Book value',icon:'AccountBalanceWalletIcon',text:'Topline\nCompany total sales'},
        {header:'Dividend Yield',icon:'ShowChartIcon',text:'Topline\nCompany total sales'},
    ]

    return(
        <div className='sectionGrid3'>
            <div>
                <TextList
                    content={[
                        {header:'Definition',text:"Price Ratios measure company current valuation based on the share price."},
                        {header:'Ratios',text:`Common used price ratios:`}
                    ]}
                /> 
                <ListSmall list={accordion}/>
            </div>
            <div className='paddingTop'>
                <TimelineList list={['Share Price','Earnings','Equity','Dividend']}/>
            </div>
            <Card className='padding'>
                <TextList
                    content={[
                        {header:'Use Cases',list:['Company valuation','Share price indicator','Peer and sector comparison','Year over Year and Quarter over Quarter comparison']},
                    ]}
                />                
            </Card>
        </div>
    )
}