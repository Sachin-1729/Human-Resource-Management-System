import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Headers from '../components/Header';
import Item1 from '../components/Item1dataexport'
import Item2 from '../components/Item2dataexport'
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Headers title="Data exports">

    </Headers>

    <>
    </>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Attendance" {...a11yProps(0)} />
          <Tab label="Employees" {...a11yProps(1)} />
    
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Item1></Item1>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Item2></Item2>
      </CustomTabPanel>
    
    </Box>
    </>
  );
}