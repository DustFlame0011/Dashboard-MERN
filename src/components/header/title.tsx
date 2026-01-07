import React from 'react'
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded';
import { Box, Typography } from '@mui/material';

interface TitleProps {
  collapsed: boolean;
}
function title({ collapsed }: TitleProps) {
  return (
    <Box display={"flex"}>
        <AllInclusiveRoundedIcon sx={{marginRight: collapsed ? 0 : 2 }}/>
      <Typography 
      fontSize={18} 
      fontWeight={700}
      display={collapsed ?"none":"block"}
      >
        Dashboard
        </Typography>
    </Box>
  );
}

export default title
