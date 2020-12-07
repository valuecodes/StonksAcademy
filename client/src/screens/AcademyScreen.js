import React,{ useState, useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import { camelCaseToString, truncate } from '../utils/utils';
import { Link } from 'react-router-dom'
import MaterialIcon from '../components/MaterialIcon'

export default function AcademyScreen(){

    const [academyCategories, setAcademyCategories] = useState([])

    useEffect(()=>{
        const categories=[
            {name:'investing',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
            {name:'stock-market',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
            {name:'financials',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
            {name:'financialRatios',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
            // {name:'companyTypes',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
            // {name:'sectors',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
            // {name:'ETF',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
            // {name:'strategies',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        ]
        // const categories=['investing','stockMarket','financials','financialRatios','companyTypes','sectors','ETF','strategies']
        setAcademyCategories(categories)
    },[])

    return (
        <section className='academyScreen'>
            <SectionHeader header={'Academy'}/>
            <h2 className='academyCourseHeader'>Featured Courses</h2>
            <div className='academyCategories'>    
                {academyCategories.map(category => 
                    <Category key={category.name} category={category}/>
                )}
            </div>
        </section>
    )
}

function Category({category}){
    return (
        <Link className='academyCategory' to={'/academy/'+category.name}>
            <div className='academyCategoryHeader'>
                <MaterialIcon icon='MenuBookIcon' className='categoryBook'/>
            </div>
            <div className='academyCategoryInfo'>            
                <h2>{camelCaseToString(category.name)}</h2>
                <p>{truncate(category.desc,77)}</p>
                <div className='academyCategoryFooter'>
                    <h3>Midastopedia</h3>
                    <h3 className='positive'>Free</h3>
                </div>    
            </div> 
        </Link> 
    )
}



