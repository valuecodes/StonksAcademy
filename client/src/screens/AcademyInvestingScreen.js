import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom';
import SectionHeader from '../components/SectionHeader'
import DragAndDrop from '../components/DragAndDrop'
import ArticleHeader from '../components/ArticleHeader'

export default function AcademyInvestingScreen() {

    return (
        <section className='academySection'>
            <SectionHeader 
                header={'Academy'} 
                subHeader={'Investing'} 
                back={'/academy'}
            /> 
            <AssetsAndLiabilities/>
        </section>
    )
}

function AssetsAndLiabilities(){    

    const [score,setScore] = useState({})
    
    const scoreHandler=(newScore)=>{
        setScore(newScore)
    }

    return(
    <div className='assetsAndLiabilities'>
        <ArticleHeader header={'1. Assets and Liabilities'}/>
        <div className='articleContent'>
            <DragAndDrop 
                columns={[
                    {
                        name:'Assets',id:0,
                        infoText:'Assets generate income and make you wealthier  even though you dont need use time and energy',
                        icon:'AttachMoneyIcon'
                    },
                    {name:'Sort items',id:1},
                    {
                        name:'Liabilities',
                        id:2,
                        infoText:'Loses value over time, needs maintenence, fuel etc. ',
                        icon:'MoneyOffIcon'
                    }
                ]}
                items={[
                    {name:'Car',start:1,target:2},
                    {name:'Stock',start:1,target:0},
                    {name:'Bond',start:1,target:0},
                    {name:'Boat',start:1,target:2},
                    {name:'House',start:1,target:0},
                    
                ]}
                getScore={scoreHandler}
            />
            <div className='articleControls'>
                <h2>Score</h2>
                <p>{score.correct}/{score.total}</p>
            </div>
        </div>

    </div>  
    ) 
}

