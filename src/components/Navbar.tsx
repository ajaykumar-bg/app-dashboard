'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout,
  AccountCircle,
  Person,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { useState, MouseEvent } from 'react';
import { useThemeMode } from '../shared/context/ThemeContext';
import { useUser } from '../shared/context/UserContext';
import Sidebar from './Sidebar';

const Navbar = () => {
  const { mode, toggleTheme } = useThemeMode();
  const { user, switchRole } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLElement | null>(null);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSidebarClose = () => {
    setDrawerOpen(false);
  };

  const handleUserMenuClick = (event: MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleRoleChange = (role: 'admin' | 'user') => {
    switchRole(role);
    handleUserMenuClose();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    handleUserMenuClose();
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect to login
    console.log('Logout clicked');
    handleUserMenuClose();
    // You can add actual logout logic here
  };

  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <>
      <AppBar position='sticky' sx={{ mb: 2, borderRadius: 0 }}>
        <Toolbar>
          {/* Menu Button */}
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer(true)}
            edge='start'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h2'
            component='div'
            sx={{ flexGrow: 1, fontSize: 18, fontWeight: 'bold' }}
          >
            SAP App Dev Scorecard
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {/* User Info Section */}
            <Tooltip title='User Menu'>
              <Button
                color='inherit'
                onClick={handleUserMenuClick}
                sx={{
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  ml: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.dark',
                    fontSize: '0.875rem',
                  }}
                >
                  {getUserInitials(user.name)}
                </Avatar>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant='body2' sx={{ fontWeight: 500 }}>
                    {user.name}
                  </Typography>
                  <Typography variant='caption' sx={{ opacity: 0.8 }}>
                    {user.role}
                  </Typography>
                </Box>
              </Button>
            </Tooltip>
            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
              PaperProps={{
                sx: { minWidth: 220 },
              }}
            >
              <MenuItem disabled>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant='body2' sx={{ fontWeight: 500 }}>
                    {user.name}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {user.email}
                  </Typography>
                </ListItemText>
              </MenuItem>
              <Divider />

              {/* Role Switcher */}
              <MenuItem
                onClick={() => handleRoleChange('admin')}
                disabled={user.role === 'admin'}
              >
                <ListItemIcon>
                  <Person fontSize='small' />
                </ListItemIcon>
                <ListItemText>Switch to Admin</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => handleRoleChange('user')}
                disabled={user.role === 'user'}
              >
                <ListItemIcon>
                  <Person fontSize='small' />
                </ListItemIcon>
                <ListItemText>Switch to User</ListItemText>
              </MenuItem>

              <Divider />

              {/* Theme Toggle */}
              <MenuItem onClick={handleThemeToggle}>
                <ListItemIcon>
                  {mode === 'dark' ? (
                    <LightMode fontSize='small' />
                  ) : (
                    <DarkMode fontSize='small' />
                  )}
                </ListItemIcon>
                <ListItemText>
                  {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </ListItemText>
              </MenuItem>

              <Divider />

              {/* Logout */}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>

            <Box
              component='img'
              src='/pepsico_logo.png'
              alt='PepsiCo Logo'
              sx={{ height: 40, ml: 2 }}
              onError={(e) => {
                console.log('Logo failed to load:', (e.target as HTMLImageElement).src);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Sidebar */}
      <Sidebar open={drawerOpen} onClose={handleSidebarClose} />
    </>
  );
};

export default Navbar;