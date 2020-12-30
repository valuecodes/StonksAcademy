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
            <p className='wordBreak'>{item.text}</p>    
            {item.list &&
                <List list={item.list}/>
            }
            {item.formula&&
                <Formula formula={item.formula}/>
            }
        </>
    )
}

function List({list}){
    return(
        <ul className='textListList'>
            {list.map((item,index) =>
                <li className='newLine' key={index}>{' '}{index+1}. {item}</li>
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