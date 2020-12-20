import React,{useState,useEffect} from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import TextList from '../../../components/Article/TextList'
import VerticalStepper from '../../../components/Other/VerticalStepper'
import MaterialIcon from '../../../components/Other/MaterialIcon'
import { InputSlider } from '../../../components/Other/Sliders';
import { BusinessCard } from '../../../components/Example/BusinessExample';
import Card from '@material-ui/core/Card';
import { InfoTooltip } from '../../../components/Other/Tooltip'
import ExerciseQuiz from '../../../components/Exercise/ExcersiseQuiz'

export default function BusinessModel(props) {

    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'Business',article: Business},
        {name:'Exercise',article: ExerciseQuiz}
    ]

    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function Business(){

    const [business,setBusiness] = useState({
        mealsSold:200,
        revenue:2000,
        costOfRevenue:1400,
        operatingExpenses:300,
        netIncome:300,
        mealPrice:10,
        costPerMeal:7,
        rent:300,
        expPercent:0.7,
        rentPercent:0.3,
        profitIcons:1
    })

    useEffect(()=>{
        updateBusinessValues({...business})
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    },[])


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
        const expPercent = businessCopy.costPerMeal/businessCopy.mealPrice
        const rentPercent = (businessCopy.rent/1000)

        const profitIcons = +(10*(netIncome/1000)).toFixed(0)

        setBusiness({
            ...businessCopy,
            revenue,
            costOfRevenue,
            netIncome,
            grossMargin,
            profitMargin,
            expPercent,
            rentPercent,
            profitIcons
        })      
    }

    return(
        <div className='sectionGrid'>
            <div>
                <TextList
                    content={[
                        {
                            header:'Business playground',
                            text:`Learn how business works with restaurant example. Adjust different inputs to see how it effects the company earnings`,
                        },
                    ]}
                />                             
            </div>
            <div className='businessPlaygroundGrid'>
                <div className='businessInputHeader'>
                    <BusinessCard 
                        header={'Meal price'} 
                        value={business.mealPrice} 
                        icon='FastfoodIcon' 
                        name='mealPrice' 
                        onChange={changeInputHandler}
                        step={1}
                    />
                    <BusinessCard 
                        header={'Cost per meal'} 
                        value={business.costPerMeal} 
                        icon='GrainIcon' 
                        name='costPerMeal' 
                        onChange={changeInputHandler}
                        step={1}                        
                    />
                    <BusinessCard 
                        header={'Rent'} 
                        value={business.rent} 
                        icon='StoreIcon' 
                        name='rent' 
                        onChange={changeInputHandler}
                        step={50}                        
                    />
                </div>
                <div className=''>
                    <div className='businessInputMain'>
                        <h2>Meals Sold</h2>
                        <h2 className='businessInputValue'>{business.mealsSold}pcs</h2>     
                    </div>
                    <InputSlider 
                        onChange={changeInputHandler}
                        value={business.mealsSold}
                        max={320}
                        min={10}
                        step={10}
                        name='mealsSold'
                    />
                </div>
            </div>                    
            <div className='businessExampleIcons'>
                {[ ...Array(business.mealsSold/10).keys()].map((item,index) =>
                    <MaterialIcon key={index} icon='FastfoodIcon' className='businessModelIcon'/>
                )}   
            </div>   
            <div className='businessExampleIcons'>
                {[ ...Array(+((business.mealsSold/10)*business.expPercent).toFixed(0)).keys()].map((item,index) =>
                    <MaterialIcon key={index} icon='GrainIcon' className='businessModelIcon'/>
                )}   
            </div>   
            <div className='businessExampleIcons'>
                {[ ...Array(+(10*business.rentPercent).toFixed(0)).keys()].map((item,index) =>
                    <MaterialIcon key={index} icon='StoreIcon' className='businessModelIcon'/>
                )}   
            </div>   
            <div className='businessExampleIcons'
                style={{
                    marginLeft:business.profitIcons<0? 17*business.profitIcons+'px' :0
                }}
            >
                {[ ...Array(Math.abs(business.profitIcons)).keys()].map((item,index) =>
                    <MaterialIcon key={index} icon='MonetizationOnIcon2' className={` ${business.netIncome>0?'positive':'negative'}`}/>
                )}   
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
                        <h3>Gross Margin <InfoTooltip text={`How much money company is making from each sale after paying all of the variable costs\n\n(Revenue - Cost of Revenue) / Revenue`}/> </h3>
                        <h2>{business.grossMargin}%</h2>     
                    </li>
                    <li>
                        <h3>Operating Expenses</h3>
                        <h2>{business.rent}$</h2>                        
                    </li>
                    <li>
                        <h3>Net Income</h3>
                        <h2 className={business.netIncome>0?'positive':'negative'}>
                        {business.netIncome}$</h2>                        
                    </li>                    
                    <li className='businessMargin'>
                        <h3>Profit Margin <InfoTooltip text={'How much money company is making from each sale after paying paying all of the costs\n\nNet Income / Revenue'}/></h3>
                        <h2>{business.profitMargin}%
                        </h2>      
                    </li>
                </ul>
            </Card>
        </div>
    )
}

function OverView(){

    const steps=[
        {label:'Revenue',icon:'MoneyIcon',text:'Topline\nCompany total sales'},
        {label:'Cost of Revenue',icon:'GrainIcon',text:'Fixed costs:\nMaterials\nIngredients\nProduction Labor'},
        {label:'Operating Expenses',icon:'StoreIcon',text:'Variable Costs:\nRent\nMainetenence and Repairs\nInsurance\nLicence Fees'},
        {label:'Net Income',icon:'MonetizationOnIcon2',text:'Bottom line\nRevenue minus all the costs'},
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