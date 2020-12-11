import React,{useState,useEffect} from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import { Line, Bar } from 'react-chartjs-2'
import TextList from '../../../components/Article/TextList'
import DragAndDrop from '../../../components/DragAndDrop'
import SectionHeader from '../../../components/Section/SectionHeader'
import ArticleExerciseStats from '../../../components/Article/ArticleExerciseStats'

export default function AssetsAndLiabilities({section,completeArticle}){ 

    const sectionComponents = [
        {name:'Practice',article: AssetsAndLiabilitiesPractice},
        {name:'Exercise',article: AssetsAndLiabilitiesExercise,props:{section,completeArticle}} 
    ]

    return(
        <div id={section.sectionId} className='sectionContainer'>
            <SectionContainer 
                sectionComponents={sectionComponents} 
                section={section} 
                completeArticle={completeArticle}
            />
        </div>
    )
}

function AssetsAndLiabilitiesPractice(){

    const [startDemo,setStartDemo] = useState(false)

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

      const lineOptions = {
        responsive:true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    max:20000,
                    min:-20000,
                    autoSkip: true, 
                    maxTicksLimit: 5
                }
            }],
            xAxes:[{
                ticks:{
                    autoSkip: true, 
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    minRotation: 0
                }
            }]
        },
        tooltips: {
          enabled: false,
        },
        plugins: {
            datalabels: {
                display:false
            }
          }
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
        <div className='aalDemo'>
            <TextList
                content={[
                    {header:'Assets',text:'Assets generate income and make you wealthier  even though you dont need use time and energy. Assets include items like stocks, bonds, real estate etc that generate passive income.'},
                    {header:'Liabilities',text:'Liabilities loses value over time, for example cars, boats motorcycles. Liabilities loses value over time, for example it needs maintenence, fuel etc.'},
                    {buttons:[{text:'Demonstrate',onClick:demoStartHandler}]}
                ]}
            />
            <div className='chartContainer'>
                 <Line data={data} options={lineOptions} />
            </div>
           {startDemo &&
            <div className='aalDemoResult'>
                <h2>Asset vs liability in 10 years</h2>
                <ul >
                    <li>
                        <h3>Asset</h3>
                        <ul className='list'>
                            <li>
                                <p>Initial Investment:</p> 
                                <p>{(10000).toFixed(2)}</p>
                            </li>
                            <li>
                                <p>Interest (6% year): </p> 
                                <p>{chartData.interest.toFixed(2)}</p>
                            </li>
                            <li>
                                <p>Total: </p> 
                                <h3>{(chartData.interest+10000).toFixed(2)}</h3>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h3>Liability</h3>
                        <ul className='list'>
                            <li>
                                <p>Car price:</p> 
                                <p>{(10000).toFixed(2)}</p>
                            </li>
                            <li>
                                <p>Depreciation (10% year): </p> 
                                <p>{chartData.depreciation.toFixed(2)}</p>
                            </li>
                            <li>
                                <p>Gas (1500$ year : </p> 
                                <p>{(chartData.gas).toFixed(2)}</p>
                            </li>
                            <li>
                                <p>Insurance (900$ year): </p> 
                                <p>{(chartData.insurance).toFixed(2)}</p>
                            </li>
                            <li>
                                <p>Total: </p> 
                                <h3>{(chartData.totalLiability).toFixed(2)}</h3>
                            </li>                        
                        </ul>
                    </li>
                </ul>                
            </div>        
            } 
        </div>
    )
}

function AssetsAndLiabilitiesExercise({section,completeArticle}){

    const [score,setScore] = useState({})
    
    const scoreHandler=(newScore)=>{
        setScore(newScore)
        if(newScore.correct===newScore.total){
            completeArticle(section.id,score)
        }
    }

    return(
        <div className='dragAndDropExercise articleSubPage'>
            <DragAndDrop 
                columns={[                    
                    {name:'Drag and drop items to Assets and Liabilities',id:1,
                        exercise:true,
                        starting:true},
                    {
                        name:'Assets',id:0,
                        icon:'AttachMoneyIcon'
                    },
                    {
                        name:'Liabilities',
                        id:2,
                        icon:'MoneyOffIcon'
                    },                    
                ]}
                items={[
                    {name:'Car',start:1,target:2},
                    {name:'Stock',start:1,target:0},
                    {name:'Bond',start:1,target:0},
                    {name:'Boat',start:1,target:2},
                    {name:'House',start:1,target:0},
                    
                ]}
                getScore={scoreHandler}
                startExercise={true}
            />
            <ArticleExerciseStats score={score} />
        </div>
    )
}