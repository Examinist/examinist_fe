import { Box, MenuItem, MenuList, Paper, Popper, Tab, Tabs } from '@mui/material';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export interface ITab {
  name: string;
  menu?: IMenuItem[];
}

export interface IMenuItem {
  name: string;
  to: string;
  icon?: React.ReactNode;
}

const tabUrl = (tabName: string) => tabName.toLowerCase().replace(" ", "-");

const activeTab = (path: string, tabs: ITab[]) => {
    for (const [i, tab] of tabs.entries()) {
    if (path.includes(tabUrl(tab.name))) return i;
    }
};

export default function CustomTabs({tabs}: {tabs: ITab[]}) {
      const location = useLocation();
      const [currTab, setCurrTab] = React.useState(
        activeTab(location.pathname, tabs) || 0
      );
      const [hoverTab, setHoverTab] = React.useState(currTab);

      const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
        setCurrTab(newTab);
      };

      const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

      const handlePopoverOpen = (
        event: React.MouseEvent<HTMLElement>,
        newTab: number
      ) => {
        setAnchorEl(event.currentTarget);
        setHoverTab(newTab);
      };

      const handlePopoverClose = () => {
        setCurrTab(hoverTab);
        setAnchorEl(null);
      };

      const open = Boolean(anchorEl);
      
  return (
    <Box onMouseLeave={handlePopoverClose}>
      <Tabs value={currTab} onChange={handleChangeTab} centered>
        {tabs.map(({ name }, index) => (
          <Tab
            key={name}
            label={name}
            component={Link}
            to={tabUrl(name)}
            aria-owns={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onMouseEnter={(event) => handlePopoverOpen(event, index)}
          />
        ))}
      </Tabs>

      <Popper
        open={open}
        anchorEl={anchorEl}
        id="menu-list-grow"
        placement="bottom-start"
      >
        <Paper>
          <MenuList>
            {tabs[hoverTab].menu?.map(({ name, to }) => (
              <div key={name}>
                <Link to={to} style={{ textDecoration: "none", color: "gray" }}>
                  <MenuItem key={name} onClick={handlePopoverClose}>
                    {name}
                  </MenuItem>
                </Link>
              </div>
            ))}
          </MenuList>
        </Paper>
      </Popper>
    </Box>
  );
}
