
import React,{useState} from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import TextList from '../../../components/Article/TextList'
import { Bar } from 'react-chartjs-2'
import ExerciseQuiz from '../../../components/Exercise/ExcersiseQuiz'
import ArticleAccordion from '../../../components/Article/ArticleAccordion'
import Chip from '@material-ui/core/Chip';

export default function InvestingCategories({section,completeSection}){

    const questions = [
        {id:1,question:'Bond yields are always positive',options:['True','False'],answer:'False',userAnswer:null},
        {id:2,question:'Goverment Bonds are safer than Corporate Bonds',options:['True','False'],answer:'True',userAnswer:null},
        {id:3,question:'REITs invest in',options:['Real Estate','Stocks','Bonds'],answer:'Real Estate',userAnswer:null},
        {id:4,question:'Derivates are less riskier than ETFs',options:['True','False'],answer:'False',userAnswer:null},
        {id:5,question:'Mutual Fund value is calculated at the end of the day',options:['True','False'],answer:'True',userAnswer:null},
        {id:6,question:'Commodities includes gold and oil',options:['True','False'],answer:'True',userAnswer:null},
    ]

    const sectionComponents = [
        {name:'Overview',article:Overview},
        {name:'Investing Risk Ladder',article: InvestingCategoriesPractice},
        {name:'Exercise',article: ExerciseQuiz,props:{section,completeSection,questions}}
    ]

    return(
        <div id={section.sectionId} className='sectionContainer'>
            <SectionContainer 
                sectionComponents={sectionComponents} 
                section={section} 
                completeSection={completeSection}
            />
        </div>
    )
}

function Overview(){

    const content = [
        {
            header:'Cash',chip:<Chip className='lowRisk' label="Low Risk" variant="outlined" />,
            text:'Cash is the most simplest and safest investment. Investors get small fixed interest on the bank deposit. Downside of cash is that the interest earned is very small and and usually below inflation.'},
        {
            header:'Goverment Bonds',chip:<Chip className='lowRisk' label="Low Risk" variant="outlined" />,
            text:'Bond is a debt instrument which yields fixed rate. Bond Yield is determined by central bank interes rates. Currently goverment bonds yield very little or even negative returns'},
        {
            header:'Corporate Bonds',chip:<Chip className='lowRisk' label="Low Risk" variant="outlined" />,
            text:'Corporate bond is similar to the goverment bonds and can offer better yields but are more riskier'},
        {
            header:'Mutual funds',chip:<Chip className='lowRisk' label="Low Risk" variant="outlined" />,
            text:'Mutual fund is an investment vehicle that pools money from indivisual investors and buys securities such as stocks bonds. When investing in mutual funds, investor gets diversified portfolio without having to make individual investment by self. Mutual funds are valued at the end of the day'},
        {
            header:'ETFs',chip:<Chip className='mediumRisk' label="Medium Risk" variant="outlined" />,
            text:'Exhange Traded Funds are similar to mutual funds but they are traded throughout the day'},
        {
            header:'REITs',chip:<Chip className='mediumRisk' label="Medium Risk" variant="outlined" />,
            text:'Real Estate Investment Trusts is investment vehicle that pools money from investors and buys real estate'},
        {
            header:'Stocks',chip:<Chip className='mediumRisk' label="Medium Risk" variant="outlined" />,
            text:'Investor can become owner of individual company by buing shares. '},
        {
            header:'Commodities',chip:<Chip className='highRisk' label="High Risk" variant="outlined" />,
            text:'Commodities includes precious metals like gold and silver and energy resources like oil. Investor can in commodities by buing commodity funds'},
        {
            header:'Derivates',chip:<Chip className='highRisk' label="High Risk" variant="outlined" />,
            text:'Derivate is a contract to sell or buy underlining assets at a certain price. Derivates includes options, swaps and futures'},
        {
            header:'Crypto Currencies',chip:<Chip className='highRisk' label="High Risk" variant="outlined" />,
            text:'Digital or virtual currency'
        },
    ]

    return(
        <div className='sectionGrid'>
            <h2>Investing categories</h2>
            <div className='accordionWide'>
                <ArticleAccordion content={content}/>                
            </div>
        </div>
    )
}

function InvestingCategoriesPractice(){

    const [startDemo,setStartDemo] = useState(false)

    const investingCategories=[
        {name:'Cash',riskCategory:1,risk:1},
        {name:'Goverment Bonds',riskCategory:1,risk:1.5},
        {name:'Corporate Bonds',riskCategory:1,risk:3},
        {name:'Mutual funds',riskCategory:2,risk:4},        
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
        },
        legend:{
            display:false,
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
            <div className='categoryChart'>
                {startDemo &&
                    <Bar data={data} options={options} />
                }
            </div>
        </div>
    )
}