import * as React from 'react';
import { Menu, useResourceDefinitions } from 'react-admin';
import SettingsIcon from '@mui/icons-material/Settings';

const CustomSidebar = () => {
  const resources = useResourceDefinitions();

  return (
    <Menu>
      {Object.keys(resources).map(name => (
        <Menu.Item
          key={name}
          to={`/${name}`}
          primaryText={resources[name].options && resources[name].options.label || name}
          leftIcon={React.createElement(resources[name].icon)}
        />
      ))}
      <Menu.Item to="/settings" primaryText="Settings" leftIcon={<SettingsIcon />} />
    </Menu>
  );
};

export default CustomSidebar;
