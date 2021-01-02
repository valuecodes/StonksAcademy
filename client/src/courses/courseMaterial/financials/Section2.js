import { Card } from '@material-ui/core'
import React from 'react'
import ArticleAccordion from '../../../components/Article/ArticleAccordion'
import TextList from '../../../components/Article/TextList'
import { ListSmall } from '../../../components/Other/Lists'
import Statement from '../../../components/Other/Statement'
import { TimelineList } from '../../../components/Other/Timeline'
import SectionContainer from '../../../components/Section/SectionContainer'

export default function BalanceSheet(props) {
    const sectionComponents = [
        {name:'OverView',article: OverView},
        {name:'Structure',article:Structure}
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
            {name:'Revenue',value:'',info:'Total Sales'},
            {name:'Cost of Revenue',info:'Total direct cost of product or service'},
            {name:'Gross Profit',info:'Total profit company makes after all the direct cost of the product or service'},
            {header:'Long Term Assets'},
            {name:'Selling, General and Administrative',info:'Also known as SG&A'},
            {name:'Research and Development',info:'Company process to create technologies to provide competive advantages.'},
            {name:'Depreciation and Amortization',info:'Non cash expenses\nAmortization happens when the depreciation of an intangible asset is split up over time\nDepreciation happens when fixed asset lose value over time'},
            {name:'Other Operating Expenses',info:"Also known as overhead expenses which doesn't depend on sales or production quantities"},
            {name:'Operating Income',info:'Amount of profit company makes after subtracting operating expenses and cost of goods sold'},
            {header:'Current Liabilities'},
            {name:'EBIT',info:'Earnings Before Interest and Taxes'},
            {name:'Interest Expense',info:'Non-operating expense that is the cost of borrowing money includes interest paid on bonds, loans and convertible debt'},
            {name:'Income Before Tax',info:'Comapany earnings before taxes. Removes the effect of taxes when comparing different companies financial performance'},
            {name:'Income Tax expense',info:'Goverment tax related to the taxable profit'},
            {name:'Net Income from Continuing Operations',info:'After tax earnings excluding one time events'},
            {header:'Long Term Liabilities'},
            {name:'Discontinued Operations',info:"Shutdown or divistment of company core business that needs to be reported seperately on the company's income statement"},
            {name:'Extraordinary Items',info:'One time gains/losses that unlikely to happen again'},
            {name:'Total Non-recurring',value:''},
            {header:"Shareholder's Equity"},
            {name:'Net Income',info:'Company revenue minus all the costs'},
            {name:'Basic Earnings per Share',info:'Earnings per share that includes only common shares'},
            {name:'Diluted Earnings per Share',info:'Earnings per share that includes common shares, convertible bonds and convertible preferred stocks. Diluted EPS is usually less than basic eps'},
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
