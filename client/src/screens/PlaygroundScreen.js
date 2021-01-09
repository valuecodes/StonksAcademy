import React from 'react'
import ScreenHeader from '../components/Page/ScreenHeader'
import AdSense from 'react-adsense';
import PlaygroundListItem from '../components/Playground/PlaygroundListItem';

export default function PlaygroundScreen() {

    const playgroundList=[
        {
            name:'compound-calculator',
            icon:'ShowChartIcon',
            desc:'Compound calculator simulation with different parameters'
        },
        {
            name:'liability-calculator',
            icon:'EqualizerIcon',
            desc:'Liability calculator with car expenses'
        },
        {
            name:'business-simulator',
            icon:'DonutLargeIcon',
            desc:'Learn how business works with restaurant example'
        },
    ]

    return (
        <div className='playgroundScreen'>
            <div className='playgroundContent'>
                <ScreenHeader header={'Playground'}/>
                <div className='playgroundList'>
                    {playgroundList.map((item,index) =>
                        <PlaygroundListItem key={index} item={item}/>
                    )}                    
                </div>
            </div>
            <div className='add-adsense desktop-add'>
                <AdSense.Google
                    client='ca-pub-4976696279180454'
                    slot='7806394673'
                    style={{ width: 300, height: 600, float: '' }}
                    format=''
                    />
            </div>
        </div>
    )
}
