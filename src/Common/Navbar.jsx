
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { check_token, Removefun } from '../ReduxToolkit/Authslice'
import { toast } from 'react-toastify'

const Navbar = () => {
  const dispatch=  useDispatch()
  const {loading,LogoutToggle}= useSelector((state)=>state?.Auth)
  console.log("logouttgg",LogoutToggle);
  const name = localStorage.getItem("Name")
  console.log("my",name);
  const logout =()=>{
    dispatch(Removefun())
    toast.success("Logged out successfully")
  }
  useEffect(()=>{
    dispatch(check_token())
  },[])
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">CRUD</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
   {
    LogoutToggle?(<>
     <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" a-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" to="/product">Product</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" >{name}</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" to="/login" onClick={logout}>Logout</Link>
        </li>
       
       
      </ul>
      
    </div>
    
    </>):(<>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" a-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" to="/product">Product</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" to="/register">Register</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" to="/login">Login</Link>
        </li>
       
       
      </ul>
      
    </div>
    </>)
   }
  </div>
</nav>
    </>
  )
}

export default Navbar
