
import React,{useState,useEffect} from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import MaterialIcon from '../../../components/Other/MaterialIcon'
import TextList from '../../../components/Article/TextList'
import {  Bar } from 'react-chartjs-2'
/* eslint-disable */
import { datalabels } from 'chartjs-plugin-datalabels'
import annotation from "chartjs-plugin-annotation";
/* eslint-enable */
import { useSelector } from 'react-redux'
import { formatDate } from '../../../utils/utils';
import ExcerciseCompleted from '../../../components/Exercise/ExerciseCompleted'
import { ArticleButton } from '../../../components/Other/Buttons';
import { InputSlider } from '../../../components/Other/Sliders';

export default function ValueInvestingAndIntrinsicValue(props){

    const sectionComponents = [
        {name:'Practice',article: ValueInvesting},
        {name:'Exercise',article: ValueInvestingExercise} 
    ]

    return(
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}            
        />
    )
}

function ValueInvestingExercise({section, completeSection,moveTo}){

    const [exercise,setExercise]=useState({
        stage:'exercise',
        score:{},
        completedAt:formatDate()
    })

    const sectionGetCompleted = useSelector(state => state.sectionGetCompleted)
    const { completedSections } = sectionGetCompleted

    useEffect(() => {
        if(completedSections){
            let sectionCompleted = completedSections
                .find(item => item.sectionId===section.sectionId)
            if(sectionCompleted){
                let completedAt = formatDate(sectionCompleted.updatedAt) 
                setExercise({...exercise,stage:'completed',score:sectionCompleted.score,completedAt:completedAt})
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completedSections])

    const [houses, setHouses] = useState([
        {price:100,size:50},
        {price:110,size:55},
        {price:80,size:40},
        {price:null,size:75, estimate:true},
    ])

    const modifyPriceHandler = (e,value) =>{
        // const {value} = e.target
        const housesCopy=[...houses]
        housesCopy[3].price=value
        setHouses(housesCopy)
    }

    const submitScoreHandler = () => {

        const score={
            total:20,
            wrong:0,
            correct:0,
            notAnswered:0,
        }
        let correct=0;
        let dist = Math.abs((150-houses[3].price))
        if(dist<20){
            correct = 20-dist
        }
        score.correct=correct
        completeSection(section.id,score)
        setExercise({...exercise,stage:'completed',score:score,completedAt:formatDate()})
    }

    const tryAgainHandler=()=>{
        setExercise({...exercise,stage:'exercise'})
    }

    return(
        <div className='quizGrid '>
            {exercise.stage==='exercise' &&
                <>
                <TextList
                    content={[
                        {
                            header:'Value Investing Exercise',
                            text:'Estimate the intrinsic value of the last house based on price per square mete'
                        },
                    ]}
                />
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
                            <InputSlider min={50} max={200} step={5} value={houses[3].price||0} onChange={modifyPriceHandler}/>
                            <ArticleButton onClick={submitScoreHandler} text={'Submit Estimate'}/>
                        </div>                    
                    </div>  
                </div> 
                </>
            }
            {exercise.stage==='completed'&&
                <ExcerciseCompleted section={exercise} tryAgain={tryAgainHandler} moveTo={moveTo}/>
            }
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
        <div className='sectionGrid'>
            <TextList
                content={[
                    {header:'Value Investing',text:'Buying assets which value is higher than the price.'},
                    {header:'Intrinsic Value',text:'The real value of item. Market value often differs from the real value of the item. Your job as an investor is the calculate the real value by using financial numbers and gaining information overview of the business'},
                    {buttons:[{text:'Demonstrate',onClick:demoStartHandler}]}
                ]}
            />
                <div className='valueInvestingDemo'>
                        <div className='houseChart'>
                            {startDemo&&
                                <Bar data={chartData} options={chartOptions}/>
                            }
                        </div>
                        
                        <div className='housePrices'>    
                            {housePrices.map((item,index) =>
                                <div key={index} className='housePrice'>
                                    <MaterialIcon icon={'HomeIcon'} className='houseIcon'/>
                                    <h3>{item}k</h3>
                                </div>
                            )}                           
                        </div>
                        <h2>Neighborhood with 4 identical houses</h2>                              
                </div>
        </div>
    )
}