import { Share, ArticleTest } from './stockMarket/Components'
import { AssetsAndLiabilities, ValueInvestingAndIntrinsicValue,InvestingCategories } from './investing/Components'

console.log(AssetsAndLiabilities)

const COURSES = [
    {
        name:'investing',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tier:'free',
        articles:[
            {
                name: 'Assets And Liabilities',
                desc: 'What is the difference between asset and liability',
                articleTerms: ['Asset','Liability'],
                component: AssetsAndLiabilities
            },
            {
                name: 'Value Investing And Intrinsic Value',
                desc: 'What is the difference market price and real value of asset',
                articleTerms: ['Value investing','Intrinsic value'],
                component: ValueInvestingAndIntrinsicValue
            },
            {
                name: 'Investing categories',
                desc: 'Different investing categories',
                articleTerms: ['Investment Risk Ladder','Stock','Bond'],
                component: InvestingCategories
            },
        ]
    },
    {
        name:'stock-market',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tier:'free',
        articles:[
            {
                name: 'Share',
                desc: 'What is share of a company and what it represents',
                articleTerms: ['Share','Shares Outstanding','Market Cap'],
                component: Share
            },
            {
                name: 'Share Financial Ratios',
                desc: 'What is earnings per share and book value and how to calculate them',
                articleTerms: ['Earnings','Earnings per Share','Equity','Book value'],
                component: ArticleTest            
            },
            {
                name: 'Stock Market',
                desc: 'What is stock market and how it works',
                articleTerms: ['Stock Market','Broker','IPO'],
                component: ArticleTest                        
            },
        ]
    },
    {
        name:'financials',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tier:'free',
    },
    {
        name:'financial-ratios',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tier:'free',
    },
    // {
    //     name:'companyTypes',
    //     desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    // },
    // {
    //     name:'sectors',
    //     desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    // },
    // {
    //     name:'ETF',
    //     desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    // },
    // {
    //     name:'strategies',
    //     desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    // }
]

export default COURSES