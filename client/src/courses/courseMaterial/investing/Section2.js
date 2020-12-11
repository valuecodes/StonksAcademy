
import React,{useState,useEffect} from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import MaterialIcon from '../../../components/MaterialIcon'
import ArticleExerciseStats from '../../../components/Article/ArticleExerciseStats'
import TextList from '../../../components/Article/TextList'
import { Line, Bar } from 'react-chartjs-2'
/* eslint-disable */
import { datalabels } from 'chartjs-plugin-datalabels'
import annotation from "chartjs-plugin-annotation";
/* eslint-enable */


export default function ValueInvestingAndIntrinsicValue({section,completeArticle}){

    const sectionComponents = [
        {name:'Practice',article: ValueInvesting},
        {name:'Exercise',article: ValueInvestingExercise,props:{section,completeArticle}} 
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

function ValueInvestingExercise({section, completeArticle}){

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
        completeArticle(section.id,score)
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