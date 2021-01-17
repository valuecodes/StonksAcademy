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
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MoneyIcon from '@material-ui/icons/Money';
import BuildIcon from '@material-ui/icons/Build';
import StoreIcon from '@material-ui/icons/Store';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import GrainIcon from '@material-ui/icons/Grain';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CallMadeIcon from '@material-ui/icons/CallMade';
import SettingsIcon from '@material-ui/icons/Settings';
import DoneIcon from '@material-ui/icons/Done';
import TimelineIcon from '@material-ui/icons/Timeline';

export default function MaterialIcon({icon,color='black',size='large',className,scale=1}){

    switch(icon){
        case 'ArrowBackIosIcon':
            return <ArrowBackIosIcon fontSize={size} style={{color}}  className={className}/>
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
        case 'MonetizationOnIcon':
            return <MonetizationOnIcon className={className} style={{transform:`scale(${scale})`}}/>
        case 'AccountBalanceIcon':
            return <AccountBalanceIcon className={className} style={{transform:`scale(${scale})`}}/>
        case 'MoneyIcon':
            return <MoneyIcon className={className} />
        case 'BuildIcon':
            return <BuildIcon className={className} />
        case 'StoreIcon':
            return <StoreIcon className={className} />
        case 'MonetizationOnIcon2':
            return <MonetizationOnIcon className={className} />
        case 'FastfoodIcon':
            return <FastfoodIcon className={className} />
        case 'GrainIcon':
            return <GrainIcon className={className} />
        case 'AccountBalanceWalletIcon':
            return <AccountBalanceWalletIcon className={className} />
        case 'ShowChartIcon':
            return <ShowChartIcon className={className} />
        case 'AssessmentIcon':
            return <AssessmentIcon className={className} />
        case 'EqualizerIcon':
            return <EqualizerIcon className={className} />
        case 'ArrowBackIcon':
            return <ArrowBackIcon className={className} />
        case 'AddIcon':
            return <AddIcon className={className} />
        case 'RemoveIcon':
            return <RemoveIcon className={className} />
        case 'CallMadeIcon':
            return <CallMadeIcon className={className} />
        case 'SettingsIcon':
            return <SettingsIcon className={className} />
        case 'DoneIcon':
            return <DoneIcon className={className} />
        case 'TimelineIcon':
            return <TimelineIcon className={className} />
        default: return null
    }
}
