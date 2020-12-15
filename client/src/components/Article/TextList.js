import React from 'react'
import './Article.css'
import ArticleButton from './ArticleButton'

export default function TextList({content}) {
    return (
        <ul className='textList'>
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
        <div className='formula'>
            {formula}
        </div>
    )
}