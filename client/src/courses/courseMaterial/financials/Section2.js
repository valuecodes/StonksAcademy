import { Card } from '@material-ui/core'
import React from 'react'
import ArticleAccordion from '../../../components/Article/ArticleAccordion'
import TextList from '../../../components/Article/TextList'
import { ListSmall } from '../../../components/Other/Lists'
import Statement from '../../../components/Other/Statement'
import { TimelineList, TimelineListOpposite } from '../../../components/Other/Timeline'
import SectionContainer from '../../../components/Section/SectionContainer'
import ExerciseQuiz from '../../../components/Exercise/ExcersiseQuiz';

export default function BalanceSheet(props) {
    
    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'Structure',article:Structure},
        {name:'Example',article:Example},
        {name:'Exercise',article: ExerciseQuiz}
    ]

    return (
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function Example(){

    const statementContent={
        statement:'Balance Sheet',
        company:'Coca-Cola',
        date:{value:'12/30/2019',info:'Accounting period.\n3 month (Quarter) or 12 month (Year)'},
        content:[
            {header:'Current Assets'},
            {name:'Cash and cash equivalents',value:'6 480',info:'Cash or items that can be easily converted to cash. Includes items like bank accounts and marketable securities'},
            {name:'Short Term Investments',value:'4 695',info:'Short term investments includes money market accounts, savings accounts, treasure bills and goverment bonds'},
            {name:'Accounts Receivables',value:'3 971',info:'Product or service delivered to the client but not paid yet'},
            {name:'Inventory',value:'3 379',info:'Finished products or items that are used to manufacture products'},
            {name:'Prepaid Expenses',value:'1 829',info:'Future expenses that are paid in advance, includes items like prepaid rent and prepaid insurance'},
            {name:'Total Current Assets', total:true,value:'20 411'},

            {header:'Long Term Assets'},
            {name:'Property Plant and Equipment',value:'20 293',info:'Physical or tangible assets that have lifespan of multiple years. Includes items like buildings, land, machinery, vehicles etc.'},
            {name:'Accumulated Depreciation',value:'(8 083)	',info:'The total depreciation of an assets that have charged since to date on a fixed asset'},
            {name:'Goodwill',value:'16 764',info:'When company acquires another company, the excess amount that is beyond the book value is called goodwill.'},
            {name:'Intangibles',value:'10 002',info:"Intangibles assets such as intellectual capital and property and social capital"},
            {name:'Long Term Investments',value:'19 879',info:'Stocks, bonds and real estate investments that the company plans to hold more than a year.'},
            {name:'Total Assets', total:true,value:'86 381',info:''},
            
            {header:'Current Liabilities'},
            {name:'Notes and Loans Payable',value:'10 994',info:'Short term debt that needs to be paid within a year'},
            {name:'Accounts Payable',value:'3 804',info:'When company buys from the supplier with credit and the invoice has due date in 30 days. During that time the amount of invoice is marked as accounts payable.'},
            {name:'Accrued Expenses',value:'7 416',info:'Payments that the company needs to pay in the future'},
            {name:'Current Long Term Debt/Capital Leases',value:'4 253',info:'Current portion of the long term debt that needs to be paid within a year.'},
            {name:'Total Current Liabilities', total:true,value:'26 973'},

            {header:'Long Term Liabilities'},
            {name:'Long Term Debt',value:'27 516',info:"Debt that is due in more than 12 months"},
            {name:'Total Debt',value:'42 763',info:'The sum of all the short term and long term debt'},
            {name:'Deferred Income Tax',value:'2 284',info:'Taxes that a company will pay in the future.'},
            {name:'Total Liabilities', total:true,value:'67 400',info:''},

            {header:"Shareholder's Equity"},
            {name:'Total Equity',value:'18 981',info:'Total liabilities subtracted from the total assets'},
            {name:"Total Liabilities and Shareholders' Equity",value:'86 381',info:''},
        ]
    }

    return(
        <div className='sectionGrid2'>
            <div>
                <TextList
                    content={[
                        {header:'Coca-Cola Balance Sheet',text:"Coca-Cola full year Balance Sheet from 2019"},
                    ]}
                />   
                <div className='incomeTimeLine'>
                    <h3 className='timeLineHeader'>Coca-Cola Co</h3> 
                    <TimelineListOpposite list={
                        [['Founded','1886'],['Founder','Asa Griggs Candler'],['Industry','Beverage'],['Employees','62 600']]}
                    />
                </div>
            </div>
            <div className='statementExample'>
                <Statement statement={statementContent}/>
            </div>
        </div>
    )
}

function Structure(){
    
    const content = [
        {header:'Assets',list:[
            {subHeader:'Current Assets',text:'Current assets are assets that can consumed within a year. They include items like cash, cash equivalents, accounts receivables and short term investments. Current assets important because it can used to fund day to day business operations.'},
            {subHeader:'Long Term Assets',text:'Long term assets are assets that are not intended to consume or turned into cash within a year. They include items like plant, equiment, property long term investments, copyright and patents etc. Changes in to the long term assets can be seen as capital investments or liquidation. Long term assets can lead to future growth but they can also be also expensive and drain company cash or raise debt levels'},
        ]},
        {header:"Liabilities",list:[
            {subHeader:'Current Liabilities',text:"Current liabilities are liabilities that needs to be paid within a year. They include short term debt, accounts payable, dividends, debt interest, income taxes within a year etc. Current liabilities can be compared to current assets to see what is the the company's short term financial situation"},
            {subHeader:'Long Term Liabilities',text:"Long term liabilities are liabilities that needs to paid more than one year in to the future. They include long term debt, bonds payable and postretirement healthcare liabilities etc."},
        
        ]},
        {header:"Shareholder's Equity",text:"Shareholder's equity is the net worth of the company. It can calculated by subtracting all the liabilities from the total assets"}
    ]

    const statementContent={
        statement:'Balance Sheet',
        company:'',
        date:{value:'Period',info:'Accounting period.\n3 month (Quarter) or 12 month (Year)'},
        content:[
            {header:'Current Assets'},
            {name:'Cash and cash equivalents',value:'',info:'Cash or items that can be easily converted to cash. Includes items like bank accounts and marketable securities'},
            {name:'Short Term Investments',value:'',info:'Short term investments includes money market accounts, savings accounts, treasure bills and goverment bonds'},
            {name:'Accounts Receivables',value:'',info:'Product or service delivered to the client but not paid yet'},
            {name:'Inventory',value:'',info:'Finished products or items that are used to manufacture products'},
            {name:'Prepaid Expenses',value:'',info:'Future expenses that are paid in advance, includes items like prepaid rent and prepaid insurance'},
            {name:'Total Current Assets',value:''},

            {header:'Long Term Assets'},
            {name:'Property Plant and Equipment',value:'',info:'Physical or tangible assets that have lifespan of multiple years. Includes items like buildings, land, machinery, vehicles etc.'},
            {name:'Accumulated Depreciation',value:'',info:'The total depreciation of an assets that have charged since to date on a fixed asset'},
            {name:'Goodwill',value:'',info:'When company acquires another company, the excess amount that is beyond the book value is called goodwill.'},
            {name:'Intangibles',value:'',info:"Intangibles assets such as intellectual capital and property and social capital"},
            {name:'Long Term Investments',value:'',info:'Stocks, bonds and real estate investments that the company plans to hold more than a year.'},
            {name:'Total Assets',value:'',info:'Amount of profit company makes after subtracting operating expenses and cost of goods sold'},
            
            {header:'Current Liabilities'},
            {name:'Notes and Loans Payable',value:'',info:'Short term debt that needs to be paid within a year'},
            {name:'Accounts Payable',value:'',info:'When company buys from the supplier with credit and the invoice has due date in 30 days. During that time the amount of invoice is marked as accounts payable.'},
            {name:'Accrued Expenses',value:'',info:'Payments that the company needs to pay in the future'},
            {name:'Current Long Term Debt/Capital Leases',value:'',info:'Current portion of the long term debt that needs to be paid within a year.'},
            {name:'Total Current Liabilities',value:''},

            {header:'Long Term Liabilities'},
            {name:'Long Term Debt',value:'',info:"Debt that is due in more than 12 months"},
            {name:'Total Debt',value:'',info:'The sum of all the short term and long term debt'},
            {name:'Deferred Income Tax',value:'',info:'Taxes that a company will pay in the future.'},
            {name:'Total Liabilities',value:'',info:''},

            {header:"Shareholder's Equity"},
            {name:'Total Equity',value:'',info:'Total liabilities subtracted from the total assets'},
            {name:"Total Liabilities and Shareholders' Equity",value:'',info:''},
        ]
    }

    return(
        <div className='sectionGrid2'>
            <div> 
                <h3>Balance Sheet Structure</h3>
                <ArticleAccordion content={content}/>                    
            </div>
            <div className='statementExample'>
                <Statement statement={statementContent}/>
            </div>
        </div>
    )
}

function OverView(){
    
    const accordion=[
        {header:'Assets',icon:'AccountBalanceIcon'},
        {header:'Liabilities',icon:'MoneyOffIcon'},
        {header:"Shareholder's Equity",icon:'AssessmentIcon'},
    ]

    return(
        <div className='sectionGrid3'>
            <div>
                <TextList
                    content={[
                        {header:'Definition',text:"Balance sheet is used for reporting company company's assets, liabilities and shareholder equity. It is a snapshot of company's finances at a speficic date and represents what the company owns and owes."},
                        {header:'Components',text:`Balance sheet consist of 4 main components:`}
                    ]}
                /> 
                <ListSmall list={accordion}/>
            </div>
            <div className='paddingTop'>
                <TimelineList list={['Assets','Liabilities',"Shareholder's Equity"]}/>
            </div>
            <Card className='padding'>
                <TextList
                    content={[
                        {header:'Use Cases',list:['Helps understanding the current financial health of the company',"Snapshot of the company's assets and liabilities",'Shows if the company has positive net worth','Shows if the company has enough cash and short tem assets to cover its obligations','Helps at comparing business debt levels to peers']},
                    ]}
                />                
            </Card>
        </div>
    )
}
