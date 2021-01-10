import React from 'react'
import './Playground.css'
import { Card } from '@material-ui/core'
import { camelCaseToString } from '../../utils/utils'
import { ActionButton } from '../Other/Buttons'
import MaterialIcon from '../Other/MaterialIcon'
import {useHistory} from 'react-router-dom';

export default function PlaygroundListItem({item}) {

    const history = useHistory();
    
    const onClickHandler=()=>{
        history.push('/playground/'+item.name)
    }

    return (
        <Card className='playgroundListItem'>
            <div className='playgroundItemHeader'>
                <h2>{camelCaseToString(item.name)}</h2>
                <p>{item.desc}</p>
            </div>
            <div className='playgroundIconContainer'>
                <MaterialIcon icon={item.icon}className='playgroundIcon' />
            </div>
            <div>
                <ActionButton text={'Play'} onClick={onClickHandler}/>
            </div>
        </Card>   
    )
}
