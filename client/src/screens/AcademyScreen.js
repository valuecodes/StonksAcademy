import React,{ useState, useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import { camelCaseToString } from '../utils/utils';
import TrainingStatus from '../components/TrainingStatus'
import { Link } from 'react-router-dom'

export default function AcademyScreen(){

    const [academyCategories, setAcademyCategories] = useState([])

    useEffect(()=>{
        const categories=['investing','stockMarket','financials','financialRatios','companyTypes','sectors','ETF','strategies']
        setAcademyCategories(categories)
    },[])

    return (
        <section className='academyScreen'>
            <SectionHeader header={'Academy'}/>
            <div className='academyCategories'>
                {academyCategories.map(category => 
                    <Category category={category}/>
                )}
            </div>
        </section>
    )
}

function Category({category}){
    return (
        <div className='academyCategory'>            
            <h2>{camelCaseToString(category)}</h2>
            <Link to={'/academy/'+category}>Start training</Link> 
            <TrainingStatus text={'1/3'}/>
        </div> 
    )
}



