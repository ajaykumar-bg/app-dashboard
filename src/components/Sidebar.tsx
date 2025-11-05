'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CloudUpload as CloudUploadIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '../shared/context/UserContext';

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const navigationItems: NavigationItem[] = [
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  ];

  // Add admin-only navigation items
  if (user.role === 'admin') {
    navigationItems.push({
      label: 'Data Upload',
      path: '/data-upload',
      icon: <CloudUploadIcon />,
    });
    navigationItems.push({
      label: 'Dashboard Config',
      path: '/dashboard-forms',
      icon: <SettingsIcon />,
    });
  }

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    onClose();
  };

  return (
    <Drawer anchor='left' open={open} onClose={onClose}>
      <Box
        sx={{ width: 250 }}
        role='presentation'
        onClick={toggleDrawer()}
        onKeyDown={toggleDrawer()}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Navigation
          </Typography>
        </Box>
        <Divider />
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={pathname === item.path}
              >
                <ListItemIcon
                  sx={{
                    color:
                      pathname === item.path
                        ? 'primary.main'
                        : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight:
                        pathname === item.path ? 'bold' : 'normal',
                      color:
                        pathname === item.path
                          ? 'primary.main'
                          : 'inherit',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;