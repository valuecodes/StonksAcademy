import React from 'react'
import './Article.css'
import { ArticleButton } from '../Other/Buttons'
import Card from '@material-ui/core/Card';

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
            <p>{item.text}</p>    
            {item.formula&&
                <Formula formula={item.formula}/>
            }
        </>
    )
}

function Formula({formula}){
    return(
        <Card className='formula'>
            {formula}
        </Card>
    )
}