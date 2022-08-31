import React ,{useState,useEffect} from 'react'
import BottomHeader from './BottomHeader'
import TopHeader from './TopHeader'
import {useSelector} from 'react-redux'
const MainHeader = () => {
const isLoggedIn = useSelector(state => state.users.isLoggedIn);
  return (
    <div>
      {isLoggedIn? 
      <TopHeader/>
      
      :null}
        <BottomHeader/>
    </div>
  )
}

export default MainHeader