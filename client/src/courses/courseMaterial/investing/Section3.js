import React,{useState,useEffect} from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import TextList from '../../../components/Article/TextList'
import VerticalStepper from '../../../components/Other/VerticalStepper'
import MaterialIcon from '../../../components/MaterialIcon'
import { InputSlider } from '../../../components/Other/Sliders';
import { BusinessCard } from '../../../components/Example/BusinessExample';
import Card from '@material-ui/core/Card';


export default function BusinessModel({section,completeSection,moveTo}) {


    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'Business',article: Business}
        // {name:'Asset',article: Asset},
        // {name:'Liability',article: Liability},
        // {name:'Exercise',article:ExerciseQuiz,props:{section,completeSection,questions}}
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

function Business(){

    const [business,setBusiness] = useState({
        mealsSold:100,
        revenue:50,
        costOfRevenue:30,
        operatingExpenses:100,
        netIncome:100,
        mealPrice:10,
        costPerMeal:6,
        rent:300
    })


    function changeInputHandler(e,value,name){
        const businessCopy = {...business}
        businessCopy[name]=+value
        updateBusinessValues(businessCopy)
    }

    const updateBusinessValues=(businessCopy)=>{

        const revenue = businessCopy.mealsSold*businessCopy.mealPrice
        const costOfRevenue = businessCopy.mealsSold*businessCopy.costPerMeal
        const netIncome = revenue-costOfRevenue-businessCopy.rent
        const grossMargin = (((revenue-costOfRevenue)/revenue)*100).toFixed(1)
        const profitMargin = ((netIncome / revenue)*100).toFixed(1)

        setBusiness({
            ...businessCopy,
            revenue,
            costOfRevenue,
            netIncome,
            grossMargin,
            profitMargin
        })
        
    }

    // const revenue = business.mealsSold*business.mealPrice
    // const costOfRevenue = business.mealsSold*business.costPerMeal
    // const operatingExpenses = business.rent

    return(
        <div className='sectionGrid'>
            <TextList
                content={[
                    {
                        header:'Business playground',
                        text:'One share is like the whole company in miniature size.'
                    },
                ]}
            />
            <div className='businessPlaygroundGrid'>
                <div className='businessInputHeader'>
                    <BusinessCard header={'Meal price'} value={business.mealPrice} icon='FastfoodIcon' name='mealPrice' onChange={changeInputHandler}/>
                    <BusinessCard header={'Cost per meal'} value={business.costPerMeal} icon='GrainIcon' name='costPerMeal' onChange={changeInputHandler}/>
                    <BusinessCard header={'Rent'} value={business.rent} icon='StoreIcon' name='rent' onChange={changeInputHandler}/>
                </div>
                <div className=''>
                    <div className='businessInputMain'>
                        <h2>Meals Sold</h2>
                        <h2 className='businessInputValue'>{business.mealsSold}pcs</h2>     
                    </div>
                    <InputSlider 
                        onChange={changeInputHandler}
                        value={business.mealsSold}
                        max={200}
                        min={1}
                        name='mealsSold'
                    />
                    <div className='businessExampleIcons'>
                        {[ ...Array(business.mealsSold).keys()].map((item,index) =>
                            <MaterialIcon icon='FastfoodIcon' className='businessModelIcon'/>
                        )}   
                    </div>                       
                </div>
            </div>
            <Card className='businessExampleResultsCard'>
                <ul className='businessExampleResults'>
                    <li>
                        <h2>Business earnings</h2>
                    </li>
                    <li>
                        <h3>Revenue</h3>
                        <h2>{business.revenue}$</h2>                        
                    </li>
                    <li>
                        <h3>Cost of Revenue</h3>
                        <h2>{business.costOfRevenue}$</h2>                        
                    </li>
                    <li className='businessMargin'>
                        <h3>Gross Margin</h3>
                        <h2>{business.grossMargin}%</h2>     
                    </li>
                    <li>
                        <h3>Operating Expenses</h3>
                        <h2>{business.rent}$</h2>                        
                    </li>
                    <li className='businessMargin'>
                        <h3>Profit Margin</h3>
                        <h2>{business.profitMargin}%
                        </h2>      
                    </li>
                    <li>
                        <h3>Net Income</h3>
                        <h2 className={business.netIncome>0?'positive':'negative'}>
                        {business.netIncome}$</h2>                        
                    </li>
                </ul>
            </Card>
        </div>
    )
}

function OverView(){

    const steps=[
        {label:'Revenue',icon:'MoneyIcon',text:'Topline, company total sales'},
        {label:'Cost of Revenue',icon:'BuildIcon',text:'Direct costs that increase when revenue increases for example material'},
        {label:'Operating Expenses',icon:'StoreIcon',text:'Indirect costs for example rent, equiment, inventory costs, insurance'},
        {label:'Net Income',icon:'MonetizationOnIcon2',text:'Bottom line, revenue minus all the costs'},
    ]

    return(
        <div className='sectionGrid3'>
            <div className='gridItemWide'>
            <TextList
                content={[
                    {header:'Business',text:'When investing in stock you become also an owner of that business so important to understand how business works and how money flows trough business'},
                    {header:'Revenue',text:'Revenue is the money company receives, when it sells goods or services'},
                    {header:'Cost of Revenue',text:'Cost of revenue refers costs that are related to the manufacturing, marketing and delivering of that product. For example restaraunt sells meal for 10$ and the ingredients costs 6$. Cost of revenue rises steadily with the revenue as the company sells more meals.'},
                    {header:'Operating Exenses',text:'Operating expenses are the cost that are not related to the revenue. For example restaurant renting the property for 1000$ month. If no one visits the restaurant and its revenue is 0$, it still needs to pay the rent'},
                    {header:'Net income',text:'Net income is the sum that is left after all the expenses and taxes'},
                ]}
            />
            </div> 
            <div>
                <VerticalStepper steps={steps}/>
            </div>
        </div>
    )
}