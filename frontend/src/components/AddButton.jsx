import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/add.svg';
import '../pages/Auth.css';

const AddButton = () => {
  return (
    <Link to="/notes/create" className='AddBtn'>
       <AddIcon />
    </Link>
  )
}

export default AddButton
