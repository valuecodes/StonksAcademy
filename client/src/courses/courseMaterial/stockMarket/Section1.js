import React,{ useState } from 'react'
import SectionContainer from '../../../components/Section/SectionContainer'
import MaterialIcon from '../../../components/Other/MaterialIcon'
import TextList from '../../../components/Article/TextList'
import ExerciseQuiz from '../../../components/Exercise/ExcersiseQuiz'
import ShareExample from '../../../components/Example/ShareExample'

export default function Share(props){

    const sectionComponents = [
        {name:'Overview',article: Overview},
        {name:'Example',article: Example},
        {name:'Exercise',article: ExerciseQuiz},
    ]
    return(
        <SectionContainer 
            sectionComponents={sectionComponents} 
            {...props}
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
