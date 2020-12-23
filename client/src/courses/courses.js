import { 
    AssetsAndLiabilities, ValueInvesting, BusinessModel
} from './courseMaterial/investing/investingCourse'

import { Share, FinancialRatios1, StockMarket, InvestingCategories  } from './courseMaterial/stockMarket/stockMarketCourse'

const COURSES = [
    {
        name:'investing',
        desc:'Course covering basics investing priciples, vocabulary and business model',
        tier:'free',
        sections:[
            {
                name: 'assetsAndLiabilities',
                desc: 'What is the difference between asset and liability',
                articleTerms: ['Asset','Liability'],
                component: AssetsAndLiabilities
            },
            {
                name: 'valueInvesting',
                desc: 'What is the difference market price and real value of asset',
                articleTerms: ['Value investing','Intrinsic value'],
                component: ValueInvesting
            },
            {
                name: 'businessModel',
                desc: 'How business works, what are the common financial numbers and how money flows trough the business',
                articleTerms: ['Business','Revenue','Cost of Revenue','Net income'],
                component: BusinessModel
            },
        ]
    },
    {
        name:'stock-market',
        desc:'Course covering basic stock market vocabulary, financial ratios and investing categories',
        tier:'free',
        sections:[
            {
                name: 'share',
                desc: 'What is share of a company and what it represents',
                articleTerms: ['Share','Shares Outstanding','Market Cap'],
                component: Share
            },
            {
                name: 'financialRatios1',
                desc: 'What is earnings per share and book value and how to calculate them',
                articleTerms: ['Earnings','Earnings per Share','Equity','Book value'],
                component: FinancialRatios1          
            },
            {
                name: 'stockMarket',
                desc: 'What is stock market and how it works',
                articleTerms: ['Stock Market','Broker','IPO'],
                component: StockMarket                        
            },            
            {
                name: 'investingCategories',
                desc: 'Different investing categories',
                articleTerms: ['Investment Risk Ladder','Stock','Bond'],
                component: InvestingCategories
            },
        ]
    },
    {
        name:'third-course',
        desc:'Course covering basic stock market vocabulary, financial ratios and investing categories',
        tier:'free',
        sections:[
        ]
    },
]

export default COURSES