import React from 'react'
import '../Styles/Header.scss'
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle } from "react-icons/fi";

const Header = ({showModal}) => {

    const navigate = useNavigate()

  return (
    <header>
        <h1>Manage Users</h1>
        <button onClick={()=> navigate('/add-user')}><FiPlusCircle /> Add</button>
    </header>
  )
}

export default Header