import TabPanel from "./TabPanel";

function a11yProps(index: number | string) {
  return {
    id: `w-tab-${index}`,
    'aria-controls': `w-tabpanel-${index}`,
  };
}

export {
  TabPanel,
  a11yProps,
}
