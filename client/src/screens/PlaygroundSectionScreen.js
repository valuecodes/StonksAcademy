import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScreenHeader from '../components/Page/ScreenHeader'
import { PLAYGROUNDLIST } from '../constants/playground'
import { camelCaseToString } from '../utils/utils'

export default function PlaygroundSectionScreen() {

    const { id } = useParams()
    const [section,setSection] = useState({})

    useEffect(()=>{
        if(id){
            const currentSection = PLAYGROUNDLIST.find(item => item.name === id)
            setSection(currentSection)
        }
    },[id])

    return (
        <div className='contentScreen'>
            <ScreenHeader header={camelCaseToString(section.name)} showAdd={true} backLinkTo={'/playground'}/>
            <div>
                {section.component && <section.component/>} 
            </div>
        </div>
    )
}
