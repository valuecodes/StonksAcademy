import React, { useState } from 'react'
import { Card } from '@material-ui/core'
import TextList from '../../../components/Article/TextList'
import { ListSmall } from '../../../components/Other/Lists'
import { InputSlider } from '../../../components/Other/Sliders'
import { TimelineList } from '../../../components/Other/Timeline'
import SectionContainer from '../../../components/Section/SectionContainer'
import TextField from '@material-ui/core/TextField';
import ResultCard from '../../../components/Example/ResultCard'
import MaterialIcon from '../../../components/Other/MaterialIcon'

export default function PriceRatios(props) {
    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'PE-Ratio',article: PERatio},
        {name:'PB-Ratio',article: PBRatio},
        {name:'Dividend Yield',article: DividendYield},
    ]
    
    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function DividendYield(){

    const [div, setDiv] = useState({
        sharePrice:150,
        dividend:7,
        eps:10,
        yield:4.7,
        payout:70
    })

    function changeInputHandler(e,value,name){
        const divCopy = {...div}
        divCopy[name]=+value
        divCopy.yield = +((divCopy.dividend / divCopy.sharePrice)*100).toFixed(1)
        divCopy.payout = +((divCopy.dividend / divCopy.eps)*100).toFixed(1)
        setDiv(divCopy)
    }

    const textListContent=[
        {
            text:"Dividend Yield is the percentage that company pays dividend to shareholders related to the current price.",
            formula:'Dividend Yield = Share price / Dividend per Share'
        },
        {
            header:'Payout ratio',
            text:'How much dividend is paid from the eps. If the payout ratio is more than 100%, company is paying more than it is earning and dividend cut might be coming.',
            formula:'Payout Ratio = Dividend per Share / Earnings per Share'
        },
        {
            header:'Pros and Cons',
            prosAndCons:{
                pros:['Simple estimation of the future returns','Payout ratio helps figuring out how safe the dividend is'],
                cons:[]
            },
        },
    ]

    const handleGetYieldColor = (ratio) => {
        if(ratio>=6) return 'var(--positive-color)'
        if(ratio>3) return 'var(--neutral-color)'
        if(ratio>0) return 'var(--negative-color)'
    }
    const handleGetColor = (ratio) => {
        if(ratio<=50) return 'var(--positive-color)'
        if(ratio<=100) return 'var(--neutral-color)'
        if(ratio>100) return 'var(--negative-color)'
    }

    return(
        <div className='sectionGrid3'>
            <div>
                <h2>Dividend Yield</h2>
                <TextList content={textListContent}/>
            </div>
            <Card className='shareInputCard'>
                <ul className='shareInputs'>
                    <li>
                        <h2><MaterialIcon className='shareInputIcon' icon='ShowChartIcon'/> Share Price</h2>
                        <div className='sharePriceInput'>
                            <TextField
                                onChange={(e,value)=>changeInputHandler(e,e.target.value,'sharePrice')} 
                                className='shareInput' 
                                id="standard-basic" 
                                label="" 
                                type="number"
                                name='sharePrice'
                                value={div.sharePrice}
                            />
                            <p>$</p>
                            <InputSlider 
                                onChange={changeInputHandler}
                                value={div.sharePrice}
                                max={250}
                                min={1}
                                step={1}
                                name='sharePrice'
                                className='shareInputSlider' 
                            />
                        </div>                    
                    </li>
                    <li>
                        <h2><MaterialIcon className='shareInputIcon' icon='MonetizationOnIcon'/>Dividend</h2>
                        <div className='sharePriceInput'>
                            <TextField 
                                onChange={(e,value)=>changeInputHandler(e,e.target.value,'dividend')} 
                                className='shareInput'
                                id="standard-basic" label="" type="number"
                                name='dividend'
                                value={div.dividend}
                            />     
                            <p></p>
                            <InputSlider
                                onChange={changeInputHandler}
                                value={div.dividend}
                                max={30}
                                min={1}
                                step={0.5}
                                name='dividend'
                                className='shareInputSlider' 
                            />
                        </div>
                    </li>
                    <li>
                        <h2><MaterialIcon className='shareInputIcon' icon='MoneyIcon'/>EPS</h2>
                        <div className='sharePriceInput'>
                            <TextField 
                                onChange={(e,value)=>changeInputHandler(e,e.target.value,'eps')} 
                                className='shareInput'
                                id="standard-basic" label="" type="number"
                                name='eps'
                                value={div.eps}
                            />     
                            <p></p>
                            <InputSlider
                                onChange={changeInputHandler}
                                value={div.eps}
                                max={20}
                                min={1}
                                step={0.5}
                                name='eps'
                                className='shareInputSlider' 
                            />
                        </div>
                    </li>
                </ul>                
            </Card>

            <div>
                <ResultCard 
                    header={'Dividend Yield'} 
                    value={div.yield+'%'} 
                    color={handleGetYieldColor(div.yield)}
                />
                <ResultCard 
                    header={'Payout Ratio'} 
                    value={div.payout+'%'} 
                    color={handleGetColor(div.payout)}
                />
            </div>
        </div>
    )
}

function PBRatio(){

    const [pb, setPB] = useState({
        sharePrice:60,
        bvps:60,
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
            <Card className='shareInputCard'>
                <ul className='shareInputs'>
                    <li>
                        <h2><MaterialIcon className='shareInputIcon' icon='ShowChartIcon'/> Share Price</h2>
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
                        <h2><MaterialIcon className='shareInputIcon' icon='AccountBalanceIcon'/> BVPS</h2>
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
                                min={1}
                                step={1}
                                name='bvps'
                                className='shareInputSlider' 
                            />
                        </div>
                    </li>
                </ul>                
            </Card>

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
        sharePrice:60,
        eps:4,
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
            <Card className='shareInputCard'>
                <ul className='shareInputs'>
                    <li>
                        <h2><MaterialIcon className='shareInputIcon' icon='ShowChartIcon'/>Share Price</h2>
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
                        <h2><MaterialIcon className='shareInputIcon' icon='MonetizationOnIcon2'/>EPS</h2>
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
            </Card>

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