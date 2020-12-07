import React from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import HomeIcon from '@material-ui/icons/Home';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import TocIcon from '@material-ui/icons/Toc';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import BusinessIcon from '@material-ui/icons/Business';

export default function MaterialIcon({icon,color='black',size='large',className,scale=1}){

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
        case 'HomeIcon':
            return <HomeIcon className={className}/>
        case 'DonutLargeIcon':
            return <DonutLargeIcon className={className}/>
        case 'MenuBookIcon':
            return <MenuBookIcon className={className}/>
        case 'TocIcon':
            return <TocIcon className={className}/>
        case 'EmojiFlagsIcon':
            return <EmojiFlagsIcon className={className}/>
        case 'BusinessIcon':
            return <BusinessIcon className={className} style={{transform:`scale(${scale})`}}/>
        default: return null
    }
}
