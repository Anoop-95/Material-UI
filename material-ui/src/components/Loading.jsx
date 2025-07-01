import { Box, Typography } from "@mui/material";
import React from "react";

function Loading() {

    return (
  <Box
    sx={{
      height: '80vh', // Adjust as needed
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img src="/loader.gif" alt="Loading..." style={{ width: '100px' }} />
    <Typography variant="h5" mt={2} sx={{fontFamily:"Bebas Neue"}}>
      Loading your news...
    </Typography>
  </Box>
);
    
}


export default Loading;  