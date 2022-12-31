interface TabPanelProps {
  children?: React.ReactNode;
  index: number | string;
  value: number | string;
}

const TabPanel = ({ children, value, index, ...etc }: TabPanelProps) => {
  return (
    <div
      {...etc}
      role="tabpanel"
      hidden={value !== index}
      id={`w-tabpanel-${index}`}
      aria-labelledby={`w-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}

export default TabPanel;
