import React from 'react'
import { useDispatch } from 'react-redux'
import SideDrawer from '../../Components/SideDrawer'

const Categories = () => {
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()

  const logoutbtn = () => {
    dispatch({ type: 'LOG_OUT',payload:true })
  }
  return (

    <div onClick={() => setOpen(false)}>

        <h1>Categoreis</h1>
            <button onClick={() => logoutbtn()}>bg
            </button>
               <SideDrawer/>
    </div>
  )
}

export default Categories