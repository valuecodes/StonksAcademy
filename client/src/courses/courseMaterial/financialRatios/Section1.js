import React, { useState } from 'react'
import { Card } from '@material-ui/core'
import TextList from '../../../components/Article/TextList'
import { ListSmall } from '../../../components/Other/Lists'
import { InputSlider } from '../../../components/Other/Sliders'
import { TimelineList } from '../../../components/Other/Timeline'
import SectionContainer from '../../../components/Section/SectionContainer'
import TextField from '@material-ui/core/TextField';
import ResultCard from '../../../components/Example/ResultCard'

export default function PriceRatios(props) {
    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'PE-Ratio',article:PERatio}
    ]
    
    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function PERatio(){

    const [pe, setPE] = useState({
        sharePrice:80,
        eps:4,
        pe:20,
        yield:5,
    })

    function changeInputHandler(e,value,name){
        const peCopy = {...pe}
        peCopy[name]=+value
        peCopy.pe = +(peCopy.sharePrice / peCopy.eps).toFixed(1)
        peCopy.yield = ((peCopy.eps / peCopy.sharePrice)*100).toFixed(1)
        setPE(peCopy)
    }

    const textListContent=[
        {
            text:"Price to Earnings ratio also known as PE-Ratio is one the most used ratios to value a business. It is the relationship between a company's stock price and EPS",
            formula:'PE = Share price / Earnings per Share'
        },
        {
            header:'Pros and Cons',
            prosAndCons:{
                pros:['Easy to Calculate','Quick estimation of the expexted return','Helps at comparing diffent companies'],
                cons:['Is based on the past earnings','Can be manipulated by accounting practises',"Doesn't tell anything about debt/cash"]
            }
        },
    ]

    return(
        <div className='sectionGrid3'>
            <div>
                <h2>PE-ratio</h2>
                <TextList content={textListContent}/>
            </div>
            <div>
                <ul className='shareInputs'>
                    <li>
                        <h2>Share Price</h2>
                        <div className='sharePriceInput'>
                            <TextField
                                onChange={(e,value)=>changeInputHandler(e,e.target.value,'sharePrice')} 
                                className='shareInput' 
                                id="standard-basic" 
                                label="" 
                                type="number"
                                name='sharePrice'
                                value={pe.sharePrice}
                            />
                            <p>$</p>
                            <InputSlider 
                                onChange={changeInputHandler}
                                value={pe.sharePrice}
                                max={150}
                                min={1}
                                step={1}
                                name='sharePrice'
                                className='shareInputSlider' 
                            />
                        </div>                    
                    </li>
                    <li>
                        <h2>EPS</h2>
                        <div className='sharePriceInput'>
                            <TextField 
                                onChange={(e,value)=>changeInputHandler(e,e.target.value,'eps')} 
                                className='shareInput'
                                id="standard-basic" label="" type="number"
                                name='eps'
                                value={pe.eps}
                            />     
                            <p></p>
                            <InputSlider
                                onChange={changeInputHandler}
                                value={pe.eps}
                                max={100}
                                min={-10}
                                step={1}
                                name='eps'
                                className='shareInputSlider' 
                            />
                        </div>
                    </li>
                </ul>                
            </div>

            <div>
                <ResultCard 
                    header={'PE-ratio'} 
                    value={pe.pe} 
                />
                <ResultCard 
                    header={'Earnings Yield'} 
                    value={`${pe.yield}%`} 
                />
            </div>
        </div>
    )
}

function OverView(){

    const accordion=[
        {header:'Price to Earnings ratio',icon:'MonetizationOnIcon',text:'Topline\nCompany total sales'},
        {header:'Price to Book value',icon:'AccountBalanceIcon',text:'Topline\nCompany total sales'},
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