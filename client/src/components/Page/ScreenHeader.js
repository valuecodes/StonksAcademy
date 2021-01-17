import React from 'react'
// import AdSense from 'react-adsense';
import MaterialIcon from '../Other/MaterialIcon';
import IconButton from '@material-ui/core/IconButton';
import {useHistory} from 'react-router-dom';

export default function ScreenHeader({header,subHeader,backLinkTo,showAdd=false}) {
    return (
        <header className='screenHeader'>
            {backLinkTo &&<BackButton linkTo={backLinkTo} />} 
            <h1>{header}</h1>
            <h2>{subHeader}</h2>
            {showAdd &&
                <div className='add-adsense desktop-add'>
                    {/* <AdSense.Google
                        client='ca-pub-4976696279180454'
                        slot='7806394673'
                        style={{ width: 728, height: 90, float: 'right' }}
                        format=''
                    /> */}
                </div>
            }
        </header>
    )
}

function BackButton({linkTo}){
    const history = useHistory();

    const handleClick = ()=>{
        history.push(linkTo)
    }

    return(
        <IconButton className='headerBackButton' aria-label="back" onClick={handleClick} >
            <MaterialIcon icon='ArrowBackIosIcon' className='headerBackIcon'/>
        </IconButton>
    )
}