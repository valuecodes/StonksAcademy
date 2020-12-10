
import React,{useState,useEffect} from 'react'
import { SubArticleNav } from '../../utils/subArticleNav'
import { Line, Bar } from 'react-chartjs-2'
import TextList from '../../components/Article/TextList'
import MaterialIcon from '../../components/MaterialIcon'
/* eslint-disable */
import { datalabels } from 'chartjs-plugin-datalabels'
import annotation from "chartjs-plugin-annotation";
/* eslint-enable */
import DragAndDrop from '../../components/DragAndDrop'
import ArticleHeader from '../../components/Article/ArticleHeader'
import ArticleExerciseStats from '../../components/Article/ArticleExerciseStats'


export function AssetsAndLiabilities({article,completeArticle}){    

    const [articleSubNav, setArticleSubNav] = useState(new SubArticleNav(['Content','Exercise']))

    const [score,setScore] = useState({})
    
    const scoreHandler=(newScore)=>{
        setScore(newScore)
        if(newScore.correct===newScore.total){
            completeArticle(article.id,score)
        }
    }
    return(
        <div id={article.articleId} className='articleContainer'>
            <ArticleHeader 
                header={'1. Assets and Liabilities'} 
                articleSubNav={articleSubNav} 
                setArticleSubNav={setArticleSubNav}
            />
            <div className='articleSubPages' style={articleSubNav.subPageStyle(articleSubNav)}>
                <AssetsAndLiabilitiesPractice />
                <AssetsAndLiabilitiesExercise score={score} scoreHandler={scoreHandler} />
            </div>
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

function AssetsAndLiabilitiesExercise({score,scoreHandler}){
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

export function ValueInvestingAndIntrinsicValue({article,completeArticle}){

    const [articleSubNav, setArticleSubNav] = useState(new SubArticleNav(['Practise','Exercise']))

    return(
        <div id={article.articleId} className='articleContainer'>
            <ArticleHeader 
                header={'2. Value investing and intrinsic value'} 
                articleSubNav={articleSubNav} 
                setArticleSubNav={setArticleSubNav}
            />
            <div className='articleSubPages' style={articleSubNav.subPageStyle(articleSubNav)}>
                <ValueInvesting/>
                <ValueInvestingExercise article={article} completeArticle={completeArticle}/>
            </div>
        </div>
    )
}

function ValueInvestingExercise({article, completeArticle}){

    const [houses, setHouses] = useState([
        {price:95,size:50},
        {price:130,size:55},
        {price:80,size:40},
        {price:null,size:75, estimate:true},
    ])

    const modifyPriceHandler = (e) =>{
        const {value} = e.target
        const housesCopy=[...houses]
        housesCopy[3].price=value
        setHouses(housesCopy)
    }

    const submitScoreHandler = () => {
        const score={
            total:0,
            wrong:0,
            correct:0,
            notAnswered:0,
        }
        score.total++
        if(houses[3].price>145&&houses[3].price<170){
            score.correct++
        }else{
            score.wrong++
        }
        completeArticle(article.id,score)
    }

    return(
        <div className='articleSubPage'>
            <div className='articleExerciseHeader'>
                <h2>Estimate the intrinsic value of house 4 based on price per square meter</h2>
            </div>
            <div className='articleMiddle'>
                <div className='housePrices exerciseContainer'>    
                    {houses.map((item,index) =>
                        <div key={index} className='housePrice houseCard'>
                            <MaterialIcon icon={'HomeIcon'} className='houseIcon'/>
                            <h3>House {index+1}</h3>
                            <ul className='list smallList'>   
                                <li>                            
                                    <label>Price</label>
                                     <h3>{item.price}k</h3>
                                </li>                                
                                <li>
                                    <label>Size</label>
                                    <h3>{item.size}/m2</h3>
                                </li>
                                <li>
                                    <label>Price/m2</label>
                                    <h3>{(item.price/item.size).toFixed(2)}k</h3>
                                </li>
                                <li></li>
                            </ul>                            
                        </div>
                    )}    
                    <div className='estimateHousePrice'>
                        <h3>Estimate</h3>
                        <input min={50} max={200} type='range' onChange={(e) => modifyPriceHandler(e)}/>  
                        <button onClick={submitScoreHandler} className='button'>Submit Estimate</button>
                    </div>                    
                </div>  
            </div>
            <ArticleExerciseStats score={{}} />
        </div>
    )
}

function ValueInvesting(){

    const [startDemo,setStartDemo] = useState(false)

    const demoStartHandler = () =>{
        setStartDemo(!startDemo)
    }

    const housePrices=[100,110,80,105]
    let colors=['orange','red','green','red']

    let median = housePrices.reduce((a,c) => a+c,0)/housePrices.length
    const chartData={
        labels: housePrices.map((item,index) => `House ${index+1}`),
        datasets: [{
          label: "My First dataset",
          borderWidth: 1,
          data: housePrices,
        }],
        lineAtIndex: 2
      }

      let chartOptions = {
        responsive:true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            stacked: true,
            display:false,
            gridLines: {
                display:false
            }
          }],
          yAxes: [{
            stacked: true,
            display:false,
            gridLines: {
                display:false
            }
          }]
        },
        legend:{
            display:false
        },
        annotation: {
            annotations: [
                {
                  drawTime: "afterDatasetsDraw",
                  type: "line",
                  mode: "horizontal",
                  scaleID: "y-axis-0",
                  value: 100,
                  borderWidth:2,
                  borderColor: "black",
                  label: {
                    content: "Median",
                    enabled: true,
                    position: "right",
                  }
                }
              ]
        },          
        plugins: {
            datalabels: {
              align: 'end',
              anchor: 'end',
              size: 50,
              font: {
                weight: 'bold',
                size: 14,
              },                 
              color: function(context) {
                return colors[context.dataIndex]
              },
              formatter: function(value){
                  if(value<median*0.95) return 'Undervalued'
                  if(value>median*1.05) return 'Overvalued'
                  return 'Fairlyvalued';
              }
            },
      
          },

      };

    return(
        <div className='articleSubPage'>
            <TextList
                content={[
                    {header:'Value Investing',text:'Buying assets which value is higher than the price.'},
                    {header:'Intrinsic Value',text:'The real value of item. Market value often differs from the real value of the item. Your job as an investor is the calculate the real value'},
                    {buttons:[{text:'Demonstrate',onClick:demoStartHandler}]}
                ]}
            />
                <div className='valueInvestingDemo'>
                        <div className='houseChart'>
                            {startDemo&&
                                <Bar data={chartData} options={chartOptions}/>
                            }
                        </div>
                        <h2>Neighborhood with 4 houses</h2>
                        <div className='housePrices'>    
                            {housePrices.map((item,index) =>
                                <div key={index} className='housePrice'>
                                    <MaterialIcon icon={'HomeIcon'} className='houseIcon'/>
                                    <h3>{item}k</h3>
                                </div>
                            )}                        
                        </div>                             
                </div>
        </div>
    )
}


export function InvestingCategories({article,completeArticle}){

    const [articleSubNav, setArticleSubNav] = useState(new SubArticleNav(['Practise','Exercise']))

    return(
        <div id={article.articleId} className='articleContainer'>
            <ArticleHeader 
                header={'3. Investing categories'} 
                articleSubNav={articleSubNav} 
                setArticleSubNav={setArticleSubNav}
            />
            <div className='articleSubPages' style={articleSubNav.subPageStyle(articleSubNav)}>
                <InvestingCategoriesPractice/>
                <InvestingCategoriesExercise article={article}  completeArticle={completeArticle}/>
            </div>
        </div>
    )
}

function InvestingCategoriesExercise({article,completeArticle}){

    const [score,setScore] = useState({})
    
    const scoreHandler=(newScore)=>{
        setScore(newScore)
        if((newScore.correct+newScore.wrong)===newScore.total){
            completeArticle(article.id,score)
        }
    }

    return(
        <div className='dragAndDropExercise'>
            <DragAndDrop 
                columns={[                    
                    {name:'Drag and drop assets to correct risk category',id:0,
                        exercise:true,
                        starting:true},
                    {
                        name:'Low',
                        id:1,
                        icon:'AttachMoneyIcon'
                    },
                    {
                        name:'Medium',
                        id:2,
                        icon:'MoneyOffIcon'
                    },                    
                    {
                        name:'High',
                        id:3,
                        icon:'MoneyOffIcon'
                    },                    
                ]}
                items={[
                    {name:'Stock',start:0,target:2},
                    {name:'Goverment Bonds',start:0,target:1},
                    {name:'Derivates',start:0,target:3},
                    {name:'Cryptocurrencies',start:0,target:3},
                    {name:'Mutual funds',start:0,target:1},
                    {name:'Reits',start:0,target:2},
                    {name:'Private Equity',start:0,target:3},
                    {name:'Corporate Bonds',start:0,target:2},
                    {name:'Commodities',start:0,target:3},
                    {name:'ETFs',start:0,target:2},
                    {name:'Cash',start:0,target:1},
                ]}
                getScore={scoreHandler}
                startExercise={true}
            />
        </div>
    )
}

function InvestingCategoriesPractice(){

    const [startDemo,setStartDemo] = useState(false)

    const investingCategories=[
        {name:'Cash',riskCategory:1,risk:1},
        {name:'Goverment Bonds',riskCategory:1,risk:1.5},
        {name:'Mutual fund',riskCategory:1,risk:3},
        {name:'Corporate Bonds',riskCategory:2,risk:3.5},        
        {name:'ETFs',riskCategory:2,risk:4},
        {name:'REITs',riskCategory:2,risk:4.5},
        {name:'Stock',riskCategory:2,risk:5},
        {name:'Private Equity',riskCategory:3,risk:7},
        {name:'Commodities',riskCategory:3,risk:7.5},
        {name:'Derivates',riskCategory:3,risk:9},
        {name:'CryptoCurrencies',riskCategory:3,risk:10},
    ]

    const demoStartHandler = () =>{
        setStartDemo(!startDemo)
    }

    const data = {
        labels: investingCategories.map(item => item.name),
        datasets: [
          {
            fill: false,
            borderColor: 'rgba(115, 222, 146,1)',
            backgroundColor:investingCategories.map(item =>{
                if(item.riskCategory===1) return 'green'
                if(item.riskCategory===2) return 'orange'
                if(item.riskCategory===3) return 'red'
                return''
            }),
            pointRadius: 0,
            pointHitRadius: 0,
            data: investingCategories.map((item,index) => item.risk),
          },
        ]
      };

      const options = {
        responsive:true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes:[{
                ticks:{
                    maxRotation: 0,
                    minRotation: 0
                }
            }]
        },
        legend:{
            display:false,
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


    return(
        <div className='articleSubPage'>
            <TextList
                content={[
                    {header:'Investment category risk ladder',text:'In investing risk and reward goes hand and hand.'},
                    {header:'Level 1 - Cash and goverment bonds',text:'Relatively safe investment with minimun risk of losing capital.'},
                    {header:'Level 2 - Corporate bonds and stocks ',text:'Medium risk and reward.'},
                    {header:'Level 3 - Other investments and derivates ',text:'High risk with change of losing capital'},
                    {buttons:[{text:'Risk Ladder',onClick:demoStartHandler}]}
                ]}
            />
            <div className='articleExample'>
                {startDemo &&
                    <Bar data={data} options={options} />
                }
            </div>
        </div>
    )
}