import React,{useState,useEffect} from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import { Line } from 'react-chartjs-2'
import TextList from '../../../components/Article/TextList'
import ArticleAccordion from '../../../components/Article/ArticleAccordion'
import { lineChartOptions, assetChartOptions } from '../../../utils/chartOptions'
import InputGroup from '../../../components/Example/InputGroup'
import { formatNumber } from '../../../utils/utils';
import { colors } from '../../../utils/colors'
import ResultCard from '../../../components/Example/ResultCard'
import ExerciseQuiz from '../../../components/Exercise/ExcersiseQuiz';
import Card from '@material-ui/core/Card';

export default function AssetsAndLiabilities(props){ 

    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'Asset',article: Asset},
        {name:'Liability',article: Liability},
        {name:'Exercise',article: ExerciseQuiz}
    ]

    return(
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function OverView(){
    const [startDemo,setStartDemo] = useState(false)
    const [options,setOptions] = useState({})
    const [chartData,setChartData] = useState({
        assetData:[],
        liabilityData:[],
        labels:[],
        interest:0,
        totalLiability:0,
        depreciation:0,
        gas:0,
        insurance:0
    })

    useEffect(()=>{
        
        let newLabels = []
        let data=[]

        for(var i=0;i<120;i+=3){
            let date = new Date()
            date.setMonth(date.getMonth() + i);
            let year=date.getFullYear()
            let month = date.getMonth()
            newLabels.push(month+'/'+year)
            data.push(1000+(i*100))
        }
        setChartData({...chartData,labels:newLabels})
        setOptions(lineChartOptions)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const data = {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Asset (6% annual interest)',
            fill: false,
            borderColor: 'rgba(115, 222, 146,1)',
            pointRadius: 0,
            pointHitRadius: 0,
            data: chartData.assetData,
          },
          {
            label: 'Liability (car)',
            fill: false,
            borderColor: 'rgba(222, 115, 115,1)',
            pointRadius: 0,
            pointHitRadius: 0,
            data: chartData.liabilityData,
          }
        ]
      };

    const demoStartHandler=()=>{

        setStartDemo(true)

        let asset = 10000
        let liability = 10000
        let gas = 0
        let insurance = 0

        for(let i=0; i<=120; i+=3) {
            setTimeout(() => {
                let assetDataCopy=[...chartData.assetData]
                let liabilityDataCopy=[...chartData.liabilityData]
                assetDataCopy.push(asset)
                liabilityDataCopy.push(liability+gas+insurance)

                setChartData({
                    ...chartData,
                    assetData:assetDataCopy,
                    liabilityData:liabilityDataCopy,
                    interest:asset-10000,
                    totalLiability:liability+gas+insurance,
                    depreciation:liability-10000,
                    gas,
                    insurance
                })
                asset*=1.015
                liability-=liability*0.025
                gas-=375
                insurance-=225
            }, 30 * i);
        }
    }

    return(
        <div className='sectionGrid'>
            <div>
            <TextList
                content={[
                    {header:'Assets',text:"Assets generate income and make you wealthier even though you don't need use lot of time and energy. Assets include items like stocks, bonds, real estate etc that generate passive income."},
                    {header:'Liabilities',text:'Liabilities loses value over time and are costly to maintain. For example cars, boats and  motorcycles values are dropping every year and they need lot of money for gas, insurance and maintenence etc.'},
                    {buttons:[{text:'Demonstrate',onClick:demoStartHandler}]}
                ]}
            />
            </div>
            {startDemo &&
            <>
            <div>
                <div className='chartContainer'>
                    <Line data={data} options={options} />
                </div>
            </div>
            
            <div>
                <Card  className='aalDemoResult'>
                    <h3>Asset vs liability in 10 years</h3>
                    <ul >
                        <li>
                            <h3>Asset</h3>
                            <ul className='list'>
                                <li>
                                    <p>Initial Investment:</p> 
                                    <p>{formatNumber(10000)}</p>
                                </li>
                                <li>
                                    <p>Interest (6% year): </p> 
                                    <p>{formatNumber(chartData.interest)}</p>
                                </li>
                                <li>
                                    <p>Total: </p> 
                                    <h3 className='positive'>{formatNumber(chartData.interest+10000)}</h3>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3>Liability</h3>
                            <ul className='list'>
                                <li>
                                    <p>Car price:</p> 
                                    <p>{formatNumber(10000)}</p>
                                </li>
                                <li>
                                    <p>Depreciation (10% year): </p> 
                                    <p>{formatNumber(chartData.depreciation)}</p>
                                </li>
                                <li>
                                    <p>Gas (1500$ year : </p> 
                                    <p>{formatNumber(chartData.gas)}</p>
                                </li>
                                <li>
                                    <p>Insurance (900$ year): </p> 
                                    <p>{formatNumber(chartData.insurance)}</p>
                                </li>
                                <li>
                                    <p>Total: </p> 
                                    <h3 className='negative'>{formatNumber(chartData.totalLiability)}</h3>
                                </li>                        
                            </ul>
                        </li>
                    </ul>   
                </Card>
            </div>     
            </>   
            }                 
        </div>
    )
}

export function Asset(){

    const [chartData,setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Deposits',
                data: [],
                backgroundColor: colors.secondaryColor,
                pointRadius:0,
                pointHitRadius:0,                
                borderWidth: 1
            },
            {
                label: 'Interest',
                data: [],
                backgroundColor: colors.positiveColor,
                pointRadius:0,
                pointHitRadius:0,
                borderWidth: 1
            },
            {
                type:'bar',
                label: 'Yearly Interest',
                data: [],
                backgroundColor: colors.primaryColor,
                pointRadius:0,
                pointHitRadius:0,
                borderWidth: 1,
                barPercentage: 0.6
                
            }
        ]
    })

    const [inputs,setInputs] = useState({
        startingInvestment:{value:10000,type:'slider',min:0,max:100000,step:1000,format:'€'},
        annualReturn:{value:7,type:'slider',min:0,max:20,step:0.5,format:'%'},
        monthlyDeposits:{value:200,type:'slider',min:0,max:2000,step:50,format:'€'},
        timePeriod:{value:10,type:'slider',min:1,max:30,step:1,format:'Y'},
    })

    const [results,setResults] = useState({
        deposits:0,
        interest:0,
        total:0,
    })

    useEffect(()=>{
        let newLabels = []
        let data=[]
        let depositData=[]
        let interestData=[]
        let yearlyInterestData=[]
        let startingValue = inputs.startingInvestment.value
        const annualReturn = inputs.annualReturn.value
        const monthlyDeposits = inputs.monthlyDeposits.value
        const timePeriod = inputs.timePeriod.value
        let deposits = startingValue

        data.push(startingValue)
        depositData.push(deposits)
        interestData.push(0)
        yearlyInterestData.push(0)
        newLabels.push(`Year ${0}`)

        for(var i=0;i<timePeriod;i++){
            let label = `Year ${i+1}`
            newLabels.push(label)
            startingValue+=(monthlyDeposits*12) 
            deposits+=(monthlyDeposits*12)
            startingValue*=((annualReturn/100)+1)          
            data.push(startingValue)
            depositData.push(deposits)
            interestData.push(startingValue-deposits)
            yearlyInterestData.push(startingValue*((annualReturn/100)+1)-startingValue)
        }
       
        let total = data[data.length-1]
        const chartCopy=chartData
        chartCopy.datasets[0].data=depositData
        chartCopy.datasets[1].data=interestData
        chartCopy.datasets[2].data=yearlyInterestData
        setChartData({...chartCopy,labels:newLabels})
        setResults({
            deposits:formatNumber(deposits,'€'),
            interest:formatNumber((total-deposits),'€'),
            total:formatNumber(total,'€')
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputs])

    const content = [
        {header:'Compound Interest',text:'Compound interest is result of reinvesting interest rather than paying it out.'},
        {header:'ReInvesting',text:'Reinvesting dividends and interest fastens the compounding effect'},
    ]

    return(
        <div className='sectionGrid'>
            <div> 
                <TextList
                    content={[
                        {header:'Asset Playground',text:"Assets generate income and make you wealthier even though you don't need use lot of time and energy. Assets include items like stocks, bonds, real estate etc that generate passive income."},
                    ]}
                /> 
                <ArticleAccordion content={content}/>
            </div>
            <div className='chartContainer'>
                <Line data={chartData} options={assetChartOptions(true)} />
            </div>
            <div className='example'>                
                <InputGroup header={'Asset example'} inputs={inputs} setInputs={setInputs}/>
                <ResultCard header={`Result after ${inputs.timePeriod.value} years`} value={results.total} />
            </div>
        </div>
    )
}

export function Liability(){

    const [chartData,setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Car value',
                data: [],
                backgroundColor: 'rgba(82, 103, 122,0.5)',
                pointRadius:0,
                pointHitRadius:0,                
                borderWidth: 1,
                stack: 1,
            },
            {
                label: 'Gas',
                data: [],
                backgroundColor: colors.negativeColor,
                pointRadius:0,
                pointHitRadius:0,
                borderWidth: 1,
                stack: 1,
            },
            {
                label: 'Insurance',
                data: [],
                backgroundColor: colors.negativeColor1,
                pointRadius:0,
                pointHitRadius:0,
                borderWidth: 1,
                stack: 1,
            },
            {
                label: 'Total Cost',
                data: [],
                borderColor:colors.secondaryColor,
                pointRadius:0,
                pointHitRadius:0,
                borderWidth: 3,
                fill:false,
                stack: 2,
            }
        ]
    })

    const [inputs,setInputs] = useState({
        carPrice:{value:10000,type:'slider',min:0,max:100000,step:1000,format:'€'},
        depreciationPerYear:{value:10,type:'slider',min:0,max:30,step:0.5,format:'%'},
        gasPerYear:{value:1200,type:'slider',min:0,max:5000,step:50,format:'€'},
        insuranceCostPerYear:{value:900,type:'slider',min:0,max:2000,step:50,format:'€'},
    })

    const [results,setResults] = useState({
        totalCost:0,
    })

    useEffect(()=>{
        let carPrice= inputs.carPrice.value
        let depreciationPerYear = inputs.depreciationPerYear.value
        let gasPerYear = inputs.gasPerYear.value
        let insuranceCostPerYear = inputs.insuranceCostPerYear.value

        let newLabels = []        
        let liability = carPrice
        let gas = -0.1
        let insurance = -0.1
        let liabilityData = []
        let gasData = []
        let insuranceData = []
        let total=[]

        for(let i=0; i<=10; i++) {
            let label = `Year ${i}`
            if(i===0) label=''
            newLabels.push(label)
            liabilityData.push(liability)
            gasData.push(gas)
            insuranceData.push(insurance)
            total.push(-(carPrice-liability)+gas+insurance-gas)
            liability-=liability*(depreciationPerYear/100)
            gas-=gasPerYear
            insurance-=insuranceCostPerYear
            insurance-=gasPerYear         
        }

        const chartCopy={...chartData}
        chartCopy.datasets[0].data=liabilityData
        chartCopy.datasets[1].data=gasData
        chartCopy.datasets[2].data=insuranceData
        chartCopy.datasets[3].data=total
        setChartData({...chartCopy,labels:newLabels})
        let totalCost = total[total.length-1]
        setResults({
            totalCost:formatNumber(totalCost,'€'),
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputs])

    const content = [
        {header:'Depreciation',text:'Decrease of item value over time. Car value usually decreases 10 % a year.'},
        {header:'Fixed Cost',text:"Costs that are independent of the company activities or item usage. For example car insurance have to paid even if you don't drive at all."},
        {header:'Variable Cost',text:'Costs that are tied to the company production output or item usage. For example car gas is variable cost because is tied to the kilometers you.'},
    ]

    return(
        <div className='sectionGrid'>
            <div> 
                <TextList
                    content={[
                        {header:'Liability Playground',text:'Liabilities loses value over time and are costly to maintain. For example cars, boats and  motorcycles values are dropping every year and they need lot of money for gas, insurance and maintenence etc.'},
                    ]}
                /> 
                <ArticleAccordion content={content}/>
            </div>
            <div className='chartContainer'>
                <Line data={chartData} options={assetChartOptions(false)} />
            </div>
            <div className='example'>                
                <InputGroup header={'Liability (Car)'} inputs={inputs} setInputs={setInputs}/>
                <ResultCard header={`Total costs in 10 years`} value={results.totalCost} />
            </div>
        </div>
    )
}
