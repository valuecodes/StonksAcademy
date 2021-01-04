const QUESTIONS={
    "investing":{
        assetsAndLiabilities:[
            {
                question:'Bond is asset',
                options:['True','False','Both'],
                answer:'True'
            },
            {
                question:'Car is',
                options:['Asset','Liability','None'],
                answer:'Liability'
            },
            {
                question:'Reinvesting dividends accelerates compounding',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'Stock is',
                options:['Asset','Liability'],
                answer:'Asset'
            },
            {
                question:'Car insurance is',
                options:['Variable Cost','Fixed Cost'],
                answer:'Fixed Cost'
            },
            {
                question:'Car gas is',
                options:['Variable Cost','Fixed Cost','Temperary Cost'],
                answer:'Variable Cost'
            },
            {
                question:'Boat is',
                options:['Asset','Liability'],
                answer:'Liability'
            },  
        ],
        businessModel:[
            {
                question:'Revenue is the total sales without anu deductions',
                options:['True','False'],
                answer:'True'
            },
            {
                question:'If company sales drop to 0, operating expenses are also 0',
                options:['True','False'],
                answer:'False'
            },        
            {
                question:'Revenue is 1000$, Cost of Revenue 600$, Operating Expenses 250$. How much is the Net Income',
                slider:{max:500,step:10,format:'$'},            
                answer:150
            },   
            {
                question:'Ingrediants and materials are part of the Cost of Revenue',
                options:['True','False'],
                answer:'True'
            },
            {
                question:"Net Income doesn't include taxes paid",
                options:['True','False'],
                answer:'False'
            },
            {
                question:'Revenue is 500$, Cost of Revenue 400$, Operating Expenses 200$. How much is the Net Income',
                slider:{min:-300, max:300,step:10,format:'$'},            
                answer:-100
            },   
            {
                question:'Rent is part of the Cost of Revenue',
                options:['True','False'],
                answer:'False'
            },
            {
                question:'Net Income is the money that is left after all of the costs and taxes',
                options:['True','False'],
                answer:'True'
            },
            {
                question:'Net Income is 100$, Cost of Revenue 500$, Operating Expenses 300$. How much is the Revenue',
                slider:{max:1200,step:100,format:'$'},            
                answer:900
            },  
        ]
    },
    "stock-market":{
        share:[
            {
                id:1,
                question:'Share price is 10$ and share count 10pcs. What is the market cap?',
                slider:{max:250,step:10,format:'$'},
                answer:100,
                userAnswer:null
            },          
            {
                id:2,
                question:'Number of shares affects the market cap',
                options:['True','False'],           
                answer:'False',
                userAnswer:null
            },          
            {
                id:3,
                question:'Share count is 5pcs and Market cap 200$. How much is the share price?',
                slider:{max:15,step:1,format:'$'},            
                answer:10,
                userAnswer:null
            },          
            {
                id:4,
                question:'One share is miniature version of the whole company',
                options:['True','False'],           
                answer:'True',
                userAnswer:null
            },          
            {
                id:5,
                question:'Market cap is 300$ and share price 15$. How many shares outstanding there are?',
                slider:{max:25,step:1,format:'pcs'},            
                answer:20,
                userAnswer:null
            }, 
        ],
        financialRatios1:[
            {
                question:'Company net income is 1000$ and it has 100 shares outstanding. What is the earnings per share',
                slider:{max:50,step:5,format:'$'},
                answer:10,
            },          
            {
                question:'Equity is the liquadation value of the company',
                options:['True','False'],           
                answer:'True',
            },          
            {
                question:'Company book value per share is 50$ and it has 20 shares outstanding. What is the equity of the company',
                slider:{max:1500,step:100,format:'$'},            
                answer:1000,
            },          
            {
                question:'Year and quarter are the most common timeperiods to measure financial ratios',
                options:['True','False'],           
                answer:'True',
            },          
            {
                question:'EPS is 50$ and there are 100 shares outstanding. How much is the net income',
                slider:{max:600,step:10,format:'pcs'},            
                answer:500,
            },    
        ],
        stockMarket:[
            {
                question:'In which country Nasdaq-stock exhange is located',
                options:['Germany','Japan','United States'],           
                answer:'United States',
            },          
            {
                question:'Which region has the biggest stock exhanges by market cap',
                options:['Shanghai','United States','Japan'],           
                answer:'United States',
            },       
            {
                question:'Stock market is only for the instutional investors',
                options:['True','False'],           
                answer:'False',
            },       
            {
                question:'Select correct region for Nikkei index',
                options:['South Korea','Taiwan','Japan'],           
                answer:'Japan',
            },        
            {
                question:'IPO is correct term company issuing shares first time in stock exhange',
                options:['True','False'],           
                answer:'True',
            },             
            {
                question:'Select correct region for Dax index',
                options:['Germany','South Korea','United States'],           
                answer:'Germany',
            },          
            {
                question:'Index is a group securities tracked in a standardized way',
                options:['True','False'],           
                answer:'True',
            },  
        ],
        investingCategories:[
            {
                question:'Bond yields are always positive',
                options:['True','False'],
                answer:'False',
            },
            {
                question:'Goverment Bonds are safer than Corporate Bonds',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'REITs invest in',
                options:['Real Estate','Stocks','Bonds'],
                answer:'Real Estate',
            },
            {
                question:'Derivates are less riskier than ETFs',
                options:['True','False'],
                answer:'False',
            },
            {
                question:'Mutual Fund value is calculated at the end of the day',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'Commodities includes gold and oil',
                options:['True','False'],
                answer:'True',
            },
        ]
    },
    "financials":{
        incomeStatement:[
            {
                question:'Income Statement can be used for Year over Year and Quarter over Quarter comparison',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'EBIT stands for Earnings before interest and taxes',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'Gross profit is calculated by Net income - Cost of Revenue',
                options:['True','False'],
                answer:'False',
            },
            {
                question:'Non-recurring Events includes one time and unusual events',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'Diluted Earnings per Share is usually bigger than Basic Earnings per Share',
                options:['True','False'],
                answer:'False',
            },
            {
                question:'Depreciation and Amortization are non cash expenses',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'Income Statement is not suitable for management business decisions',
                options:['True','False'],
                answer:'False',
            },
        ],
        balanceSheet:[
            {
                question:'Balance sheet shows if the company has positive net worth',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'Property Plant and Equiment are current assets',
                options:['True','False'],
                answer:'False',
            },
            {
                question:'Accounts Receivables are current liabilities',
                options:['True','False'],
                answer:'False',
            },
            {
                question:'Inventory is long term asset',
                options:['True','False'],
                answer:'False',
            },
            {
                question:'Accrued Expenses are current liabilities',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'Goodwill is liability',
                options:['True','False'],
                answer:'False',
            },
        ],
        cashFlowStatement:[
            {
                question:'Cashflow statement provides additional information about changes in assets, liabilities and equity',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'Positive Financing cash flow indicates that the company is paying back debt',
                options:['True','False'],
                answer:'False',
            },
            {
                question:'Operating cash flow should cover company operating costs',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'Capital Expenditures are investing cash flow',
                options:['True','False'],
                answer:'True',
            },
            {
                question:'Cash taxes paid are financing cash flow',
                options:['True','False'],
                answer:'False',
            },
            {
                question:'Free cash flow is calculated by: Operating cash flow - Capital expenditures',
                options:['True','False'],
                answer:'False',
            },
            {
                question:'Operating cash flow should be positive and Investing and Financing Negative',
                options:['True','False'],
                answer:'True',
            },
        ]
    }
}

export default QUESTIONS