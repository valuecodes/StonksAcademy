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
import ExerciseQuiz from '../../../components/Exercise/ExcersiseQuiz'

export default function DebtRatios(props) {

    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'Current Ratio',article:CurrentRatio},
        {name:'Debt to Equity',article:DebtToEquity},
        {name:'Exercise',article: ExerciseQuiz}
    ]

    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function DebtToEquity(){

    const [debtToEquity, setDebtToEquity] = useState({
        totalLiabilities:50,
        shareholdersEquity:30,
        debtToEquity:1.7,
    })

    function changeInputHandler(e,value,name){
        const debtToEquityCopy = {...debtToEquity}
        debtToEquityCopy[name]=+value
        debtToEquityCopy.debtToEquity = +(debtToEquityCopy.totalLiabilities / debtToEquityCopy.shareholdersEquity).toFixed(1)
        setDebtToEquity(debtToEquityCopy)
    }

    const textListContent=[
        {
            text:"Debt to Eqyity is used to evaluate company's financial leverage. It calculates the weight of total debt against total shareholder's equity. If debt to equity has risen with the growth of the company, the company may be funding the growth with debt.",
            formula:"Debt to Equity = Total Liabilities / Total Shareholder's equity"
        },
        {
            header:'Pros and Cons',
            prosAndCons:{
                pros:['Comparison between companies within the same sector'],
                cons:['Difficult to compare between different sectors','Depends on the nature of the business and industry']
            }
        },
    ]

    const handleGetColor = (ratio) => {
        if(ratio<=1) return 'var(--positive-color)'
        if(ratio<=2) return 'var(--neutral-color)'
        if(ratio>2) return 'var(--negative-color)'
    }

    return(
        <div className='sectionGrid3'>
            <div>
                <h2>Debt to Equity</h2>
                <TextList content={textListContent}/>
            </div>
            <Card className='shareInputCard'>
                <ul className='shareInputs'>
                    <li>
                        <h2><MaterialIcon className='shareInputIcon' icon='MoneyIcon'/>Total Liabilities</h2>
                        <div className='sharePriceInput'>
                            <TextField
                                onChange={(e,value)=>changeInputHandler(e,e.target.value,'totalLiabilities')} 
                                className='shareInput' 
                                id="standard-basic" 
                                label="" 
                                type="number"
                                name='totalLiabilities'
                                value={debtToEquity.totalLiabilities}
                            />
                            <p>$</p>
                            <InputSlider 
                                onChange={changeInputHandler}
                                value={debtToEquity.totalLiabilities}
                                max={150}
                                min={1}
                                step={1}
                                name='totalLiabilities'
                                className='shareInputSlider' 
                            />
                        </div>                    
                    </li>
                    <li>
                        <h2><MaterialIcon className='shareInputIcon' icon='MoneyOffIcon'/>Shareholder's Equity</h2>
                        <div className='sharePriceInput'>
                            <TextField 
                                onChange={(e,value)=>changeInputHandler(e,e.target.value,'shareholdersEquity')} 
                                className='shareInput'
                                id="standard-basic" label="" type="number"
                                name='eps'
                                value={debtToEquity.shareholdersEquity}
                            />     
                            <p></p>
                            <InputSlider
                                onChange={changeInputHandler}
                                value={debtToEquity.shareholdersEquity}
                                max={100}
                                min={1}
                                step={1}
                                name='shareholdersEquity'
                                className='shareInputSlider' 
                            />
                        </div>
                    </li>
                </ul>                
            </Card>
            <div>
                <ResultCard 
                    header={'Debt to Equity'} 
                    value={debtToEquity.debtToEquity} 
                    color={handleGetColor(debtToEquity.debtToEquity)}
                />
            </div>
        </div>
    )
}

function CurrentRatio(){

    const [currentRatio, setCurrentRatio] = useState({
        currentAssets:60,
        currentLiabilities:25,
        currentRatio:2.4,
    })

    function changeInputHandler(e,value,name){
        const currentRatioCopy = {...currentRatio}
        currentRatioCopy[name]=+value
        currentRatioCopy.currentRatio = +(currentRatioCopy.currentAssets / currentRatioCopy.currentLiabilities).toFixed(1)
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
                                min={1}
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