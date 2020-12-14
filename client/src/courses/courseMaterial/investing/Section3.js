
import React,{useState} from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import DragAndDrop from '../../../components/DragAndDrop'
import TextList from '../../../components/Article/TextList'
import { Bar } from 'react-chartjs-2'


export default function InvestingCategories({section,completeArticle}){

    const sectionComponents = [
        {name:'Practice',article: InvestingCategoriesPractice},
        {name:'Exercise',article: InvestingCategoriesExercise,props:{section,completeArticle}}
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

function InvestingCategoriesExercise({section,completeArticle}){

    const [score,setScore] = useState({})
    
    const scoreHandler=(newScore)=>{
        setScore(newScore)
        if((newScore.correct+newScore.wrong)===newScore.total){
            completeArticle(section.id,score)
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