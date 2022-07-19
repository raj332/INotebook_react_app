import React from 'react'
import Notes from './Notes'
import Addnote from './Addnote'
const Home = (props) => {
  const {showAlert}=props
  return (
    <>
     <Addnote showAlert={showAlert}/>
     <Notes showAlert={showAlert}/>
    </>

  )
}



  

export default Home