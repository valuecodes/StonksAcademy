import React,{useState} from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import TextList from '../../../components/Article/TextList'
import MaterialIcon from '../../../components/MaterialIcon'
import ShareExample from '../../../components/Example/ShareExample'
import ExerciseQuiz from '../../../components/Exercise/ExcersiseQuiz'

export default function FinancialRatios1({section,completeSection,moveTo}) {

    const questions=[
        {
            question:'Company net income is 1000$ and it has 100 shares outstanding. What is the earnings per share',
            slider:{max:50,step:5,format:'$'},
            answer:10,
        },          
        {
            question:'Equity is the liquadation value of the company',
            options:['True','False'],           
            answer:'True',
        },          
        {
            question:'Company book value per share is 50$ and it has 20 shares outstanding. What is the equity of the company',
            slider:{max:1500,step:100,format:'$'},            
            answer:1000,
        },          
        {
            question:'Year and quarter are the most common timeperiods to measure financial ratios',
            options:['True','False'],           
            answer:'True',
        },          
        {
            question:'EPS is 50$ and there are 100 shares outstanding. How much is the net income',
            slider:{max:600,step:10,format:'pcs'},            
            answer:500,
        },          
    ]


    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'Earnings',article:Earnings},
        {name:'Equity',article:Equity},
        {name:'Exercise',article: ExerciseQuiz,props:{section,completeSection,questions}},
    ]

    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            section={section} 
            completeSection={completeSection}
            moveTo={moveTo}
        />
    )
}

function Equity(){

    const [inputs,setInputs] = useState({
        equity:600,
        shareCount:12,
        bvps:50,
    })

    const equityHandler = (e,value) =>{
        const bvps = +(value/inputs.shareCount).toFixed(1)
        setInputs({...inputs,equity:+value,bvps})
    }

    const shareCountHandler=(e,value)=>{
        const bvps = +(inputs.equity/value).toFixed(1)        
        setInputs({...inputs,shareCount:+value,bvps})
    }

    return(
        <div className='sectionGrid'>
            <div>
                <TextList
                    content={[
                        {
                            header:'Equity playground',
                            text:'One share is like the whole company in miniature size.'
                        },
                    ]}
                />
            </div>
            <div className='exampleGrid'>
                <ShareExample 
                    header={'Equity'}
                    icon={<MaterialIcon icon='AccountBalanceIcon' className='businessIcon'/> }
                    input={{onChange:equityHandler,min:100,max:1000,step:10,name:'Equity'}}
                    iconStyle={{transform:`scale(${inputs.equity/70})`}}
                    value={{number:inputs.equity,toFixed:2,format:'$'}}
                    showMore={'Equity = Total Assets - Total Liabilities'}
                />
                <ShareExample 
                    header={'Number Of shares'}
                    icon={[ ...Array(inputs.shareCount).keys()].map((item,index) =>
                        <MaterialIcon color={'red'} key={index} icon='AccountBalanceIcon' className='businessIcon'/> 
                    )}
                    input={{onChange:shareCountHandler,min:6,max:25,step:1,name:'Share Count'}}
                    iconStyle={{
                        transform:`scale(${(inputs.equity/70)/(inputs.shareCount*0.4)})`,
                        width:30+(inputs.shareCount)+'%'
                    }}
                    value={{number:inputs.shareCount,toFixed:0,format:'pcs'}}
                    showMore={'Number of shares the company has'}
                />
                <ShareExample 
                    header={'Book Value Per Share'}
                    icon={<MaterialIcon icon={'AccountBalanceIcon'} className='businessIcon'/> }
                    iconStyle={{
                        transform:`scale(${(inputs.equity/70)/(inputs.shareCount*0.4)})`,
                        width:30+(inputs.shareCount/2)+'%'
                    }}
                    value={{number:inputs.bvps,toFixed:2,format:'$'}}
                    showMore={'BVPS = Total Equity / Shares Outstanding'}
                />
            </div>
        </div>
    )
}

function Earnings(){

    const [inputs,setInputs] = useState({
        earnings:700,
        shareCount:9,
        eps:77.80,
    })

    const earningsHandler = (e,value) =>{
        const eps = +(value/inputs.shareCount).toFixed(1)
        setInputs({...inputs,earnings:+value,eps})
    }

    const shareCountHandler=(e,value)=>{
        const eps = +(inputs.earnings/value).toFixed(1)        
        setInputs({...inputs,shareCount:+value,eps})
    }

    return(
        <div className='sectionGrid'>
            <div>
            <TextList
                content={[
                    {
                        header:'Earnings playground',
                        text:'One share is like the whole company in miniature size.'
                    },
                ]}
            />
            </div>
            <div className='exampleGrid'>
                <ShareExample 
                    header={'Net Income'}
                    icon={<MaterialIcon icon='MonetizationOnIcon' className='businessIcon'/>}
                    input={{onChange:earningsHandler,min:100,max:1000,step:10,name:'Net Income:'}}
                    iconStyle={{transform:`scale(${inputs.earnings/70})`}}
                    value={{number:inputs.earnings,toFixed:2,format:'$'}}
                    showMore={'Money that company is making in 1 year or quarter'}
                />
                <ShareExample 
                    header={'Number Of shares'}
                    icon={[ ...Array(inputs.shareCount).keys()].map((item,index) =>
                        <MaterialIcon color={'red'} key={index} icon='MonetizationOnIcon' className='businessIcon'/> 
                    )}
                    input={{onChange:shareCountHandler,min:6,max:25,step:1,name:'Share count: '}}
                    iconStyle={{
                        transform:`scale(${(inputs.earnings/70)/(inputs.shareCount*0.4)})`,
                        width:30+(inputs.shareCount)+'%'
                    }}
                    value={{number:inputs.shareCount,toFixed:0,format:'pcs'}}
                    showMore={'Number of shares the company has'}
                />
                <ShareExample 
                    header={'Earnings Per Share'}
                    icon={
                        <MaterialIcon color={'red'} icon='MonetizationOnIcon' className='businessIcon'/> 
                    }
                    iconStyle={{
                        transform:`scale(${(inputs.earnings/70)/(inputs.shareCount*0.4)})`,
                        width:18+(inputs.shareCount)+'%'
                    }}
                    value={{number:inputs.eps,toFixed:2,format:'$'}}
                    showMore={'How much money the company is making per share'}
                />
            </div>
        </div>
    )
}


function OverView(){
    return(
        <div className='sectionGrid3'>
            <TextList
                className='gridItemWide'
                content={[
                    {
                        header:'Net Income',
                        text:'How much money the company is making profit in certain timeperiod. Usual timeperiod is 1 year or quarter (3-months).'
                    },
                    {
                        header:'EPS',
                        text:'Earning per represents how much money the company is making per share.',
                        formula:'EPS = Net Income / Shares Outstanding'
                    },
                    {
                        header:'Equity',
                        text:'Equity presents the total sum of company assets and liabilities. If company were to shutdown and sold all of its assets and paid all debt, this is how much it would be worth',
                        formula:'Equity = Total Assets - Total Liabilities'
                    },
                    {
                        header:'BVPS',
                        text:'Book Value Per Share represents the total equity of the company per share',
                        formula:'BVPS = Total Equity / Shares Outstanding'
                    },
                ]}
            />
        </div>
    )
}