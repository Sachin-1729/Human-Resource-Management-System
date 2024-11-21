import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{width:"100%"}}>
        <DateCalendar 
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2, // padding
            border: '1px solid #ccc', // border styling
            borderRadius: '8px', // rounded corners
            backgroundColor: '#f9f9f9', // background color
            width: '70%', // sets container width to 70%
            margin: '0 auto', // centers the container horizontally
          }}/>
      </Box>
    </LocalizationProvider>
  );
}
