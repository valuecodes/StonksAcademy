import React from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export default function MaterialIcon({icon,color='black',size='large',className}){

    switch(icon){
        case 'ArrowBackIosIcon':
            return <ArrowBackIosIcon fontSize={size} style={{color}}/>
        case 'MoneyOffIcon':
            return <MoneyOffIcon className={className} />
        case 'AttachMoneyIcon':
            return <AttachMoneyIcon className={className}/>
        case 'ArrowDownwardIcon':
            return <ArrowDownwardIcon className={className}/>
        case 'ArrowUpwardIcon':
            return <ArrowUpwardIcon className={className}/>
        default: return null
    }
}
