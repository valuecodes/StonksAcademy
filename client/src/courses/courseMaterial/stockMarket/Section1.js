import React,{ useState } from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import MaterialIcon from '../../../components/MaterialIcon'
import TextList from '../../../components/Article/TextList'
import ExerciseQuiz from '../../../components/Exercise/ExcersiseQuiz'
import ShareExample from '../../../components/Example/ShareExample'

export default function Share({section,completeSection,moveTo}){

    const questions=[
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
    ]

    const sectionComponents = [
        {name:'Overview',article: Overview},
        {name:'Example',article: Example},
        {name:'Exercise',article: ExerciseQuiz,props:{section,completeSection,questions}},
    ]
    return(
        <SectionContainer 
            sectionComponents={sectionComponents} 
            section={section} 
            completeSection={completeSection}
            moveTo={moveTo}
        />
    )
}

function Example(){

    const[company,setCompany] = useState({
        sharePrice:15,
        shareCount:60,
        marketCap:900,
    })

    const shareCountHandler=(e,value)=>{
        let marketCap = company.sharePrice*company.shareCount
        let sharePrice = (marketCap/+value)
        if(marketCap>1200) return
        if(sharePrice>20) return
        setCompany({...company,sharePrice:sharePrice,shareCount:+value})
    }

    const sharePriceHandler = (e,value) =>{
        let marketCap = +value*company.shareCount
        if(marketCap>1200) return
        setCompany({...company,sharePrice:+value})
    }

    return(
        <div className='sectionGrid'>
            <div>
            <TextList
                content={[
                    {
                        header:'Market Cap playground',
                        text:'One share is like the whole company in miniature size.'
                    },
                ]}
            />
            </div>
            <div className='exampleGrid'>
                <ShareExample 
                    header={'Share'}
                    icon={<MaterialIcon icon='BusinessIcon' className='businessIcon'/> }
                    input={{onChange:sharePriceHandler,min:1,max:20,step:1,name:'Share Price:'}}
                    iconStyle={{transform:`scale(${company.sharePrice/10})`}}
                    value={{number:company.sharePrice,toFixed:2,format:'$'}}
                    showMore={'Share price affects the market cap'}
                />
                <ShareExample 
                    header={'Company'}
                    icon={[ ...Array(company.shareCount).keys()].map((item,index) =>
                        <MaterialIcon color={'red'} key={index} icon='BusinessIcon' className='businessIcon'/> 
                    ) }
                    input={{onChange:shareCountHandler,min:10,max:100,step:1,name:'Shares Outstanding:'}}
                    iconStyle={{
                        transform:`scale(${company.sharePrice/12})`,
                        width:50+(company.shareCount/2)+'%'
                    }}
                    value={{number:company.shareCount,toFixed:0,format:'pcs'}}
                    showMore={"Number of shares doesn't affect the market cap. Just like pizza the company can be divided in the 4 or 8 pieces but the total size doesn't grow"}
                />
                <ShareExample 
                    header={'Market Cap'}
                    icon={<MaterialIcon icon='BusinessIcon' className='businessIcon'/> }
                    iconStyle={{transform:`scale(${(company.sharePrice*company.shareCount)/75})`}}
                    value={{number:company.sharePrice*company.shareCount,toFixed:0,format:'$'}}
                    showMore={"Market Cap = Share price * Shares outstanding"}
                />
            </div>    
        </div>
    )
}

function Overview(){
    return(
        <div className='sectionGrid2'>
            <TextList
                content={[
                    {
                        header:'Share',
                        text:'One share is like the whole company in miniature size.'
                    },
                    {
                        header:'Shares outstanding',
                        text:'Number of shares the company has. Company can be dividend in to many pieces but it doesnt affect the company value'},
                    {
                        header:'Market Cap',
                        text:'Market Cap is the total market value of the company. If you wanted buy the whole company (all of the shares) this is how much it would cost',
                        formula:'Market Cap = Share price * Shares Outstanding'
                    },
                ]}
            />
        </div>
    )
}
