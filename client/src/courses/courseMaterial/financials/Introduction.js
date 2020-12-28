import React from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    financialsIntro:{
        marginTop:10,
        display:'grid',
        gridTemplateColumns:'repeat(3,auto)',
        fontSize:13,
        gridGap:10,
        alignItems:'center',
        '& div':{
            textAlign:'center',
            padding:2,
            backgroundColor:'var(--background-color)'
        }
    },
});

export default function Introduction() {
    const classes = useStyles();

    return (
        <>
            <p className='newLine'>In this course you will learn about the three main finacials statements and how to read them.{"\n"}Financials statements track company business activities and financial performance over period of time. They are often audited by indepentdent auditors such as goverment agencies and accountants.</p>
            <div className={classes.financialsIntro}>
                <Card>Income Statement</Card>
                <Card>Balance Sheet</Card>
                <Card>Cash Flow</Card>
            </div>
        </>
    )
}
