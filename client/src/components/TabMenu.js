import { Tabs, Tab } from "@material-ui/core";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabMenu({ value, onChange }) {
  return (
    <Tabs value={value} onChange={onChange} aria-label="content tab" centered>
      <Tab label="Yours" {...a11yProps(0)} />
      <Tab label="Random" {...a11yProps(1)} />
    </Tabs>
  );
}
