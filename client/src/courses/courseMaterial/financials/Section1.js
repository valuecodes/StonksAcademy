import React from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import TextList from '../../../components/Article/TextList'
import Statement from '../../../components/Other/Statement'
import ArticleAccordion from '../../../components/Article/ArticleAccordion'
import { Card } from '@material-ui/core';
import { TimelineList, TimelineListOpposite } from '../../../components/Other/Timeline'
import { ListSmall } from '../../../components/Other/Lists'
import ExerciseQuiz from '../../../components/Exercise/ExcersiseQuiz';


export default function IncomeStatement(props) {
    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'Structure',article: Structure},
        {name:'Example',article: Example},
        {name:'Exercise',article: ExerciseQuiz}
    ]
    
    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function Structure(){
    
    const content = [
        {header:'Revenue',text:'The topline of the income statement. It includes total sales and all the direct costs that are included in the manufacturing and delivering the product or service to the customers'},
        {header:'Operating Expenses',text:'Operating expenses (OPEX) is an ongoing cost for running a business. It includes all the indirect costs of running a business'},
        {header:'Income from Continuing Operations',text:'Continuing operations refers to all business operations excluding all the segments that are discontinued.'},
        {header:'Non-recurring Events',text:'Non-recurring events are those items on the income statement that are unusual or one time events. They are not expected during regular business operations and includes items like gains or loss from sale of an asset, restructuring cost, lawsuits and impairments.'},
        {header:'Net Income',text:'Net income is known as the bottom line. It calculated by substracting all of the cost from the revenue.'},
    ]

    const statementContent={
        statement:'Income Statement',
        company:'',
        date:{value:'Period',info:'Accounting period.\n3 month (Quarter) or 12 month (Year)'},
        content:[
            {header:'Revenue'},
            {name:'Revenue',value:'',info:'Total Sales'},
            {name:'Cost of Revenue',info:'Total direct cost of product or service'},
            {name:'Gross Profit',info:'Total profit company makes after all the direct cost of the product or service'},
            {header:'Operating Expenses'},
            {name:'Selling, General and Administrative',info:'Also known as SG&A'},
            {name:'Research and Development',info:'Company process to create technologies to provide competive advantages.'},
            {name:'Depreciation and Amortization',info:'Non cash expenses\nAmortization happens when the depreciation of an intangible asset is split up over time\nDepreciation happens when fixed asset lose value over time'},
            {name:'Other Operating Expenses',info:"Also known as overhead expenses which doesn't depend on sales or production quantities"},
            {name:'Operating Income',info:'Amount of profit company makes after subtracting operating expenses and cost of goods sold'},
            {header:'Income from Continuing Operations'},
            {name:'EBIT',info:'Earnings Before Interest and Taxes'},
            {name:'Interest Expense',info:'Non-operating expense that is the cost of borrowing money includes interest paid on bonds, loans and convertible debt'},
            {name:'Income Before Tax',info:'Comapany earnings before taxes. Removes the effect of taxes when comparing different companies financial performance'},
            {name:'Income Tax expense',info:'Goverment tax related to the taxable profit'},
            {name:'Net Income from Continuing Operations',info:'After tax earnings excluding one time events'},
            {header:'Non-recurring Events'},
            {name:'Discontinued Operations',info:"Shutdown or divistment of company core business that needs to be reported seperately on the company's income statement"},
            {name:'Extraordinary Items',info:'One time gains/losses that unlikely to happen again'},
            {name:'Total Non-recurring',value:''},
            {header:'Net Income'},
            {name:'Net Income',info:'Company revenue minus all the costs'},
            {name:'Basic Earnings per Share',info:'Earnings per share that includes only common shares'},
            {name:'Diluted Earnings per Share',info:'Earnings per share that includes common shares, convertible bonds and convertible preferred stocks. Diluted EPS is usually less than basic eps'},
        ]
    }

    return(
        <div className='sectionGrid2'>
            <div> 
                <h3>Income Statement Structure</h3>
                <ArticleAccordion content={content}/>                    
            </div>
            <div className='statementExample'>
                <Statement statement={statementContent}/>
            </div>
        </div>
    )
}

function Example(){

    const statementContent={
        statement:'Income Statement',
        company:'Amazon',
        info:'Numbers in millions',
        date:{value:'12/30/2019',info:'Period 1.1.2019 - 12.30.2019'},
        content:[
            {header:'Revenue'},
            {name:'Revenue',value:'280 522',info:'Total Sales'},
            {name:'Cost of Revenue',value:'205 768',info:'Total direct cost of product or service'},
            {name:'Gross Profit',value:'74 754',info:'Total profit company makes after all the direct cost of the product or service'},
            {header:'Operating Expenses'},
            {name:'Selling, General and Administrative',value:'24 081',info:'Also known as SG&A'},
            {name:'Research and Development',value:'35 931',info:'Company process to create technologies to provide competive advantages.'},
            {name:'Depreciation and Amortization',value:'565',info:'Non cash expenses\nAmortization happens when the depreciation of an intangible asset is split up over time\nDepreciation happens when fixed asset lose value over time'},
            {name:'Other Operating Expenses',value:'201',info:"Also known as overhead expenses which doesn't depend on sales or production quantities"},
            {name:'Operating Income',value:'14 541',info:'Amount of profit company makes after subtracting operating expenses and cost of goods sold'},
            {header:'Income from Continuing Operations'},
            {name:'EBIT',value:'15 576',info:'Earnings Before Interest and Taxes'},
            {name:'Interest Expense',value:'-768',info:'Non-operating expense that is the cost of borrowing money includes interest paid on bonds, loans and convertible debt'},
            {name:'Income Before Tax',value:'13 976',info:'Company earnings before taxes. Removes the effect of taxes when comparing different companies financial performance'},
            {name:'Income Tax expense',value:'2 374',info:'Goverment tax related to the taxable profit'},
            {name:'Net Income from Continuing Operations',value:'11 588',info:'After tax earnings excluding one time events'},
            {header:'Non-recurring Events'},
            {name:'Discontinued Operations',value:'-',info:"Shutdown or divistment of company core business that needs to be reported seperately on the company's income statement"},
            {name:'Extraordinary Items',value:'-',info:'One time gains/losses that unlikely to happen again'},
            {name:'Total Non-recurring',value:'-'},
            {header:'Net Income'},
            {name:'Net Income',value:'11 588',info:'Company revenue minus all the costs'},
            {name:'Basic Earnings per Share',value:'23.5',info:'Earnings per share that includes only common shares'},
            {name:'Diluted Earnings per Share',value:'23',info:'Earnings per share that includes common shares, convertible bonds and convertible preferred stocks. Diluted EPS is usually less than basic eps'},
        ]
    }

    return(
        <div className='sectionGrid2'>
            <div>
                <TextList
                    content={[
                        {header:'Amazon Income Statement',text:"Amazon full year Income Statement from 2019"},
                    ]}
                />   
                <div className='incomeTimeLine'>
                    <h3 className='timeLineHeader'>Amazon Inc</h3> 
                    <TimelineListOpposite list={
                        [['Founded','1994'],['Founder','Jeff Bezos'],['Industry','Ecommerce and cloud computing'],['Employees','798 000']]}
                    />
                </div>
            </div>
            <div className='statementExample'>
                <Statement statement={statementContent}/>
            </div>
        </div>
    )
}

function OverView(){

    const accordion=[
        {header:'Revenue',icon:'MoneyIcon',text:'Topline\nCompany total sales'},
        {header:'Expenses',icon:'AccountBalanceWalletIcon',text:'Topline\nCompany total sales'},
        {header:'Gains and Losses',icon:'ShowChartIcon',text:'Topline\nCompany total sales'},
        {header:'Net Income',icon:'MonetizationOnIcon',text:'Topline\nCompany total sales'},
    ]

    return(
        <div className='sectionGrid3'>
            <div>
                <TextList
                    content={[
                        {header:'Definition',text:"Income Statement or profit and loss statement is used for reporting company financial performance over specific time period (3 months or 12 months)."},
                        {header:'Components',text:`Income Statement consist of 4 main components:`}
                    ]}
                /> 
                <ListSmall list={accordion}/>
            </div>
            <div className='paddingTop'>
                <TimelineList list={['Revenue','Expenses','Gains and Losses','Net Income']}/>
            </div>
            <Card className='padding'>
                <TextList
                    content={[
                        {header:'Use Cases',list:['Profit and Loss during reporting period','Profility And Business activities tracking','Peer and sector comparison','Management business decisions','Year over Year and Quarter over Quarter comparison']},
                    ]}
                />                
            </Card>

            
        </div>
    )
}