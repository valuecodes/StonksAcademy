import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader'

export default function ProfileScreen() {

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    return (
        !userInfo?
            <Redirect to='/'/>
        :
        <div className='profileScreen'>
            <SectionHeader header={'Profile'} /> 
            <h2>{userInfo.name}</h2>
            <h2>{userInfo.email}</h2>
        </div>
    )
}
