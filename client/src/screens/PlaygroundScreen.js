import React from 'react'
import ScreenHeader from '../components/Page/ScreenHeader'
// import AdSense from 'react-adsense';
import PlaygroundListItem from '../components/Playground/PlaygroundListItem';
import { PLAYGROUNDLIST } from '../constants/playground'

export default function PlaygroundScreen() {
    
    return (
        <div className='playgroundScreen'>
            <div className='playgroundContent'>
                <ScreenHeader header={'Playground'}/>
                <div className='playgroundList'>
                    {PLAYGROUNDLIST.map((item,index) =>
                        <PlaygroundListItem key={index} item={item}/>
                    )}                    
                </div>
            </div>
            <div className='add-adsense desktop-add'>
                {/* <AdSense.Google
                    client='ca-pub-4976696279180454'
                    slot='7806394673'
                    style={{ width: 300, height: 600, float: '' }}
                    format=''
                    /> */}
            </div>
        </div>
    )
}
