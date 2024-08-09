import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <>
    
      <div style={{width:"100%"}}>
      <Link to="/createproduct">
                <Button style={{ fontSize: "30px" }}>Add Product +</Button>
            </Link>
      <img style={{width:"100%"}} src='.\image\CRUD.jpg' />
      </div>
      
    </>
  )
}

export default Home
