'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface Permissions {
  canViewTechDebt: boolean;
  canViewVulnerabilities: boolean;
  canViewSQLOptimization: boolean;
  canViewAppRat: boolean;
  canViewServiceScopes: boolean;
  canViewAIIndex: boolean;
  canViewProductRoadmap: boolean;
  canViewOperationMetrics: boolean;
}

interface UserContextType {
  user: User;
  permissions: Permissions;
  switchRole: (newRole: 'admin' | 'user') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Mock user data - in real app this would come from authentication
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Ajay Girija',
    email: 'ajay.girija@company.com',
    role: 'admin', // 'admin' or 'user'
  });

  // Define permissions based on role
  const permissions: Record<'admin' | 'user', Permissions> = {
    admin: {
      canViewTechDebt: true,
      canViewVulnerabilities: true,
      canViewSQLOptimization: true,
      canViewAppRat: true,
      canViewServiceScopes: true,
      canViewAIIndex: true,
      canViewProductRoadmap: true,
      canViewOperationMetrics: true,
    },
    user: {
      canViewTechDebt: false,
      canViewVulnerabilities: false,
      canViewSQLOptimization: false,
      canViewAppRat: true,
      canViewServiceScopes: true,
      canViewAIIndex: true, // Hidden for regular users
      canViewProductRoadmap: false, // Hidden for regular users
      canViewOperationMetrics: false, // Hidden for regular users
    },
  };

  const userPermissions = permissions[user.role] || permissions.user;
  
  const switchRole = (newRole: 'admin' | 'user') => {
    setUser((prev) => ({ ...prev, role: newRole }));
  };

  const value: UserContextType = {
    user,
    permissions: userPermissions,
    switchRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};