import React from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import TextList from '../../../components/Article/TextList'
import Table from '../../../components/Other/Table'
import ExcersiseQuiz from '../../../components/Exercise/ExcersiseQuiz'

export default function StockMarket(props){

    const sectionComponents = [
        {name: 'Overview', article: Overview},
        {name: 'Stock Exhanges', article:StockExhanges},
        {name: 'Indexes', article:Indexes},
        {name: 'Excercise', article:ExcersiseQuiz}
    ]

    return(
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
        />
    )
}

function Indexes(){

    const indexes = [
        {name:'Dow Jones',symbol:'DJI',region:'United States',"marketCap(inTrillions)":8.3},
        {name:'S&P 500',symbol:'GSPC',region:'United States',"marketCap(inTrillions)":23},
        {name:'Nasdaq',symbol:'IXIC',region:'United States',"marketCap(inTrillions)":20},
        {name:'FTSE',symbol:'FTSE 100',region:'United Kingdom',"marketCap(inTrillions)":1.8},
        {name:'Nikkei',symbol:'N225',region:'Japan',"marketCap(inTrillions)":5},
        {name:'Shanghai Composite',symbol:'SSEC',region:'China',"marketCap(inTrillions)":5},
        {name:'DAX',symbol:'GDAXI',region:'Germany',"marketCap(inTrillions)":1},
        {name:'KOSPI',symbol:'KS11',region:'South Korea',"marketCap(inTrillions)":1.3},
        {name:'Taiwan Weighted',symbol:'TWII',region:'Taiwan',"marketCap(inTrillions)":''},
    ]

    return(
        <div className='sectionGrid1'>
            <h2>Major Indexes</h2>
            <Table table={indexes}/>
        </div>
    )
}

function StockExhanges(){

    const stockExhanges = [
        {name:'New York Stock Exchange',symbol:'NYSE',region:'United States',"marketCap(inTrillions)":22.9},
        {name:'Nasdaq',symbol:'NASDAQ',region:'United States',"marketCap(inTrillions)":10.8},
        {name:'Japan Exchange Group',symbol:'JPX',region:'Japan',"marketCap(inTrillions)":5.6},
        {name:'London Stock Exchange',symbol:'LSE',region:'United Kingdom',"marketCap(inTrillions)":4.5},
        {name:'Shanghai Stock Exchange',symbol:'SSE',region:'China',"marketCap(inTrillions)":4},
        {name:'Hong Kong Stock Exchange',symbol:'SEHK',region:'Hong Kong',"marketCap(inTrillions)":3.9},
        {name:'Euronext',symbol:'',region:'European Union',"marketCap(inTrillions)":3.9},
        {name:'Toronto Stock Exchange',symbol:'TSX',region:'Canada',"marketCap(inTrillions)":3.2},
        {name:'Bombay Stock Exchange',symbol:'BSE',region:'India',"marketCap(inTrillions)":2},
    ]

    return(
        <div className='sectionGrid1'>
            <h2>Major Stock Exhanges</h2>
            <Table table={stockExhanges}/>
        </div>
    )
}

function Overview(){
    return(
        <div className='sectionGrid3'>
            <TextList
                className='gridItemWide'
                content={[
                    {
                        header:'Stock Market',
                        text:'Stock market is a market place institutional and individual investors can buy and sell shares of a company'
                    },
                    {
                        header:'Stock Exhange',
                        text:'Stock market is made of exhanges just as New York Stock Exchange (NYSE) and the Nasdaq'
                    },
                    {
                        header:'Initial Public Offering',
                        text:'Initial Public Offering (IPO) refers to company issuing new shares to list its shares in the stock exhange. This allows company to raise capital or previos owners to sell their share to public markets',
                    },
                    {
                        header:'Index',
                        text:'Index is basket of securities grouped together to track performance of that group in a standardized way. Indexed are often used as benchmark to see how to market is doing. One example of a index is S&P500 which tracks the performance of 500 biggest companies in the USA',
                    },
                ]}
            />
        </div>
    )
}
