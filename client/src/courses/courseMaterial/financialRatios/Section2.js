import React,{useState} from 'react'
import TextList from '../../../components/Article/TextList'
import { ListSmall } from '../../../components/Other/Lists'
import { TimelineList } from '../../../components/Other/Timeline'
import SectionContainer from '../../../components/Section/SectionContainer'
import { Card } from '@material-ui/core'
import MaterialIcon from '../../../components/Other/MaterialIcon'
import TextField from '@material-ui/core/TextField';
import { InputSlider } from '../../../components/Other/Sliders'
import ResultCard from '../../../components/Example/ResultCard'

export default function DebtRatios(props) {

    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'Current Ratio',article:CurrentRatio}
    ]

    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function CurrentRatio(){

    const [currentRatio, setCurrentRatio] = useState({
        sharePrice:60,
        currentAssets:4,
        currentLiabilities:15,
        currentRatio:6.7,
    })

    function changeInputHandler(e,value,name){
        const currentRatioCopy = {...currentRatio}
        currentRatioCopy[name]=+value
        currentRatioCopy.currentRatio = +(currentRatioCopy.currentAssets / currentRatioCopy.currentLiabilities).toFixed(1)
        // currentRatioCopy.yield = ((currentRatioCopy.eps / currentRatioCopy.sharePrice)*100).toFixed(1)
        setCurrentRatio(currentRatioCopy)
    }

    const textListContent=[
        {
            text:"Current ratio is one of the most important debt ratios. It indicates how well company can pay its current liabilities from the current assets. Ratio higher than 1 indicates company can cover it's short term debt obligations from the current assets.",
            formula:'Current Ratio = Current Assets / Current Liabilities'
        },
        {
            header:'Pros and Cons',
            prosAndCons:{
                pros:['Easy to understand and calculate','Quick estimation of the company financial situation'],
                cons:["Doesn't provide information about cash flow","Takes account company inventory which valuation method may change"]
            }
        },
    ]

    const handleGetColor = (ratio) => {
        if(ratio>=2) return 'var(--positive-color)'
        if(ratio>=1) return 'var(--neutral-color)'
        if(ratio<1) return 'var(--negative-color)'
        
    }

    return(
        <div className='sectionGrid3'>
            <div>
                <h2>Current Ratio</h2>
                <TextList content={textListContent}/>
            </div>
            <Card className='shareInputCard'>
                <ul className='shareInputs'>
                    <li>
                        <h2><MaterialIcon className='shareInputIcon' icon='MoneyIcon'/>Current Assets</h2>
                        <div className='sharePriceInput'>
                            <TextField
                                onChange={(e,value)=>changeInputHandler(e,e.target.value,'currentAssets')} 
                                className='shareInput' 
                                id="standard-basic" 
                                label="" 
                                type="number"
                                name='currentAssets'
                                value={currentRatio.currentAssets}
                            />
                            <p>$</p>
                            <InputSlider 
                                onChange={changeInputHandler}
                                value={currentRatio.currentAssets}
                                max={150}
                                min={1}
                                step={1}
                                name='currentAssets'
                                className='shareInputSlider' 
                            />
                        </div>                    
                    </li>
                    <li>
                        <h2><MaterialIcon className='shareInputIcon' icon='MoneyOffIcon'/>Current Liabilities</h2>
                        <div className='sharePriceInput'>
                            <TextField 
                                onChange={(e,value)=>changeInputHandler(e,e.target.value,'currentLiabilities')} 
                                className='shareInput'
                                id="standard-basic" label="" type="number"
                                name='eps'
                                value={currentRatio.currentLiabilities}
                            />     
                            <p></p>
                            <InputSlider
                                onChange={changeInputHandler}
                                value={currentRatio.currentLiabilities}
                                max={100}
                                min={-10}
                                step={1}
                                name='currentLiabilities'
                                className='shareInputSlider' 
                            />
                        </div>
                    </li>
                </ul>                
            </Card>
            <div>
                <ResultCard 
                    header={'Current Ratio'} 
                    value={currentRatio.currentRatio} 
                    color={handleGetColor(currentRatio.currentRatio)}
                    tooltip={'Current Ratio level:\n\n> 2\tGood\n1-2\tNeutral\n< 1\tBad'}
                />
            </div>
        </div>
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