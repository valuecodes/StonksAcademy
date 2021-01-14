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
        {name:'PE-Ratio',article:PERatio},
        {name:'PB-Ratio',article:PBRatio},
    ]
    
    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function PBRatio(){

    const [pb, setPB] = useState({
        sharePrice:80,
        bvps:80,
        pb:1,
        liquid:100
    })

    function changeInputHandler(e,value,name){
        const pbCopy = {...pb}
        pbCopy[name]=+value
        pbCopy.pb = +(pbCopy.sharePrice / pbCopy.bvps).toFixed(1)
        pbCopy.liquid = ((pbCopy.bvps / pbCopy.sharePrice)*100).toFixed(1)
        setPB(pbCopy)
    }

    const textListContent=[
        {
            text:"Price to Book ratio also known as PB-Ratio is used to measure company book value to share price. Book value gives idea of the valuation based on the company equity",
            formula:'PB = Share price / Book Value per Share'
        },
        {
            header:'Pros and Cons',
            prosAndCons:{
                pros:['Is more stable than PE','Works with negative earnings','Can be useful with companies going out of business'],
                cons:['Works only with asset heavy sectors',"Doesn't work asset light sectors like tech ","Doesn't tell anything about debt/cash"]
            },
        },
    ]

    const handleGetColor = (ratio) => {
        if(ratio<=1) return 'var(--positive-color)'
        if(ratio<2) return 'var(--neutral-color)'
        if(ratio>=2) return 'var(--negative-color)'
    }

    return(
        <div className='sectionGrid3'>
            <div>
                <h2>PB-ratio</h2>
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
                                value={pb.sharePrice}
                            />
                            <p>$</p>
                            <InputSlider 
                                onChange={changeInputHandler}
                                value={pb.sharePrice}
                                max={150}
                                min={1}
                                step={1}
                                name='sharePrice'
                                className='shareInputSlider' 
                            />
                        </div>                    
                    </li>
                    <li>
                        <h2>BVPS</h2>
                        <div className='sharePriceInput'>
                            <TextField 
                                onChange={(e,value)=>changeInputHandler(e,e.target.value,'bvps')} 
                                className='shareInput'
                                id="standard-basic" label="" type="number"
                                name='bvps'
                                value={pb.bvps}
                            />     
                            <p></p>
                            <InputSlider
                                onChange={changeInputHandler}
                                value={pb.bvps}
                                max={200}
                                min={0}
                                step={1}
                                name='bvps'
                                className='shareInputSlider' 
                            />
                        </div>
                    </li>
                </ul>                
            </div>

            <div>
                <ResultCard 
                    header={'PB-ratio'} 
                    value={pb.pb} 
                    color={handleGetColor(pb.pb)}
                />
                <ResultCard 
                    header={'Liquidation value'} 
                    value={pb.liquid+'%'} 
                    color={handleGetColor(pb.pb)}
                    tooltip={`In case of company liquidation\nThis is how many percentage you would get back from the initial investment\n\nPB 1\t100%\nPB 2\t50% \nPB 0.5\t200%`}
                />
            </div>
        </div>
    )
}

function PERatio(){

    const [pe, setPE] = useState({
        sharePrice:120,
        eps:8,
        pe:15,
        yield:6.7,
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
                cons:['Is based on the past earnings','Can be manipulated by accounting practises',"Doesn't tell anything about debt/cash","Doesn't work with negative earnings"]
            }
        },
    ]

    const handleGetColor = (ratio) => {
        if(ratio>=25||ratio<0) return 'var(--negative-color)'
        if(ratio<=15) return 'var(--positive-color)'
        if(ratio<25) return 'var(--neutral-color)'
        
    }

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
                    color={handleGetColor(pe.pe)}
                />
                <ResultCard 
                    header={'Earnings Yield'} 
                    value={`${pe.yield}%`} 
                    color={handleGetColor(pe.pe)}
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