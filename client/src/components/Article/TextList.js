import React from 'react'
import './Article.css'
import { ArticleButton } from '../Other/Buttons'
import Card from '@material-ui/core/Card';
import MaterialIcon from '../Other/MaterialIcon';

export default function TextList({content,className=''}) {
    return (
        <ul className={`textList ${className}`}>
            {content.map((item,index) =>
                <li key={index}>
                    {item.buttons?
                        <Buttons item={item}/>:
                        <TextItem item={item}/>
                    }
                </li>
            )}
        </ul>
    )
}

function Buttons({item}){
    return(
        <>
            {item.buttons.map((button,index) =>
                <ArticleButton key={index} onClick={button.onClick} text={button.text} />
            )}
        </>
    )
}

function TextItem({item}){
    return(
        <>
            <h3>{item.header}</h3>
            <p className='wordBreak'>{item.text}</p>    
            {item.list &&
                <List list={item.list}/>
            }
            {item.formula&&
                <Formula formula={item.formula}/>
            }
            {item.prosAndCons&&
                <ProsAndCons prosAndCons={item.prosAndCons}/>
            }
        </>
    )
}

function ProsAndCons({prosAndCons}){
    
    return(
        <Card className='prosAndConsList'>
            {prosAndCons.pros.map((item,index) =>
                <div key={index} className='prosAndCons pros'>
                    <MaterialIcon icon='AddIcon' className='prosAndConsIcon'/>
                   <p>{item}</p>
                </div>
            )}
            {prosAndCons.cons.map((item,index) =>
                <div key={index} className='prosAndCons cons'>
                    <MaterialIcon icon='RemoveIcon' className='prosAndConsIcon'/>
                    <p>{item}</p>
                </div>   
            )}
        </Card>
    )
}

function List({list}){
    return(
        <ul className='textListList'>
            {list.map((item,index) =>
                <li className='newLine' key={index}>{''}<b>{index+1}. </b>{item}</li>
            )}
        </ul>
    )
}

function Formula({formula}){
    return(
        <Card className='formula'>
            {formula}
        </Card>
    )
}