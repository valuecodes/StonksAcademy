import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import ScreenHeader from '../components/Page/ScreenHeader'

export default function ProfileScreen() {

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    return (
        !userInfo?
            <Redirect to='/'/>
        :
        <div className='profileScreen'>
            <ScreenHeader header={'Profile'} /> 
            <h2>{userInfo.name}</h2>
            <h2>{userInfo.email}</h2>
        </div>
    )
}
