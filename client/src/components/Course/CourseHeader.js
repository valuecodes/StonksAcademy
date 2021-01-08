import React from 'react'
import AdSense from 'react-adsense';

export default function CourseHeader({header,className=''}) {
    return (
        <div className={`screenHeader ${className}`}>
            <h1>{header}</h1>
            <div className='add-adsense  desktop-add'>
                <AdSense.Google
                    client='ca-pub-4976696279180454'
                    slot='7806394673'
                    style={{ width: 728, height: 90, float: 'right' }}
                    format=''
                    />
            </div>
        </div>
    )
}

