import React from 'react'
import { CustomButton } from '../components'
import { useNavigate } from 'react-router'
import { Add } from '@mui/icons-material';

const AllProperties= () => {
  const navigate = useNavigate();
  return (
    <CustomButton 
    title='Add Property'
    handleClick={() => navigate("/properties/create")}
    backgroundColor='#475be8'
    color='#fcfcfc'
    icon={<Add />}
    />
  )
}

export default AllProperties
